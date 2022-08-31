# Tabela de horários para medicação.

## Cálculo de horas e dias para sua medicação.

Estes dias levei minha mãe no médico, e depois de vê-la sofrendo para calcular os horários dos remédios e a quantidade de dias, tive a ideia de fazer uma tabela que calculasse isso.

Para usar o LocalStorage linke o arquivo scritpA.js.
Para usar o Fetch no mockapi use o arquivo script.js

Usando o CRUD podemos ler os dados e visualizá-los na tela, cadastrar novo medicamento, editar e apagar.

## Algumas funções:

### Gravar dados no db.

- setLocalStorage() - grava os dados no db_medication_list

### CRUD

- createMedication() - Cria o medicamento.

- getLocalStorage() - Lê o arquivo db_medication_list

- updateMedication() - Atualiza o db.

- deleteMedication() - Apaga o remédio.

## Cálculo da quantidade de dias.

- setInitialDay()

- setFinalDay()

### Cálculo das horas e minutos.

Quando você insere o remédio, a primeira dose é a calculada a partir do momento da inserção. Para evitar valores quebrados, foram colocados arredondamentos para que sempre fique de 15 em 15 minutos. Se você inserir às 13:11, ele arredondará para 13:00, se inserir 13:18, ele arredondará para 13:15. Os arredondamentos são 0, 15, 30 e 45.

- schedules() - pega a array gerada com o cálculo dos horários que os remédios devem ser tomados e os separa por index.

- setHourSchedule() - calcula as horas e adiciona os minutos arredondados que vêm da função setMinutes.

- setMinutes() - arredonda os minutos

## Interação com o formulário:

- saveMedication() - Chama os métodos que salvam o medicamento ou editam um medicamento no db.

- createRow() - insere as linhas na tabela que será exibida na tela.

## Outras funções:

Há também as funções de limpar formulário, abrir e fechar modal, checar inputs, dentre outras.

Você pode conferir pelo link: https://ducabelo.github.io/medication-time-table/

---

# Medication Time Table

### (Under construction).

## Daily medicine, time between medication and days left.

These days I took my mother to the doctor, and after seeing her struggle to calculate medication schedules and the number of days, I had the idea of making a table to calculate this.

CRUD actions.

If you want to use your Localstorage, grab the scriptA.js archive.
For Mockapi use script.js.

## Some functions:

### Record data into db.

- setLocalStorage() - record data into db_medication_list

### CRUD

- createMedication() - Creates the medications.

- getLocalStorage() - Read db_medication_list file.

- updateMedication() - Updates the db.

- deleteMedication() - Delete medication.

## Amount of days.

- setInitialDay()

- setFinalDay()

### Calculate time and minutes.

When you enter the medicine name, the first dose is the one calculated from the moment of entry. To avoid broken values, I put rounding so that it is always every 15 minutes. If you enter at 13:11 it will round to 13:00, if you enter 13:18 it will round to 13:15. Rounding is 0, 15, 30 and 45.

- schedules() - Takes the medication´s timeLapse from the array.

- setHourSchedule() - Calculates time lapse and add a rounded minutes to generate an array with all medication times.

- setMinutes() - roud the minutes

## Form interactions:

- saveMedication()

- createRow() - creates the row for the table.

## Another functions:

Clear form, open and close modal, check inputs, etc.

See more details: https://ducabelo.github.io/medication-time-table/
