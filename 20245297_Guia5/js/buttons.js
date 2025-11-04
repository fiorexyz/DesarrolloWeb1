function aviso(){
    alert("Bienvenido al mundo de JavaScript");
}

function confirmacion(){
    //Los valores a almcenar solo pueden ser true or false
    let confirmacion = confirm("Desea salir de la sesión?");
    /*para imprimir una variable en cadena podemos utilizar las comillas simples inversas */
    alert(`Valor seleccionado ${confirmacion}`);
}

function capturarDatos(){
    let nombre = prompt("Cual es su nombre?");
    let edad = prompt('Cual es su edad', 0);
    
    alert(`Su nombre es ${nombre} y su edad ${edad}`);
}

function dibujarParrafo(){
    let parrafo = prompt(
        "Escriba la información que desea visualizar en el párrafo"
    );

    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;   
}

