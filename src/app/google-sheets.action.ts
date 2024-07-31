"use server";
import { google } from "googleapis";
import { InputData } from "@/app/page";

const glAuth = new google.auth.GoogleAuth({
  credentials: {
    project_id: "gen-lang-client-0668604159",
    private_key_id: "3a5b68b2cd4c4c8a916175fe47702c6ae933ad1d",
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: "101989960457535305792",
    universe_domain: "googleapis.com",
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const glSheets = google.sheets({ version: "v4", auth: glAuth });

//to get the data
export async function getSheetData() {
  const spreadsheet: any = await glSheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
  });
  const sheetTitle = spreadsheet.data.sheets[0].properties?.title;
  const Alldata = await glSheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${sheetTitle}!A:ZZ`,
  });

  return { data: Alldata.data.values };
}

//function to append data
export async function appendNewData(inputData: InputData) {
  console.log(inputData);

  const Alldata = await glSheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `A1:C1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[inputData.TimeStamp, inputData.Prompt, inputData.Posts.join()]],
    },
  });

  return { data: Alldata.data };
}
