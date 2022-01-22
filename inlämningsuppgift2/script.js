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
  output.innerHTML = ''
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
  chBox.name = 'chBox';
  chBox.id = item.id ;
  chBox.checked = item.completed;
  
  let titleText = document.createElement('h4');
  titleText.classList.add('list-item-txt');
  titleText.innerText = item.title;
  
  let bttn = document.createElement('button');
  bttn.classList.add('btn', 'btn-del');
  if (chBox.checked !== true) {
    bttn.classList.add('visi-btn');
  }
  bttn.innerText = 'DEL';


  bttn.addEventListener('click', () => {
    if (chBox.checked === true) {
      removeItem(item.id)
    }
  })

  chGroup.appendChild(chBox);
  card.append(chGroup, titleText, bttn);
  output.appendChild(card);
}

function removeItem(id) {
  todoList = todoList.filter(item => item.id !== id)
  showList()
  console.log(todoList);
  
}


form.addEventListener('submit', e => {
  e.preventDefault();
  if(input.value !== '') {
    createNewItem(input.value);
    input.value = '';
    input.focus()
  }
})

const createNewItem = title => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    data.id = Date.now().toString();
    data.userId = 1;
    todoList.unshift(data);
    showList()
    console.log(data);
  })
}


// ---- changing the "complete" value depening on the checkbox mark
output.addEventListener('change', e => {
  if (e.target.checked) {
    console.log(`checkbox #id ${e.target.id} is checked`);
    todoList.find(item => item.id == e.target.id).completed = true;
    console.log(todoList.find(item => item.id == e.target.id))
  }
  else {
    console.log(`checkbox #id ${e.target.id} is unchecked`);
    todoList.find(item => item.id == e.target.id).completed = false;
    console.log(todoList.find(item => item.id == e.target.id))
  }
  showList()
});

