/**
 * RSVP Backend for Sam & Charis Wedding
 * Google Apps Script Web App
 */

const CONFIG = {
  SPREADSHEET_ID: "1iGiza34Z93--tty5580CTb3ccD85BlpHX7cssOfrxTc",
  SHEET_INVITEES: "Invitees",
  SHEET_RSVP: "RSVP Responses",
  SHEET_DETAILS: "Wedding Details",
  SHEET_LOGS: "Email Logs"
};

function setupRSVPSheets() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  
  // Setup Invitees
  let inviteesSheet = ss.getSheetByName(CONFIG.SHEET_INVITEES);
  if (!inviteesSheet) {
    inviteesSheet = ss.insertSheet(CONFIG.SHEET_INVITEES);
    inviteesSheet.appendRow([
      "Invite Code", "Full Name", "Email", "Phone", "Guest Group", 
      "Allowed Guests", "Plus One Allowed", "Table Number", "Side", 
      "RSVP Status", "Attendance", "Number of Guests Attending", "Guest Names", 
      "Meal Preference", "Message", "Date Responded", "Last Updated"
    ]);
    inviteesSheet.getRange("A1:Q1").setFontWeight("bold");
    inviteesSheet.setFrozenRows(1);
  }

  // Setup RSVP Responses
  let rsvpSheet = ss.getSheetByName(CONFIG.SHEET_RSVP);
  if (!rsvpSheet) {
    rsvpSheet = ss.insertSheet(CONFIG.SHEET_RSVP);
    rsvpSheet.appendRow([
      "Timestamp", "Invite Code", "Full Name", "Email", 
      "Attendance", "Number of Guests Attending", "Guest Names", 
      "Meal Preference", "Message", "Source", "Status"
    ]);
    rsvpSheet.getRange("A1:K1").setFontWeight("bold");
    rsvpSheet.setFrozenRows(1);
  }

  // Setup Wedding Details
  let detailsSheet = ss.getSheetByName(CONFIG.SHEET_DETAILS);
  if (!detailsSheet) {
    detailsSheet = ss.insertSheet(CONFIG.SHEET_DETAILS);
    detailsSheet.appendRow(["Detail Key", "Detail Value"]);
    detailsSheet.getRange("A1:B1").setFontWeight("bold");
    detailsSheet.setFrozenRows(1);
    
    // Sample details
    const sampleDetails = [
      ["Couple Names", "Sam & Charis"],
      ["Wedding Date", "September 25, 2026"],
      ["Wedding Time", "3:00 PM"],
      ["Ceremony Venue", "St. Patrick Church"],
      ["Reception Venue", "The Grand Ballroom"],
      ["Venue Address", "123 Wedding Lane"],
      ["Attire", "Formal / Black Tie Optional"],
      ["Color Palette", "Sage Green, Cream, White, Soft Gold"],
      ["Reminder", "Please arrive 30 minutes early."],
      ["Contact Person", "Wedding Coordinator"],
      ["Contact Number", "123-456-7890"]
    ];
    detailsSheet.getRange(2, 1, sampleDetails.length, 2).setValues(sampleDetails);
  }

  // Setup Email Logs
  let logsSheet = ss.getSheetByName(CONFIG.SHEET_LOGS);
  if (!logsSheet) {
    logsSheet = ss.insertSheet(CONFIG.SHEET_LOGS);
    logsSheet.appendRow([
      "Timestamp", "Invite Code", "Full Name", "Email", 
      "Email Type", "Subject", "Status", "Error Message"
    ]);
    logsSheet.getRange("A1:H1").setFontWeight("bold");
    logsSheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;

    if (action === "lookupGuest") {
      return handleLookupGuest(postData);
    } else if (action === "submitRSVP") {
      return handleSubmitRSVP(postData);
    } else {
      return createJsonResponse({ success: false, message: "Invalid action." });
    }
  } catch (error) {
    return createJsonResponse({ success: false, message: "Error processing request: " + error.toString() });
  }
}

