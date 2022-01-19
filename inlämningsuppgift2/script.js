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
    crateListItem(listItem)
  })
}

const crateListItem = item => {

  let card = document.createElement('div');
  card.classList.add('list-item');

  let chGroup = document.createElement('label');

  let chBox = document.createElement('input');
  chBox.type = 'checkbox';
  
  let chMark = document.createElement('span');
  
  let titleText = document.createElement('h4');
  titleText.classList.add('list-item-txt');
  titleText.innerText = item.title;
  
  let bttn = document.createElement('button');
  bttn.classList.add('btn', 'btn-del');
  bttn.innerText = 'DEL';


  bttn.addEventListener('click', () => removeItem(bttn))


  chBox.append(chMark);
  chGroup.appendChild(chBox);
  card.append(chGroup, titleText, bttn);


  output.appendChild(card);
}

function removeItem(bttn) {
  bttn.remove()
}