# Google Apps Script Backend Setup Guide
This guide explains how to deploy the Google Apps Script backend that connects your RSVP frontend to your Google Sheet.

## Step 1: Open the Google Sheet
Open the Google Sheet listed as your single source of truth for the wedding app:
[https://docs.google.com/spreadsheets/d/1iGiza34Z93--tty5580CTb3ccD85BlpHX7cssOfrxTc/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1iGiza34Z93--tty5580CTb3ccD85BlpHX7cssOfrxTc/edit?usp=sharing)

## Step 2: Open the Apps Script Editor
In the Google Sheet menu, go to **Extensions** > **Apps Script**. This will open a new tab with the code editor.

## Step 3: Paste the Code
Copy the full contents of `src/rsvp-backend-google-apps-script.gs` from your codebase. 
Paste everything into the `Code.gs` file in the Apps Script editor, replacing the default `myFunction()`.

## Step 4: Run the Initial Setup
1. In the Apps Script toolbar at the top, select the function `setupRSVPSheets` from the dropdown menu (it's right next to the "Run" button).
2. Click the **Run** button.

## Step 5: Authorize Permissions
1. Google will prompt you with "Authorization Required". Click **Review Permissions**.
2. Select your Google account.
3. You may see a warning saying "Google hasn't verified this app". Click **Advanced** at the bottom, then click **Go to Untitled project (unsafe)**.
4. Click **Allow** to grant the scripts permissions to view and edit your spreadsheets and send emails on your behalf.
*Wait for the script to finish running. You will see "Execution started" and "Execution completed". This has prepared the required tabs in your Google Sheet.*

## Step 6: Deploy as a Web App
Now you need to expose this script so the RSVP website can send data to it.
1. In the top right corner of the Apps Script editor, click the blue **Deploy** button.
2. Select **New deployment**.
3. Click the gear icon (`⚙️`) next to "Select type" and choose **Web app**.
4. In the configuration:
   * **Description**: `RSVP Backend v1` (or any description you like)
   * **Execute as**: `Me (your email)`
   * **Who has access**: `Anyone` *(Make sure it's "Anyone", NOT "Anyone with a Google Account")*
5. Click **Deploy**.

## Step 7: Copy the Web App URL
Once the deployment finishes, you will see a confirmation screen with a unique `Web app URL`. 
**Copy this URL.**

## Step 8: Update your Environment File
Go back to your local development environment. 
1. Open the `.env` file (if you don't have one, copy `.env.example` to `.env`).
2. Paste the Web App URL into the correct variable:
```env
VITE_GOOGLE_APPS_SCRIPT_URL=PASTE_YOUR_WEB_APP_URL_HERE
```

## Step 9: Restart the Server
Restart your local development server to ensure the website picks up the new environment variable. Your RSVP page will now correctly communicate with your Google Sheet!

---
*Note: If you make changes to the Google Apps Script code in the future, you must go to **Deploy > Manage deployments > Edit > New version** and deploy again for changes to take effect.*
