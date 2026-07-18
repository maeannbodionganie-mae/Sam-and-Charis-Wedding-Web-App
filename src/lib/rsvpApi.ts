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
  guestNames: string;
  mealPreference: string;
  message: string;
}

export interface SubmittedGuestData {
  inviteCode?: string;
  fullName: string;
  email: string;
  attendance: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
  guest?: SubmittedGuestData;
}

/**
 * Current Google Apps Script Web App deployment.
 */
const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx2NlWUrQizCaY3yjD-8k_yuypeYZsQRLTNXJl7cywopk4s1pKtnJrg0ZvULWdJcVF2/exec';

type AppsScriptAction = 'lookupGuest' | 'submitRSVP';

const getErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

/**
 * Sends data to the Google Apps Script backend.
 *
 * text/plain is intentionally used to avoid a browser CORS preflight.
 * The request body remains a JSON string and is parsed by doPost().
 */
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

/**
 * Looks up an invitation using the guest's name, email, or invite code.
 */
export const lookupGuest = async (
  query: string
): Promise<LookupResponse> => {
  const cleanedQuery = (query || '').trim();

  if (!cleanedQuery) {
    return {
      success: false,
      message: 'Please enter your name or email address.',
    };
  }

  try {
    return await postToAppsScript<LookupResponse>(
      'lookupGuest',
      {
        query: cleanedQuery,
      }
    );
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        'Error looking up invitation.'
      ),
    };
  }
};

/**
 * Submits the guest's RSVP.
 *
 * Invite code is optional. Attendance is required.
 */
export const submitRSVP = async (
  payload: RSVPPayload
): Promise<SubmitResponse> => {
  const cleanedPayload = {
    inviteCode: (payload.inviteCode || '').trim(),
    fullName: (payload.fullName || '').trim(),
    email: (payload.email || '').trim(),
    attendance: (payload.attendance || '').trim(),
    numberOfGuests: Number(payload.numberOfGuests) || 0,
    guestNames: (payload.guestNames || '').trim(),
    mealPreference: (payload.mealPreference || '').trim(),
    message: (payload.message || '').trim(),
  };

  if (!cleanedPayload.attendance) {
    return {
      success: false,
      message: 'Please choose whether you will attend.',
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