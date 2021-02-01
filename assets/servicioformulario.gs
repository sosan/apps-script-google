const hojadb = "14yfZ0dxrj8ED32Z2eOW0wgQTUmv3txGJRXWgprvBrno";

// function doGet(request)
function doPost(request)
{

  if (request == undefined)
  {
    return ContentService.createTextOutput("KO");
  }

  let sheet = SpreadsheetApp.openById(hojadb).getSheets()[0];

  if (request.parameter.campo1 != undefined)
  {
    sheet.appendRow([
      request.parameter.campo1,
      request.parameter.campo2,
      request.parameter.campo3,
      request.parameter.campo4
    ]);

    return ContentService.createTextOutput(JSON.stringify({ok: "OK"}));
  }

  let datafromsheet = [];
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++)
  {
      const row = data[i];
      datafromsheet.push(
      {
        campo1: row[1],
        campo2: row[2],
        campo3: row[3],
        campo4: row[4]
      }
      );
  }

  return ContentService.createTextOutput(JSON.stringify({datos: datafromsheet}));

}


