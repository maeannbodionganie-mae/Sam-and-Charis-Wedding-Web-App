export interface GuestData {
  inviteCode: string;
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
  inviteCode: string;
  fullName: string;
  email: string;
  attendance: string;
  numberOfGuests: number;
  guestNames: string;
  mealPreference: string;
  message: string;
}

export interface SubmittedGuestData {
  inviteCode: string;
  fullName: string;
  email: string;
  attendance: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
  guest?: SubmittedGuestData;
}

interface AppsScriptErrorResponse {
  success?: boolean;
  message?: string;
}

/**
 * Current Google Apps Script Web App URL.
 *
 * Fixed directly in the website code so an old environment variable
 * cannot redirect the RSVP website to a previous Apps Script deployment.
 */
const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx2NlWUrQizCaY3yjD-8k_yuypeYZsQRLTNXJl7cywopk4s1pKtnJrg0ZvULWdJcVF2/exec';

/**
 * Returns the active RSVP backend URL.
 */
const getUrl = (): string => {
  const url = GOOGLE_APPS_SCRIPT_URL.trim();

  if (!url) {
    throw new Error('RSVP backend is not configured.');
  }

  if (!url.startsWith('https://script.google.com/macros/s/')) {
    throw new Error('The RSVP backend URL is invalid.');
  }

  if (!url.endsWith('/exec')) {
    throw new Error(
      'The RSVP backend URL must be the deployed Web App URL ending in /exec.'
    );
  }

  return url;
};

/**
 * Converts unknown errors into a readable message.
 */
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
 * Sends a POST request to Google Apps Script.
 *
 * text/plain is intentionally used to avoid a browser CORS preflight.
 * The body remains a valid JSON string that Apps Script parses in doPost().
 */
const postToAppsScript = async <TResponse>(
  action: 'lookupGuest' | 'submitRSVP',
  payload: Record<string, unknown>
): Promise<TResponse> => {
  const response = await fetch(getUrl(), {
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

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      'The RSVP server returned an invalid response. Please try again.'
    );
  }

  const possibleError = result as AppsScriptErrorResponse;

  if (
    possibleError &&
    possibleError.success === false &&
    possibleError.message
  ) {
    return result as TResponse;
  }

  return result as TResponse;
};

/**
 * Looks up a guest using their name, email address, or invite code.
 */
export const lookupGuest = async (
  query: string
): Promise<LookupResponse> => {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return {
      success: false,
      message: 'Please enter your name, email, or invite code.',
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
 * Submits the RSVP form to the Google Apps Script backend.
 */
export const submitRSVP = async (
  payload: RSVPPayload
): Promise<SubmitResponse> => {
  const cleanedPayload: RSVPPayload = {
    inviteCode: payload.inviteCode.trim(),
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    attendance: payload.attendance.trim(),
    numberOfGuests: Number(payload.numberOfGuests) || 0,
    guestNames: payload.guestNames.trim(),
    mealPreference: payload.mealPreference.trim(),
    message: payload.message.trim(),
  };

  if (!cleanedPayload.inviteCode) {
    return {
      success: false,
      message: 'Invite code is required.',
    };
  }

  if (!cleanedPayload.attendance) {
    return {
      success: false,
      message: 'Please select your attendance response.',
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