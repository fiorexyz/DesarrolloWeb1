// Obteniendo la referencia de los elementos
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

// Creando modal con Bootstrap
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

// Función principal de validación
const validarFormulario = function () {
  const nombre = formulario.elements["txtNombre"];
  const apellido = formulario.elements["txtApellido"];
  const fechaNacimiento = formulario.elements["txtFecha"];
  const correo = formulario.elements["txtCorreo"];
  const pass = formulario.elements["txtPass"];
  const passRepeat = formulario.elements["txtPassRepeat"];
  const carrera = formulario.elements["cmbCarrera"];
  const pais = formulario.elements["cmbPais"];
  const intereses = formulario.querySelectorAll("input[name='interes']:checked");

  let errores = [];

  // a. Validar que los campos no estén vacíos
  if (nombre.value.trim() === "") errores.push("El nombre es obligatorio.");
  if (apellido.value.trim() === "") errores.push("El apellido es obligatorio.");
  if (fechaNacimiento.value === "") errores.push("La fecha de nacimiento es obligatoria.");
  if (correo.value.trim() === "") errores.push("El correo es obligatorio.");
  if (pass.value === "") errores.push("La contraseña es obligatoria.");
  if (passRepeat.value === "") errores.push("Debe repetir la contraseña.");

  // b. Validar que la fecha de nacimiento no supere la fecha actual
  const hoy = new Date();
  const fechaIngresada = new Date(fechaNacimiento.value);
  if (fechaIngresada > hoy) errores.push("La fecha de nacimiento no puede ser mayor a la actual.");

  // c. Validar correo electrónico con expresión regular
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo.value)) errores.push("Correo electrónico no válido.");

  // d. Validar que las contraseñas sean iguales
  if (pass.value !== passRepeat.value) errores.push("Las contraseñas no coinciden.");

  // e. Validar que al menos un interés esté seleccionado
  if (intereses.length === 0) errores.push("Debe seleccionar al menos un interés.");

  // f. Validar que se seleccione una carrera
  if (carrera.value === "") errores.push("Debe seleccionar una carrera.");

  // g. Validar que se seleccione un país
  if (pais.value === "") errores.push("Debe seleccionar un país de origen.");

  // Mostrar errores o datos
  if (errores.length > 0) {
    mostrarErrores(errores);
  } else {
    mostrarDatosEnModal({
      nombre: nombre.value,
      apellido: apellido.value,
      fecha: fechaNacimiento.value,
      correo: correo.value,
      carrera: carrera.value,
      pais: pais.value,
      intereses: Array.from(intereses).map(i => i.value)
    });
  }
};

// Función para mostrar errores en el modal
const mostrarErrores = function (errores) {
  while (bodyModal.firstChild) {
    bodyModal.removeChild(bodyModal.firstChild);
  }

  const listaErrores = document.createElement("ul");
  listaErrores.setAttribute("class", "list-group");

  errores.forEach(err => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item list-group-item-danger");
    li.textContent = err;
    listaErrores.appendChild(li);
  });

  bodyModal.appendChild(listaErrores);
  modal.show();
};

// Función para mostrar datos en el modal con tabla DOM
const mostrarDatosEnModal = function (datos) {
  while (bodyModal.firstChild) {
    bodyModal.removeChild(bodyModal.firstChild);
  }

  const tabla = document.createElement("table");
  tabla.setAttribute("class", "table table-bordered");
  const tbody = document.createElement("tbody");

  const agregarFila = (label, valor) => {
    const fila = document.createElement("tr");

    const celdaLabel = document.createElement("th");
    celdaLabel.textContent = label;

    const celdaValor = document.createElement("td");
    if (Array.isArray(valor)) {
      valor.forEach(v => {
        const span = document.createElement("span");
        span.textContent = v;
        span.setAttribute("class", "badge bg-primary me-1");
        celdaValor.appendChild(span);
      });
    } else {
      celdaValor.textContent = valor;
    }

    fila.appendChild(celdaLabel);
    fila.appendChild(celdaValor);
    tbody.appendChild(fila);
  };

  agregarFila("Nombre", datos.nombre);
  agregarFila("Apellido", datos.apellido);
  agregarFila("Fecha de nacimiento", datos.fecha);
  agregarFila("Correo electrónico", datos.correo);
  agregarFila("Carrera", datos.carrera);
  agregarFila("País de origen", datos.pais);
  agregarFila("Intereses", datos.intereses);

  tabla.appendChild(tbody);
  bodyModal.appendChild(tabla);
  modal.show();
};

// Evento del botón
button.onclick = () => {
  validarFormulario();
};


