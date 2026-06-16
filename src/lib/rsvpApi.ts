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

export interface SubmitResponse {
  success: boolean;
  message: string;
  guest?: any;
}

const getUrl = () => {
  const url = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
  if (!url) {
    throw new Error('RSVP backend is not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL.');
  }
  return url;
};

// Send post request avoiding JSON content-type header to prevent CORS preflight.
// The Apps Script expects JSON string inside the post body.
const postToAppsScript = async (action: string, payload: any) => {
  const url = getUrl();
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ action, ...payload }),
  });

  if (!response.ok) {
     throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const lookupGuest = async (query: string): Promise<LookupResponse> => {
  try {
    return await postToAppsScript('lookupGuest', { query });
  } catch (error: any) {
    return { success: false, message: error.message || 'Error looking up invitation.' };
  }
};

export const submitRSVP = async (payload: RSVPPayload): Promise<SubmitResponse> => {
   try {
     return await postToAppsScript('submitRSVP', payload);
   } catch (error: any) {
     return { success: false, message: error.message || 'We couldn’t submit your RSVP right now. Please try again or contact the couple.' };
   }
};
