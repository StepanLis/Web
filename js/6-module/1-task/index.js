/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  #elem = null;
  constructor(rows){
    this.#rows = rows;
    this.#render();
    this.#elem.addEventListener('click', this.#onTableClick);
  }

  #render(){
    this.#elem = document.createElement('table');
    this.#elem.innerHTML = `
    <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead> 
    <tbody>
    ${this.#rows.map(row => 
      `<tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button class="remove">X</button></td>
    </tr>`).join('')}
    </tbody>
    `;
  }

  get elem(){
    return this.#elem;
  }

  #onTableClick(event){
    if (event.target.classList.contains('remove')){
      event.target.closest('tr').remove();
    }
  }
}
