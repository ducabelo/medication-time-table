const API_URL = 'https://630cd38f53a833c53436277c.mockapi.io/api/v1';

// Consts
const medicationForm = document.getElementById('formulario-medicamentos');
const inputs = document.querySelectorAll('.modal-input');
const medicationName = document.getElementById('medicamento');
const dosage = document.getElementById('dosagem');
const dosageOptions = document.getElementById('opcoes-medidas');
const therapeuticIndication = document.getElementById('indicacao');
const timeLapse = document.getElementById('opcoes-horas');
const timesFromForm = document.getElementById('horas');
const minutesFromForm = document.getElementById('minutos');
const amountOfDays = document.getElementById('dias-medicamento');
const saveBtn = document.querySelector('.btn-modal-registrar-medicamento');
const divTable = document.querySelector('.div-table');
const formId = document.querySelector('.input-id');

let output = '';

// CRUD

const renderTable = (medication) => {
  medication.forEach(function (medication) {
    output += `
    <tr class="medication-card" data-id="${medication.id}">
    <td data-title="medicamento">${medication.medicationName}</td>
        <td data-title="dosagem">${medication.dosage}</td>
        <td data-title="indicacao">${medication.indication}</td>
        <td data-title="espaco">${medication.timeGap}h/${medication.timeGap}h</td>
        <td data-title="inicio">${medication.startingDay}</td>
        <td data-title="fim">${medication.finalDay}</td>
        <td class="checkhour" data-title="hora-1">${medication.timeTable[0]}</td>
        <td class="checkhour" data-title="hora-2">${medication.timeTable[1]}</td>
        <td class="checkhour" data-title="hora-3">${medication.timeTable[2]}</td>
        <td class="checkhour" data-title="hora-4">${medication.timeTable[3]}</td>
        <td><button class="edit-button" id="edit-medication">Editar</button>
          <button class="delete-button" id="delete-medication">Excluir</button>
        </td>
      </tr> `;
  });
  tbody.innerHTML = output;
};

// GET
const url = `${API_URL}/medicines`;
const tbody = document.querySelector('.tbody');

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    renderTable(data);
    checkHourFields();
  });

divTable.addEventListener('click', (e) => {
  e.preventDefault();
  let editBtnIsPressed = e.target.id == 'edit-medication';
  let deleteBtnIsPressed = e.target.id == 'delete-medication';
  let id = e.target.parentElement.parentElement.dataset.id;
  // delete medication
  // method: delete
  if (deleteBtnIsPressed) {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }

  if (editBtnIsPressed) {
    saveBtn.classList.toggle('updateBtn');
    fetch(`${url}/${id}`)
      .then((res) => res.json())
      .then((medication) => {
        toggleModal();
        fillFormFields(medication);
      });
  }
});

function updateMedication(medication) {
  const id = medication.id;
  console.log(id, 'from update');
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medication),
  })
    .then((res) => res.json())
    .then(() => {
      checkHourFields();
      location.reload();
    });
}

function createMedication(medication) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medication),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderTable(dataArr);
      checkHourFields();
    });
}

//  fill form by fetch data
function fillFormFields(medication) {
  minutesFromForm.disabled = false;
  const [amount, type] = medication.dosage.split(' ');
  const [hours, minutes] = medication.timeTable[0].split(':');
  formId.value = medication.id;
  medicationName.value = medication.medicationName;
  dosage.value = amount;
  dosageOptions.value = type;
  therapeuticIndication.value = medication.indication;
  timeLapse.value = medication.timeGap;
  timesFromForm.value = hours;
  minutesFromForm.value = minutes;
  amountOfDays.value = medication.amountOfDays;
}

function eventInputCheck(event) {
  const { target } = event;
  event.preventDefault();
  if (!target.checkValidity()) {
    target.classList.add('vazio');
    target.nextElementSibling.innerText = target.validationMessage;
  } else {
    target.classList.remove('vazio');
    // target.nextElementSibling.innerText = '';
  }
}

medicationForm.addEventListener('change', eventInputCheck);

// Set initial and final dates
function setInitialDay() {
  const initialDay = new Date();
  const formatedInitialDay = new Intl.DateTimeFormat('pt-BR').format(
    initialDay,
  );
  return formatedInitialDay;
}

function setLastDay() {
  const lastDay = new Date();
  lastDay.setDate(lastDay.getDate() + Number(amountOfDays.value));
  const formatedLastDay = new Intl.DateTimeFormat('pt-BR').format(lastDay);
  return formatedLastDay;
}

// Set time calculations.
function schedules() {
  let times = [
    setHourSchedule()[0],
    setHourSchedule()[1],
    setHourSchedule()[2],
    setHourSchedule()[3],
  ];
  return times;
}

function setHourSchedule() {
  const iterator = Number(timeLapse.value);
  const times = new Date();
  let startingTime = `${times.getHours()}:${setMinutes()}`;
  let schedule = [startingTime];
  if (timesFromForm.value == -1) {
    for (i = iterator; i < 24; i += iterator) {
      times.setHours(times.getHours() + iterator);
      schedule.push(`${times.getHours()}:${setMinutes()}`);
    }
  } else {
    times.setHours(timesFromForm.value, minutesFromForm.value);
    startingTime = `${times.getHours()}:${minutesFromForm.value}`;
    schedule[0] = startingTime;
    for (i = iterator; i < 24; i += iterator) {
      times.setHours(times.getHours() + iterator);
      schedule.push(`${times.getHours()}:${minutesFromForm.value}`);
    }
  }
  return schedule;
}

