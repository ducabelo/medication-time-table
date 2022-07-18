# Tabela de horários para medicação.
### (Em desenvolvimento).

## Cálculo de horas e dias para sua medicação.



Estes dias levei minha mãe no médico, e depois de vê-la sofrendo para calcular os horários dos remédios e a quantidade de dias, tive a ideia de fazer uma tabela que calculasse isso.


Fiz algumas pesquisas e me deparei com um problema: Como fazer uma tabela que fosse completa e funcional. Ainda não cheguei a uma conclusão sólida, então esta primeira tabela é experimental. Depois vou pensar como será o layout responsivo.

A parte do Javascript foi feita com o uso de classes e métodos.

Ainda faltam algumas funcionalidades:

- 1 - Impressão da tabela.
- 2 - Apagar selecionados/editar.
- 3 - Existem casos de medicamentos que precisam ser tomados intercalados. Então eu colocarei uma funcionalidade onde a pessoa pode inserir o medicamento e a hora inicial, que atualmente é o momento da inserção, poderá ser atrasado de acordo com a necessidade. Isto é muito comum em remédios de uso contínuo.

Quando você insere o remédio, a primeira dose é a calculada a partir do momento da inserção. Para evitar valores quebrados, coloquei arredondamentos para que sempre fique de 15 em 15 minutos. Se vc inserir às 13:11, ele arredondará para 13:00, se inserir 13:18, ele arredondará para 13:15. Os arredondamentos são 0, 15, 30 e 45.

Você pode conferir pelo link: https://ducabelo.github.io/medication-schedule/

----

# Medication Schedule
### (Under construction).

## Daily medicine, time between medication and days left.

These days I took my mother to the doctor, and after seeing her struggle to calculate medication schedules and the number of days, I had the idea of making a table to calculate this.

I did some research and came across a problem: How to make a table that was complete and functional. I haven't come to a solid conclusion yet, so this first table is experimental. Then I'll think about how the responsive layout will be.

For Javascript part was made within classes and methods.

There are still some features missing:

- 1 - Printing the table.
- 2 - Delete or edit selected.
- 3 - There are cases of medicines that need to be taken interspersed. Then I will put a functionality where the person can insert the medication and the initial time, which is currently the insertion time, can be delayed according to the need. This is very common in continuous use remedies.

 When you enter the medicine name, the first dose is the one calculated from the moment of entry. To avoid broken values, I put rounding so that it is always every 15 minutes. If you enter at 13:11 it will round to 13:00, if you enter 13:18 it will round to 13:15. Rounding is 0, 15, 30 and 45.

See more details: https://ducabelo.github.io/medication-schedule/
