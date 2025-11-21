// Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");

// CORRECCIÓN: nombre correcto del input del modal
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// Modal
const idModal = document.getElementById("idModal");
const modal = new bootstrap.Modal(idModal);

// Arreglo global de pacientes
let arrayPaciente = [];

/*
Función para limpiar formulario
*/
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

/*
Función para agregar o actualizar paciente
*/
let indexEditando = -1;

buttonAgregarPaciente.onclick = () => {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked ? "Hombre" :
        inputRdFemenino.checked ? "Mujer" : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre !== "" &&
        apellido !== "" &&
        fechaNacimiento !== "" &&
        sexo !== "" &&
        pais != 0 &&
        direccion !== ""
    ) {
        // Si estamos editando
        if (indexEditando !== -1) {
            arrayPaciente[indexEditando] = [
                nombre,
                apellido,
                fechaNacimiento,
                sexo,
                labelPais,
                direccion
            ];
            indexEditando = -1;

            mensaje.innerHTML = "Paciente actualizado correctamente";
            toast.show();
            imprimirPacientes();
            limpiarForm();
            return;
        }

        // Agregar paciente nuevo
        arrayPaciente.push([
            nombre,
            apellido,
            fechaNacimiento,
            sexo,
            labelPais,
            direccion
        ]);

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        toast.show();

        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

/*
Función para imprimir filas
*/
function imprimirFilas() {
    let fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        fila += `
        <tr>
            <td class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td class="text-center">
                <button id="btnEditar${contador}" class="btn btn-primary">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="btnEliminar${contador}" class="btn btn-danger">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });

    return fila;
}

/*
Función para mostrar tabla de pacientes
*/
const imprimirPacientes = () => {
    let table = `
    <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Nombre</th>
                <th class="text-center">Apellido</th>
                <th class="text-center">Fecha nacimiento</th>
                <th class="text-center">Sexo</th>
                <th class="text-center">País</th>
                <th class="text-center">Dirección</th>
                <th class="text-center">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = table;
};

/*
Delegación de eventos para Editar y Eliminar
*/
document.addEventListener("click", function (e) {
    if (!e.target.closest("button")) return;

    const btn = e.target.closest("button");
    const id = btn.id;

    // ELIMINAR
    if (id.startsWith("btnEliminar")) {
        let index = parseInt(id.replace("btnEliminar", "")) - 1;
        arrayPaciente.splice(index, 1);

        mensaje.innerHTML = "Paciente eliminado";
        toast.show();

        imprimirPacientes();
    }

    // EDITAR
    if (id.startsWith("btnEditar")) {
        let index = parseInt(id.replace("btnEditar", "")) - 1;
        let paciente = arrayPaciente[index];

        indexEditando = index;

        inputNombre.value = paciente[0];
        inputApellido.value = paciente[1];
        inputFechaNacimiento.value = paciente[2];

        if (paciente[3] === "Hombre") inputRdMasculino.checked = true;
        else inputRdFemenino.checked = true;

        // Seleccionar país
        [...cmbPais.options].forEach(op => {
            if (op.text === paciente[4]) cmbPais.value = op.value;
        });

        inputDireccion.value = paciente[5];

        mensaje.innerHTML = "Editando paciente. Modifica y guarda.";
        toast.show();
    }
});

/*
Agregar nuevo país
*/
let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value.trim();

    if (paisNew !== "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = ++contadorGlobalOption;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Modal focus
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Botón limpiar
buttonLimpiarPaciente.onclick = () => limpiarForm();

// Botón mostrar pacientes
buttonMostrarPaciente.onclick = () => imprimirPacientes();

// Limpiar al inicio
limpiarForm();
