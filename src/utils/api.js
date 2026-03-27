import { SHEET_CONFIG } from "../config/constants";

/**
 * Récupère les données depuis Google Sheets API
 */
export async function fetchSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_CONFIG.SHEET_ID}/values/${encodeURIComponent(SHEET_CONFIG.RANGE)}?key=${SHEET_CONFIG.API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  const json = await res.json();
  if (!json.values || json.values.length < 2) return [];
  const [headers, ...rows] = json.values;
  return rows.map((row) =>
    Object.fromEntries(
      headers.map((h, i) => [h.trim(), (row[i] || "").trim()])
    )
  );
}
