/**
 * EMPFEHLUNG: Verbessertes Google Apps Script
 * ============================================
 * Dieses Script formatiert Datum und Uhrzeit direkt serverseitig,
 * sodass im JSON saubere Strings ankommen statt ISO-Datumsformate
 * mit dem 1899-Epoch-Problem.
 *
 * ANLEITUNG:
 * 1. Google Sheets öffnen → Erweiterungen → Apps Script
 * 2. Das alte doGet() durch dieses hier ersetzen
 * 3. Oben auf "Bereitstellen" → "Neue Bereitstellung" klicken
 *    (oder bestehende aktualisieren)
 * 4. Neuen Bereitstellungs-URL in index.html eintragen (falls sich die URL ändert)
 *
 * HINWEIS: Die Website funktioniert auch mit dem alten Script,
 * da die Formatierung auch client-seitig gemacht wird. Dieses
 * Update macht das JSON aber sauberer.
 */

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabellenblatt1");
  var data = sheet.getDataRange().getValues();
  var jsonData = {};
  var headers = data[0];
  var tz = Session.getScriptTimeZone();
  jsonData['data'] = [];

  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      var val = data[i][j];

      if (val instanceof Date) {
        if (val.getFullYear() < 1900) {
          // Uhrzeit-Zelle (Google Sheets Epoch 1899) → nur HH:mm
          row[headers[j]] = Utilities.formatDate(val, tz, "HH:mm");
        } else {
          // Datum-Zelle → dd.MM.yyyy
          row[headers[j]] = Utilities.formatDate(val, tz, "dd.MM.yyyy");
        }
      } else {
        row[headers[j]] = val;
      }
    }
    jsonData['data'].push(row);
  }

  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
