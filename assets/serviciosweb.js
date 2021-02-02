const hojadb = "1h46fqYu7Fnu6UMDRDnUfRrxJmCrK_n1gj1CgO4BnGLs";
const EMAIL = "";

function doPost(request) {

  if (request == undefined) {
    return ContentService.createTextOutput(JSON.stringify({ "error": true }));
  }

  const { parameter, postData: { contents, type } = {} } = request;

  if (type !== 'application/x-www-form-urlencoded') {
    return ContentService.createTextOutput(JSON.stringify({ "error": true }));
  }

  let jsonData;
  if (type === 'application/x-www-form-urlencoded') {
    jsonData = {};
    contents
      .split('&')
      .map((input) => input.split('='))
      .forEach(([key, value]) => {
        jsonData[decodeURIComponent(key)] = decodeURIComponent(value);
      });
  }

  // const jsonData = JSON.parse(request.postData.contents);

  let sheet = SpreadsheetApp.openById(hojadb).getSheets()[0];

  //consulta
  if (jsonData["enviar"] === "consulta") {
    //consulta
    const fulldata = sheet.getDataRange().getValues();
    const datafromsheet = realizar_consultas(jsonData["categoria"], fulldata);
    return ContentService.createTextOutput(JSON.stringify({ datos: datafromsheet, error: false }));
  }
  else if (jsonData["enviar"] === "alta") {
    //registro
    if (jsonData["categoria"] != undefined) {

      const datosAlta = ["n"];

      Object.values(jsonData).forEach(valor => {
        if (valor !== "alta") {
          datosAlta.push(valor);

        }
      });

      sheet.appendRow(datosAlta);

      if (EMAIL !== "") {
        MailApp.sendEmail({
          to: EMAIL,
          name: "Monitor Servicio Web",
          subject: `Nueva alta ${jsonData["nombre"]}`
        });

      }

      return ContentService.createTextOutput(JSON.stringify({ error: false, alta: true }));
    }

  }

  return ContentService.createTextOutput(JSON.stringify({ "error": true }));

}


function realizar_consultas(categoria, fulldata) {

  let datafromsheet = [];
  const encabezados = fulldata[0];
  const POSICION_ACTIVADO = 0;
  const POSICION_CATEGORIA = 1;

  if (categoria === "todos") {

    for (let i = 1; i < fulldata.length; i++) {

      if (fulldata[i][POSICION_ACTIVADO] === "n") continue;
      const linea = fulldata[i];

      let campos = {};
      for (let j = 0; j < linea.length; j++) {
        campos[encabezados[j]] = linea[j];

      }

      datafromsheet.push(campos);

    }
  }
  else {
    for (let i = 1; i < fulldata.length; i++) {
      if (fulldata[i][POSICION_ACTIVADO] === "n") continue;

      const linea = fulldata[i];

      let campos = {};
      let size_campos = 0;
      for (let j = 0; j < linea.length; j++) {
        if (linea[POSICION_CATEGORIA] === categoria) {
          campos[encabezados[j]] = linea[j];
          size_campos++;
        }

      }

      if (size_campos > 0) {
        datafromsheet.push(campos);

      }

    }

  }

  return datafromsheet;

}