function setMinutes() {
  const todayTime = new Date();
  let minutes = todayTime.getMinutes();

  if (minutes >= 0 && minutes < 15) {
    minutes = '00';
  } else if (minutes >= 15 && minutes < 30) {
    minutes = '15';
  } else if (minutes >= 30 && minutes < 45) {
    minutes = '30';
  } else if (minutes >= 45 && minutes <= 59) {
    minutes = '45';
  }
  return minutes;
}

function disableMinutesFromFormIfUserPicksTimeFromSystem() {
  if (timesFromForm.value == -1 || timesFromForm.value == '') {
    minutesFromForm.disabled = true;
    minutesFromForm.value = '';
  } else {
    minutesFromForm.disabled = false;
    minutesFromForm.value = '00';
  }
}

function isFieldsValid() {
  return medicationForm.reportValidity();
}

function clearForm() {
  inputs.forEach((input) => (input.value = ''));
}

// Form interactions.
function saveMedication(event) {
  event.preventDefault();

  if (isFieldsValid()) {
    const checkBtnUpdate = document.querySelector('.updateBtn');
    if (!checkBtnUpdate) {
      const medication = {
        medicationName: medicationName.value,
        dosage: `${dosage.value} ${dosageOptions.value}`,
        indication: therapeuticIndication.value,
        timeGap: `${timeLapse.value}`,
        amountOfDays: amountOfDays.value,
        startingDay: setInitialDay(),
        finalDay: setLastDay(),
        timeTable: [
          schedules()[0],
          schedules()[1],
          schedules()[2],
          schedules()[3],
        ],
      };

      createMedication(medication);
      toggleModal();
    } else {
      const medication = {
        id: formId.value,
        medicationName: medicationName.value,
        dosage: `${dosage.value} ${dosageOptions.value}`,
        indication: therapeuticIndication.value,
        timeGap: `${timeLapse.value}`,
        amountOfDays: amountOfDays.value,
        startingDay: setInitialDay(),
        finalDay: setLastDay(),
        timeTable: [
          schedules()[0],
          schedules()[1],
          schedules()[2],
          schedules()[3],
        ],
      };
      updateMedication(medication);
      toggleModal();
      saveBtn.classList.toggle('updateBtn');
    }
  }
}

function checkHourFields() {
  const checkHourValidity = document.querySelectorAll('.checkhour');
  checkHourValidity.forEach((td) => {
    if (td.innerText == 'null') {
      td.innerText = '---';
    }
  });
}

function clearMedicationList() {
  const rows = document.querySelectorAll('#tabela tbody tr');
  rows.forEach((row) => row.parentNode.removeChild(row));
}

// open and close modal
const containerModal = document.querySelector('.modal-container');

function toggleModal() {
  if (containerModal.classList.value == 'modal-container') {
    clearForm();
  }
  containerModal.classList.toggle('active');
}

function clickOutsideModal(event) {
  if (event.target === containerModal) toggleModal(event);
}

// Events
document
  .querySelector('.cadastrar-medicamento')
  .addEventListener('click', toggleModal);

function closeModalByCloser() {
  if (
    saveBtn.classList.value == 'btn btn-modal-registrar-medicamento updateBtn'
  ) {
    saveBtn.classList.remove('updateBtn');
  }
  containerModal.classList.toggle('active');
}

function removeBtnClass(event) {
  if (event.target === containerModal) {
    if (
      saveBtn.classList.value == 'btn btn-modal-registrar-medicamento updateBtn'
    ) {
      saveBtn.classList.remove('updateBtn');
    }
  }
}

document.addEventListener('click', removeBtnClass);

// saveBtn.classList.remove('updateBtn');

document.querySelector('.closer').addEventListener('click', closeModalByCloser);

containerModal.addEventListener('click', clickOutsideModal);

// button create medication register.
saveBtn.addEventListener('click', saveMedication);

// Disable form´s minute's options if the user picks time from the system
timesFromForm.addEventListener(
  'change',
  disableMinutesFromFormIfUserPicksTimeFromSystem,
);

// document.querySelector('#tabela>tbody').addEventListener('click', editDelete);

(function addOptionEls() {
  let index = ''; // Inicia como vazio para que required do formulario acione
  do {
    const optionEl = document.createElement('option'); // Cria o elemento html option
    optionEl.setAttribute('value', index); // Set o valor do index na propriedade value
    optionEl.innerHTML = index < 0 ? 'Hora Atual' : index; // Condicao para colocar o titulo no dropdown caso o valor for -1
    timesFromForm.appendChild(optionEl); // Adiciona o elemento option dentro do dropdown
    index === '' ? (index = -1) : index++; // Inicia a declaracao dos valores dos options com -1
  } while (index < 24);
})();
