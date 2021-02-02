const formulario_alta = document.querySelector("#formulario_alta");
formulario_alta.addEventListener("submit", (event) => 
{
    
    event.preventDefault();

    document.getElementById("enviar").disabled = true;

    //campo1 requerido
    const categoria = document.getElementById("categoria").value;
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    
    //campos no requeridos
    const campo5 = document.getElementById("campo5").value;
    const campo6 = document.getElementById("campo6").value;
    const campo7 = document.getElementById("campo7").value;


    //si es requerido comprobamos que no este vacio
    if (categoria === "ninguno" || nombre === "" || direccion === "")
    {
        document.getElementById("alta_respuesta").innerHTML = "-- Te has olvidado seleccionar una categoria--";
        document.getElementById("enviar").disabled = false;
        return;
    }

    //construimos el objecto
    const objecto_datos = {
        "categoria": categoria,
        "nombre": nombre,
        "direccion": direccion,
        "campo5": campo5,
        "campo6": campo6,
        "campo7": campo7,
        "enviar": "alta"
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
    .then(res => 
        {
            if (res.ok == true)
            {
                document.getElementById("alta_respuesta").innerHTML = "Alta correcta";
                formulario_alta.reset();
            }
            else
            {
                document.getElementById("alta_respuesta").innerHTML = "Volver a intentar";
            }

            document.getElementById("enviar").disabled = false;
        }
    )
    .catch(
        err => {
            document.getElementById("enviar").disabled = false;
            console.error(err);
        }
        );

});
