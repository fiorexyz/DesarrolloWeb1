//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
//Creamos una constante que permite identificar el maximo de intentos
const numeroIntentos = 3;
//Guardará el número de intentos que realiza el usuario
let intentos = 1;

function generarNumeroAleatorio() {
    //Definimos una variable para impresión de mensajes
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");
    
    //Verificar en qué intento está el usuario
    if (intentos <= numeroIntentos) {
        let numero = prompt("¿Qué número se ha generado (Intento " + intentos + ") ?");
        numero = Number(numero);
        
        //Verificamos el número aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}).
            Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado.
            El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else {
            // Aquí se agrega la parte solicitada: indicar si el número es más alto o más bajo
            if (numero < numeroAleatorio) {
                mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos. 
                Pista: el número oculto es más ALTO.`;
            } else {
                mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos. 
                Pista: el número oculto es más BAJO.`;
            }
        }
        //Aumentamos el valor de los intentos
        intentos++;
    } else {
        mensaje = `Su numero de intentos ha terminado.
        El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}