function handleLookupGuest(data) {
  const query = (data.query || "").toString().trim().toLowerCase();
  if (!query) {
    return createJsonResponse({ success: false, message: "Query is empty." });
  }

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_INVITEES);
  if (!sheet) return createJsonResponse({ success: false, message: "Invitees sheet not found." });

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) {
    return createJsonResponse({ success: false, message: "No invitees found in database." });
  }

  const headers = rows[0];
  const colCode = headers.indexOf("Invite Code");
  const colName = headers.indexOf("Full Name");
  const colEmail = headers.indexOf("Email");
  
  if (colCode === -1 || colName === -1 ) {
    return createJsonResponse({ success: false, message: "Invitees sheet is missing required columns (Invite Code, Full Name)." });
  }

  let matches = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const code = (row[colCode] || "").toString().trim();
    const name = (row[colName] || "").toString().trim();
    const email = colEmail > -1 ? (row[colEmail] || "").toString().trim() : "";

    // Skip empty lines
    if (!name && !code && !email) continue; 

    if (code.toLowerCase() === query || 
        name.toLowerCase() === query || 
        (email && email.toLowerCase() === query)) {
      matches.push({ rowIdx: i, data: row });
    } else if (name.toLowerCase().includes(query) && query.length > 3) {
      matches.push({ rowIdx: i, data: row });
    }
  }

  if (matches.length === 0) {
    return createJsonResponse({ 
      success: false, 
      message: "We couldn’t find your invitation. Please check your name, email, or invite code." 
    });
  } else if (matches.length > 1) {
     return createJsonResponse({ 
      success: false, 
      message: "We found more than one possible match. Please enter your invite code or email." 
    });
  }

  const match = matches[0].data;
  const colAllowed = headers.indexOf("Allowed Guests");
  const colStatus = headers.indexOf("RSVP Status");

  return createJsonResponse({
    success: true,
    message: "Invitation found.",
    guest: {
      inviteCode: match[colCode],
      fullName: match[colName],
      email: colEmail > -1 ? match[colEmail] : "",
      allowedGuests: colAllowed > -1 ? parseInt(match[colAllowed]) || 1 : 1,
      rsvpStatus: colStatus > -1 ? match[colStatus] : ""
    }
  });
}

function handleSubmitRSVP(data) {
  const { inviteCode, fullName, email, attendance, numberOfGuests, guestNames, mealPreference, message } = data;
  
  if (!inviteCode || !attendance) {
    return createJsonResponse({ success: false, message: "Invite code and attendance are required." });
  }

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  
  // 1. Verify in Invitees
  const inviteesSheet = ss.getSheetByName(CONFIG.SHEET_INVITEES);
  if (!inviteesSheet) return createJsonResponse({ success: false, message: "Invitees sheet not found." });
  
  const inviteesData = inviteesSheet.getDataRange().getValues();
  const iHeaders = inviteesData[0];
  const iColCode = iHeaders.indexOf("Invite Code");
  
  let targetRowIdx = -1;
  for (let i = 1; i < inviteesData.length; i++) {
    if ((inviteesData[i][iColCode] || "").toString().trim() === inviteCode.trim()) {
      targetRowIdx = i + 1; // +1 because array is 0-indexed and sheet is 1-indexed
      break;
    }
  }

  if (targetRowIdx === -1) {
    return createJsonResponse({ success: false, message: "Guest not found in official list." });
  }

  const matchedRow = inviteesData[targetRowIdx - 1];
  const colAllowedGuests = iHeaders.indexOf("Allowed Guests");
  const allowedGuests = colAllowedGuests > -1 ? parseInt(matchedRow[colAllowedGuests]) || 1 : 1;
  const numGuestsStr = numberOfGuests !== undefined && numberOfGuests !== "" ? numberOfGuests : (attendance.toLowerCase() === "yes" ? 1 : 0);
  let numGuests = parseInt(numGuestsStr) || 0;
  
  if (attendance.toLowerCase() === "yes" && numGuests > allowedGuests) {
    return createJsonResponse({ success: false, message: "Number of guests exceeds allowed limit." });
  }

  if (attendance.toLowerCase() !== "yes") {
    numGuests = 0;
  }

  const now = new Date();

  // 2. Update Invitees
  const colsToUpdate = {
    "RSVP Status": "Responded",
    "Attendance": attendance,
    "Number of Guests Attending": numGuests,
    "Guest Names": guestNames || "",
    "Meal Preference": mealPreference || "",
    "Message": message || "",
    "Date Responded": now,
    "Last Updated": now
  };
  
  for (const [colName, val] of Object.entries(colsToUpdate)) {
    const colIdx = iHeaders.indexOf(colName);
    if (colIdx > -1) {
      inviteesSheet.getRange(targetRowIdx, colIdx + 1).setValue(val);
    }
  }

  // 3. Update or Insert RSVP Responses
  const rsvpSheet = ss.getSheetByName(CONFIG.SHEET_RSVP);
  if (!rsvpSheet) return createJsonResponse({ success: false, message: "RSVP Responses sheet not found." });
  
  const rsvpData = rsvpSheet.getDataRange().getValues();
  const rHeaders = rsvpData[0];
  const rColCode = rHeaders.indexOf("Invite Code");
  
  let rsvpRowIdx = -1;
  for (let i = 1; i < rsvpData.length; i++) {
    if ((rsvpData[i][rColCode] || "").toString().trim() === inviteCode.trim()) {
      rsvpRowIdx = i + 1;
      break;
    }
  }

  const fbName = matchedRow[iHeaders.indexOf("Full Name")];
  const fbEmail = iHeaders.indexOf("Email") > -1 ? matchedRow[iHeaders.indexOf("Email")] : "";

  const rsvpRecord = [
    now,
    inviteCode,
    fullName || fbName,
    email || fbEmail,
    attendance,
    numGuests,
    guestNames || "",
    mealPreference || "",
    message || "",
    "Web App",
    "Recorded"
  ];

  if (rsvpRowIdx > -1) {
    // Update existing
    // We construct an array matching rHeaders
    const updatedRecord = rHeaders.map((h, i) => {
       const mappedVal = getMappedRsvpValue(h, rsvpRecord);
       return mappedVal !== undefined ? mappedVal : rsvpData[rsvpRowIdx-1][i];
    });
    rsvpSheet.getRange(rsvpRowIdx, 1, 1, updatedRecord.length).setValues([updatedRecord]);
  } else {
    // Append new
    const newRecord = rHeaders.map((h, i) => getMappedRsvpValue(h, rsvpRecord) || "");
    rsvpSheet.appendRow(newRecord);
  }
  
  // 4. Send Confirmation Email
  const finalEmail = email || fbEmail;
  if (finalEmail) {
    sendConfirmationEmail(ss, finalEmail, fullName || fbName, attendance, numGuests, guestNames || "", inviteCode);
  }

  return createJsonResponse({ 
    success: true, 
    message: "RSVP submitted successfully.",
    guest: {
      inviteCode,
      fullName: fullName || fbName,
      email: finalEmail,
      attendance
    }
  });
}

