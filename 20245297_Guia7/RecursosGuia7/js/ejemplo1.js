// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// FUNCION PARA MOSTRAR EL MODAL SI SE SELECCIONA UN TIPO DE ELEMENTO
const vericarTipoElemento = function () {
  let elemento = cmbElemento.value;
  if (elemento != "") {
    modal.show();
  } else {
    alert("Debe seleccionar el elemento que se creará");
  }
};

// FUNCION PARA VALIDAR QUE EL ID NO SE REPITA
const validarIdUnico = function (idNuevo) {
  return document.getElementById(`id${idNuevo}`) === null;
};

// FUNCION PARA CREAR ELEMENTO SELECT
const newSelect = function () {
  let addElemento = document.createElement("select");
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("class", "form-select");

  for (let i = 1; i <= 10; i++) {
    let addOption = document.createElement("option");
    addOption.value = i;
    addOption.innerHTML = `Opción ${i}`;
    addElemento.appendChild(addOption);
  }

  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  labelElemento.textContent = tituloElemento.value;

  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  let divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-floating");

  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

// FUNCION PARA CREAR RADIO O CHECKBOX
const newRadioCheckbox = function (newElemento) {
  let addElemento = document.createElement("input");
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento);
  addElemento.setAttribute("class", "form-check-input");

  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  labelElemento.textContent = tituloElemento.value;

  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  let divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-check");

  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

// FUNCION PARA CREAR INPUT O TEXTAREA
const newInput = function (newElemento) {
  let addElemento =
    newElemento == "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento.value);
  addElemento.setAttribute("class", "form-control");
  addElemento.setAttribute("placeholder", tituloElemento.value);

  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);

  let iconLabel = document.createElement("i");
  iconLabel.setAttribute("class", "bi bi-tag");

  labelElemento.textContent = tituloElemento.value;
  labelElemento.insertAdjacentElement("afterbegin", iconLabel);

  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  let divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-floating mb-3");

  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

// EVENTO PARA CREAR ELEMENTO DESDE MODAL
buttonAddElemento.onclick = () => {
  const idNuevo = nombreElemento.value;
  const tituloNuevo = tituloElemento.value;
  const tipo = cmbElemento.value;

  if (idNuevo === "" || tituloNuevo === "") {
    alert("Faltan campos por completar");
    return;
  }

  if (!validarIdUnico(idNuevo)) {
    alert(`Ya existe un control con el ID: id${idNuevo}. Por favor use otro nombre.`);
    return;
  }

  if (tipo === "select") {
    newSelect();
  } else if (tipo === "radio" || tipo === "checkbox") {
    newRadioCheckbox(tipo);
  } else {
    newInput(tipo);
  }
};

// EVENTO PARA MOSTRAR MODAL
buttonCrear.onclick = () => {
  vericarTipoElemento();
};

// EVENTO PARA LIMPIAR CAMPOS CUANDO SE MUESTRA EL MODAL
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
  tituloElemento.value = "";
  nombreElemento.value = "";
  tituloElemento.focus();
});

// FUNCION PARA VALIDAR LOS CONTROLES AGREGADOS
const validarControles = function () {
  const controles = newForm.querySelectorAll("input, select, textarea");
  let validos = true;

  controles.forEach(control => {
    const tipo = control.type;
    const tag = control.tagName;

    if (tipo === "radio" || tipo === "checkbox") {
      if (!control.checked) {
        validos = false;
      }
    } else if (tag === "SELECT") {
      if (control.selectedIndex === -1 || control.value === "") {
        validos = false;
      }
    } else {
      if (control.value.trim() === "") {
        validos = false;
      }
    }
  });

  if (validos) {
    alert("Todos los controles están correctamente llenos o seleccionados.");
  } else {
    alert("Hay controles vacíos o sin seleccionar.");
  }
};

// EVENTO PARA BOTÓN DE VALIDACIÓN
buttonValidar.addEventListener("click", validarControles);

