const hojadb = "14yfZ0dxrj8ED32Z2eOW0wgQTUmv3txGJRXWgprvBrno";

// function doGet(request) 
function doPost(request)
{
  Logger.log("Hola");
  var sheet = SpreadsheetApp.openById(hojadb).getSheets()[0];

  const id = request.parameter.id;
  if (id != undefined)
  {
    sheet.appendRow([
      request.parameter.id,
      request.parameter.campo1,
      request.parameter.campo2,
      request.parameter.campo3,
      request.parameter.campo4
    ]);

    return ContentService.createTextOutput("OK");
  }

  let datafromsheet = [];
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++)
  {
      const row = data[i];
      datafromsheet.push(
      {
          id: row[0],
          campo1: row[1],
          campo2: row[2],
          campo3: row[3],
          campo4: row[4]
      }
      );
  }

  return ContentService.createTextOutput(JSON.stringify({datos: datafromsheet}));

}


