// Otra forma de acceder a un elemento HTML es utilizando el getElementById del DOM
// Nótese que para este caso no se antepone el carácter #
const campo = document.getElementById("idTxtNumero");

// Definamos una función anónima que permita validar en tiempo real el ingreso de un número
const validarNumero = function (e) {
    // Creamos una expresión regular que valida que sean números
    let validar = /[0-9]{1}$/;
    let tecla = e.key;

    // Test valida que la expresión regular coincida con el valor ingresado
    // Si se intenta teclear una letra u otro carácter diferente a un número, este no se escribe en el campo
    if (!validar.test(tecla)) e.preventDefault();
};

// Definiendo el evento keypress para el campo
campo.addEventListener("keypress", validarNumero);

// Trabajando con el botón Calcular
const boton = document.getElementById("idBtnCalcular");

// Definiendo una función anónima para calcular el factorial de un número
function calcularFactorial(numero) {
    return numero < 2 ? 1 : numero * calcularFactorial(numero - 1);
}

// Definamos una función de tipo flecha para imprimir el resultado del factorial
const imprimir = (numero, resultado) => {
    const contenedor = document.getElementById("idDivResultado");
    contenedor.innerHTML = `El factorial de ${numero}! es ${resultado}`;
};




// Definiendo una función tradicional
function calcular() {
    let numero = document.getElementById("idTxtNumero").value;
    if (numero != "") {
        // Llamamos a la función anónima para que calcule el factorial
        let resultado = calcularFactorial(numero);
        // Enviamos el resultado a una función de tipo flecha
        imprimir(numero, resultado);
    } else {
        alert("Debe ingresar un número válido");
    }
}

// Definiendo el evento click para el botón
boton.addEventListener("click", calcular);
