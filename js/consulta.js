const formulario_consulta = document.querySelector("#formulario_consulta");
formulario_consulta.addEventListener("submit", async (event) => 
{
    
    event.preventDefault();

    document.getElementById("enviar").disabled = true;
    const categoria = document.getElementById("categoria").value;

    if (categoria === "")
    {
        document.getElementById("enviar").disabled = false;
        return;
    }

    const objecto_datos = {
        "categoria": categoria,
        "enviar": "consulta"
    };

    // peticion a google
    fetch("https://script.google.com/macros/s/AKfycbzflgD74kEtxxwxX_tmTDJOXtpCvzAcLm_yRiLOzFvXkHZOiAsXxy5sUQ/exec",
    {
        // mode: "no-cors",
        method: "POST",
        body: new URLSearchParams(objecto_datos),
        headers:
        {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
    })
    .then(res => {
        return res.json();
    }
    )
    .then(res => {

        console.log(res);
        document.getElementById("enviar").disabled = false;
        if (res.error == true)
        {
            //problema
            document.getElementById("errores").innerHTML = "Volver a intentar";
        }
        else
        {
            const tabla = creartabla(res.datos);
            document.getElementById("tabla_seccion").appendChild(tabla);

        }
    

    })
    .catch(err => {
        document.getElementById("enviar").disabled = false;
        console.error(err);
    });

});


function creartabla(elementos)
{

    const cabeceras = ["Categoria", "Nombre", "Direccion", "Campo5", "Campo6", "Campo7", "Campo8", "Campo9", "Campo10"];
    const propiedades = [

        "categoria", 
        "nombre", 
        "direccion", 
        "campo5", 
        "campo6",
        "campo7",
        "campo8",
        "campo9",
        "campo10"
    ];


    //si encontramos la tabla borramos
    const tablaABorrar = document.getElementById("tablaid");
    if (tablaABorrar !== null)
    {
        tablaABorrar.remove();
    }

    const tabla = document.createElement("table");
    tabla.id = "tablaid";
    const hrow = tabla.insertRow();
    for (let cabecera of cabeceras)
    {
        hrow.insertCell(-1).outerHTML = "<th>" + cabecera + "</th>";
    }


    for (let elemento of elementos)
    {
        const linea = tabla.insertRow(-1);

        for (let propiedad of propiedades) 
        {
            linea.insertCell(-1).innerHTML = elemento[propiedad];
        }
    }

    return tabla;
}
