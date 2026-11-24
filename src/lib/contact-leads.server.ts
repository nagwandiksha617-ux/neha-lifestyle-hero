const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
export const LEADS_SPREADSHEET_ID = "1KmgUoBHi73KR3WZ39fP4p3vW-iRmGnvOO_ogjdjg_nY";

export type LeadRow = { name: string; email: string; phone: string; subject: string; message: string };

export async function appendLead(lead: LeadRow): Promise<void> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovableKey || !sheetsKey) throw new Error("Google Sheets connection is not configured");
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const res = await fetch(
    `${GATEWAY_URL}/spreadsheets/${LEADS_SPREADSHEET_ID}/values/Leads!A:H:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[when, lead.name, lead.email, lead.phone, lead.subject, lead.message, "Website Contact Form", "New"]],
      }),
    },
  );
  if (!res.ok) {
    console.error(`Sheets append failed [${res.status}]: ${await res.text()}`);
    throw new Error("Could not save lead");
  }
}
