updateMedicationList();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('db_medication_list')) ?? [];
}

function setLocalStorage(dbMedicationList) {
  return localStorage.setItem(
    'db_medication_list',
    JSON.stringify(dbMedicationList),
  );
}

// CRUD
// Read is equal getLocalStorage.

function deleteMedication(index) {
  const medication = getLocalStorage();
  medication.splice(index, 1);
  setLocalStorage(medication);
}

function updateMedication(index, medication) {
  const dbMedicationList = getLocalStorage();
  dbMedicationList[index] = medication;
  setLocalStorage(dbMedicationList);
}

function createMedication(medication) {
  const dbMedicationList = getLocalStorage();
  dbMedicationList.push(medication);
  setLocalStorage(dbMedicationList);
}

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

// Validação do formulário.

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
    setHourSchedule()[4],
    setHourSchedule()[5],
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
    const medication = {
      medicamento: medicationName.value,
      dosagem: `${dosage.value} ${dosageOptions.value}`,
      indicacao: therapeuticIndication.value,
      espaco: `${timeLapse.value}`,
      qtdeDias: amountOfDays.value,
      inicio: setInitialDay(),
      fim: setLastDay(),
      horarios: [
        schedules()[0],
        schedules()[1],
        schedules()[2],
        schedules()[3],
        schedules()[4],
        schedules()[5],
      ],
    };
    const index = medicationName.dataset.index;
    if (index == 'new') {
      createMedication(medication);
      updateMedicationList();
      toggleModal();
    } else {
      updateMedication(index, medication);
      updateMedicationList();
      toggleModal();
    }
  }
}

function createRow(medication, index) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <td data-title="Medicamento">${medication.medicamento}</td>
          <td data-title="dosagem">${medication.dosagem}</td>
          <td data-title="indicação">${medication.indicacao}</td>
          <td data-title="espaço">${medication.espaco}h/${medication.espaco}h</td>
          <td data-title="inicio">${medication.inicio}</td>
          <td data-title="fim">${medication.fim}</td>
          <td data-title="hora">${medication.horarios[0]}</td>
          <td data-title="hora">${medication.horarios[1]}</td>
          <td data-title="hora">${medication.horarios[2]}</td>
          <td data-title="hora">${medication.horarios[3]}</td>
          <td data-title="hora">${medication.horarios[4]}</td>
          <td data-title="hora">${medication.horarios[5]}</td>
          <td><button class="edit-button" id="edit-${index}">Editar</button>
            <button class="delete-button" id="delete-${index}">Excluir</button>
          </td> 
  `;
  document.querySelector('#tabela>tbody').appendChild(newRow);
  checkHourFields();
}

function checkHourFields() {
  const checkHourValidity = document.querySelectorAll('[data-title="hora"]');
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

function updateMedicationList() {
  const dbMedicationList = getLocalStorage();
  clearMedicationList();
  dbMedicationList.forEach(createRow);
}

function fillFormFields(medication) {
  minutesFromForm.disabled = false;
  const [amount, type] = medication.dosagem.split(' ');
  const [hours, minutes] = medication.horarios[0].split(':');
  medicationName.dataset.index = medication.index;
  medicationName.value = medication.medicamento;
  dosage.value = amount;
  dosageOptions.value = type;
  therapeuticIndication.value = medication.indicacao;
  timeLapse.value = medication.espaco;
  timesFromForm.value = hours;
  minutesFromForm.value = minutes;
  amountOfDays.value = medication.qtdeDias;
}

function editMedication(index) {
  const medication = getLocalStorage()[index];
  medication.index = index;
  toggleModal();
  fillFormFields(medication);
}

function editDelete(event) {
  if (event.target.type == 'submit') {
    const [action, index] = event.target.id.split('-');

    if (action == 'edit') {
      editMedication(index);
    } else {
      const medicamento = getLocalStorage()[index];
      const response = confirm(
        `Tem certeza que deseja excluir o medicamento ${medicamento.medicamento}?`,
      );
      if (response) {
        deleteMedication(index);
        updateMedicationList();
      }
    }
  }
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

document.querySelector('.closer').addEventListener('click', toggleModal);

containerModal.addEventListener('click', clickOutsideModal);

// button create medication register.
saveBtn.addEventListener('click', saveMedication);

// Disable form´s minute's options if the user picks time from the system
timesFromForm.addEventListener(
  'change',
  disableMinutesFromFormIfUserPicksTimeFromSystem,
);

document.querySelector('#tabela>tbody').addEventListener('click', editDelete);

(function addOptionEls() {
  let index = ""; // Inicia como vazio para que required do formulario acione
  do {
    const optionEl = document.createElement("option"); // Cria o elemento html option
    optionEl.setAttribute("value", index); // Set o valor do index na propriedade value
    optionEl.innerHTML = index < 0 ? "Hora Atual" : index; // Condicao para colocar o titulo no dropdown caso o valor for -1 
    timesFromForm.appendChild(optionEl); // Adiciona o elemento option dentro do dropdown
    index === "" ? (index = -1) : index++; // Inicia a declaracao dos valores dos options com -1
  } while (index < 24);
})();