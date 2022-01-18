const form = document.querySelector('#theForm');
const input = document.querySelector('#input-field');
const output = document.querySelector('#output');

let todoList = [];

const fetchTodos = async () => {
  const resp = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await resp.json()
  todoList = data;

  showList();
}

fetchTodos ();


const showList = () => {
  todoList.forEach(listItem => {
    output.insertAdjacentHTML('beforeend', `

    <div class="list-item">
      <label class="che-container">
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
      <h4 class="list-item-txt">${listItem.title}</h4>
      <button class="btn btn-del">DEL</button>
    </div>

    `)
  })
}