function getMappedRsvpValue(headerName, recordArr) {
    const map = {
      "Timestamp": recordArr[0], "Invite Code": recordArr[1], "Full Name": recordArr[2],
      "Email": recordArr[3], "Attendance": recordArr[4], "Number of Guests Attending": recordArr[5],
      "Guest Names": recordArr[6], "Meal Preference": recordArr[7], "Message": recordArr[8],
      "Source": recordArr[9], "Status": recordArr[10]
    };
    return map[headerName];
}

function sendConfirmationEmail(ss, guestEmail, guestName, attendance, numGuests, guestNamesList, inviteCode) {
  try {
    const detailsSheet = ss.getSheetByName(CONFIG.SHEET_DETAILS);
    const detailsData = detailsSheet ? detailsSheet.getDataRange().getValues() : [];
    let details = {};
    for (let i = 1; i < detailsData.length; i++) {
       details[detailsData[i][0]] = detailsData[i][1];
    }

    const coupleNames = details["Couple Names"] || "Sam & Charis";
    const date = details["Wedding Date"] || "";
    const time = details["Wedding Time"] || "";
    const venue = details["Ceremony Venue"] || "";
    const address = details["Venue Address"] || "";
    const attire = details["Attire"] || "";
    const reminder = details["Reminder"] || "";

    const isAttending = attendance.toLowerCase() === "yes";
    const subject = isAttending 
      ? `RSVP Confirmed — ${coupleNames} Wedding`
      : `RSVP Response Received — ${coupleNames} Wedding`;

    let body = `Dear ${guestName},\n\n`;
    if (isAttending) {
      body += `Thank you! Your RSVP has been confirmed. We are excited to celebrate with you.\n\n`;
      body += `Details:\n`;
      body += `Guests Attending: ${numGuests}\n`;
      if (guestNamesList) body += `Guest Names: ${guestNamesList}\n`;
      body += `Date: ${date}\n`;
      body += `Time: ${time}\n`;
      body += `Venue: ${venue}\n`;
      body += `Address: ${address}\n`;
      if (attire) body += `Attire: ${attire}\n\n`;
      if (reminder) body += `Reminder: ${reminder}\n\n`;
      body += `We look forward to seeing you!\n\n`;
    } else {
      body += `Thank you for letting us know. We have recorded your response and you will be missed on our special day.\n\n`;
    }
    body += `Warmly,\n${coupleNames}`;

    MailApp.sendEmail({
      to: String(guestEmail).trim(),
      subject: subject,
      body: body
    });

    logEmailResult(ss, inviteCode, guestName, guestEmail, "Confirmation", subject, "Success", "");

  } catch (err) {
    logEmailResult(ss, inviteCode, guestName, guestEmail, "Confirmation", "", "Failed", err.toString());
  }
}

function logEmailResult(ss, inviteCode, guestName, email, type, subject, status, errMessage) {
    const logsSheet = ss.getSheetByName(CONFIG.SHEET_LOGS);
    if (logsSheet) {
        logsSheet.appendRow([
            new Date(), inviteCode, guestName, email, type, subject, status, errMessage
        ]);
    }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  // Provided for completeness, though fetching as text/plain avoids OPTIONS.
  return ContentService.createTextOutput("OK");
}
