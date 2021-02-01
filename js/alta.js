const formulario_alta = document.querySelector("#formulario_alta");
formulario_alta.addEventListener("submit", (event) => 
{

    //campo1 requerido
    const campo1 = document.getElementById("campo1").value;
    
    //campos no requeridos
    const campo2 = document.getElementById("campo2").value;
    const campo3 = document.getElementById("campo3").value;
    const campo4 = document.getElementById("campo4").value;

    //si es requerido comprobamos que no este vacio
    if (campo1 === "")
    {
        return;
    }
    

    event.preventDefault();

    // peticion a google
    fetch("https://script.google.com/macros/s/AKfycbwHr4OKJ81dHP5vCgFu6CYTzuzpxWOud-HrVLot0xvYsSeGUOAX6iUk/exec", 
    {
        // mode: "no-cors",
        method: "POST",
        body: new URLSearchParams({
            "campo1": campo1,
            "campo2": campo2,
            "campo3": campo3,
            "campo4": campo4
        }),
        headers: 
        {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    })
    .then(res => 
        {
            console.log("resuestas=", res);
            if (res.ok == true)
            {
                document.getElementById("alta_respuesta").innerHTML = "Alta correcta";
                formulario_alta.reset();
            }
            else
            {
                document.getElementById("alta_respuesta").innerHTML = "Volver a intentar";
            }
        }
    )
    .catch(err => console.error(err));

});
