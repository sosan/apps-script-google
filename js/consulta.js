const formulario_consulta = document.querySelector("#formulario_consulta");
formulario_consulta.addEventListener("submit", async (event) => 
{

    event.preventDefault();

    // peticion a google

    const response = await fetch("https://script.google.com/macros/s/AKfycbwHr4OKJ81dHP5vCgFu6CYTzuzpxWOud-HrVLot0xvYsSeGUOAX6iUk/exec",
    {
        // mode: "no-cors",
        method: "POST",
        headers:
        {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    });

    if (response.ok === false)
    {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    
    const data = await response.json();
    console.log(data);
});
