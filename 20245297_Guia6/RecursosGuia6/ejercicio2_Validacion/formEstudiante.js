document.getElementById("formEstudiante").addEventListener("submit", function(e){
    e.preventDefault();

    const carnet = document.getElementById("carnet").value;
    const nombre = document.getElementById("nombre").value;
    const dui = document.getElementById("dui").value;
    const nit = document.getElementById("nit").value;
    const fecha = document.getElementById("fecha").value;
    const correo = document.getElementById("correo").value;
    const edad = document.getElementById("edad").value;

    // Expresiones Regulares
    const carnetRegex = /^[A-Za-z]{2}[0-9]{3}$/;
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
    const duiRegex = /^[0-9]{8}-[0-9]$/;
    const nitRegex = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/;
    const fechaRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/[0-9]{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const edadRegex = /^[0-9]+$/;

    // Validaciones
    if(!carnetRegex.test(carnet)){
        alert("Carnet inválido. Formato correcto: AB001");
        return;
    }

    if(!nombreRegex.test(nombre)){
        alert("Nombre inválido. No debe contener números ni símbolos.");
        return;
    }

    if(!duiRegex.test(dui)){
        alert("DUI inválido. Formato correcto: ########-#");
        return;
    }

    if(!nitRegex.test(nit)){
        alert("NIT inválido. Formato correcto: ####-######-###-#");
        return;
    }

    if(!fechaRegex.test(fecha)){
        alert("Fecha inválida. Formato correcto: dd/mm/yyyy");
        return;
    }

    if(!emailRegex.test(correo)){
        alert("Correo electrónico inválido.");
        return;
    }

    if(!edadRegex.test(edad)){
        alert("Edad inválida. Solo debe contener números.");
        return;
    }

    alert("Formulario válido. Datos enviados correctamente.");
});
