export interface GuestData {
  inviteCode?: string;
  fullName: string;
  email: string;
  allowedGuests: number;
  rsvpStatus: string;
}

export interface LookupResponse {
  success: boolean;
  message: string;
  guest?: GuestData;
}

export interface RSVPPayload {
  inviteCode?: string;
  fullName: string;
  email: string;
  attendance: string;
  numberOfGuests: number;
  nickname?: string;
  guestNames?: string;
  mealPreference: string;
  message: string;
}

export interface SubmittedGuestData {
  inviteCode?: string;
  fullName: string;
  nickname?: string;
  email: string;
  attendance: string;
  submittedAt?: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
  guest?: SubmittedGuestData;
}

type AppsScriptAction = 'lookupGuest' | 'submitRSVP';

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzuUmcS3-_tnS5RqFQf51llgmQnI9fsGw3qxla_QRKGNUy1i_LSoIQnTzhQGgRcH8U/exec';      

const getErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

const postToAppsScript = async <TResponse>(
  action: AppsScriptAction,
  payload: Record<string, unknown>
): Promise<TResponse> => {
  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      action,
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Network error: ${response.status} ${response.statusText}`
    );
  }

  try {
    return (await response.json()) as TResponse;
  } catch {
    throw new Error(
      'The RSVP server returned an invalid response. Please try again.'
    );
  }
};

export const lookupGuest = async (
  query: string
): Promise<LookupResponse> => {
  const cleanedQuery = (query || '').trim();

  if (!cleanedQuery) {
    return {
      success: false,
      message: 'Please enter your name, email, or invite code.',
    };
  }

  try {
    return await postToAppsScript<LookupResponse>('lookupGuest', {
      query: cleanedQuery,
    });
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        'Error looking up your invitation.'
      ),
    };
  }
};

export const submitRSVP = async (
  payload: RSVPPayload
): Promise<SubmitResponse> => {
  const nickname = (
    payload.nickname ||
    payload.guestNames ||
    ''
  ).trim();

  const cleanedPayload: Record<string, unknown> = {
    inviteCode: (payload.inviteCode || '').trim(),
    fullName: (payload.fullName || '').trim(),
    email: (payload.email || '').trim(),
    attendance: (payload.attendance || '').trim(),
    numberOfGuests: Number(payload.numberOfGuests) || 0,

    // Both keys are sent intentionally so the current and older backends
    // receive the exact nickname entered on the website.
    nickname,
    guestNames: nickname,

    mealPreference: (payload.mealPreference || '').trim(),
    message: (payload.message || '').trim(),
  };

  if (!cleanedPayload.attendance) {
    return {
      success: false,
      message: 'Please choose whether you will attend.',
    };
  }

  if (!nickname) {
    return {
      success: false,
      message: 'Please enter your nickname.',
    };
  }

  if (!cleanedPayload.fullName && !cleanedPayload.email) {
    return {
      success: false,
      message: 'Guest name or email address is required.',
    };
  }

  try {
    return await postToAppsScript<SubmitResponse>(
      'submitRSVP',
      cleanedPayload
    );
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        'We couldn’t submit your RSVP right now. Please try again or contact the couple.'
      ),
    };
  }
};
