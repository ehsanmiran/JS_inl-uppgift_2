let usersListArray = [];
const regForm = document.querySelector('#regForm');
const email = document.querySelector('#email');
const outputDiv = document.querySelector('#listToAdd');

var boolean1 = 'false';
var boolean2 = 'false';
var boolean3 = 'false';



const validateText = (id) => {                  // ------ Text Validations -------
  let input = document.querySelector(id);

  if(input.value === '' || input.value.length < 2) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.focus();
  }
  else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    // boolean1 = 'true';
    if(id === '#firstName') {
      boolean1 = 'true'
    }else{
      boolean2 = 'true'
    }
  }
}

const validateEmail = (emailInput) => {         // ------ Email Validations -------
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  if(regEx.test(emailInput.value)) {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    boolean3 = 'true';
    
  }
  else {
    emailInput.classList.remove('is-valid');
    emailInput.classList.add('is-invalid');
    emailInput.focus();
    boolean3 = 'false';
    
  }
}


email.addEventListener('keyup', () => {         // ------ Guide text lines under fields ------
    validateEmail(email)
  })
firstName.addEventListener('keyup', () => {
    validateText('#firstName')
  })
lastName.addEventListener('keyup', () => {
    validateText('#lastName')
  })



regForm.addEventListener('submit', e => {       // ------ SUBMISSION ------
  e.preventDefault();
  
  validateText('#firstName');
  validateText('#lastName');
  validateEmail(email);
  
  if(boolean1 === 'true' && boolean2 === 'true' && boolean3 === 'true') {
    let user = {
      id: (new Date()).getTime(),
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
      email: e.currentTarget.email.value,
    }
    console.log(user);
    usersListArray.push(user);                  // ------ Adding element to Array for each User ------
    console.log(usersListArray);
  

    const usersList = () => {
      let i = 0;
      outputDiv.innerHTML = '';
      usersListArray.forEach(user => {
        const userInUse = usersListArray[i];
        outputDiv.innerHTML += `
        <div id="${userInUse.id}" class="d-flex justify-content-between align-items-center bg-white p-2 mb-2">
        <div>  
        <p class="m-0 h5">${userInUse.firstName} ${userInUse.lastName}</p>
        <p class="m-0">${userInUse.email}</p>
        </div>
        <div>
        <button type="button" class="btn btn-info btn-sm px-3">EDIT</button>
        <button type="button" class="btn btn-danger btn-sm">DELETE</button>
        </div>
        `;
        i++;
      })
    }
    usersList();
    document.getElementById("regForm").reset();
    boolean1 = 'false';
    boolean2 = 'false';

    outputDiv.addEventListener('click', e => {
      if(e.target.type === 'button') {
        console.log('it is a button');
        //--- below is the - Array.filter - method.
        usersListArray = usersListArray.filter(user => userInUse.id !== e.target.parentNode.id);
        usersList();
      }
    })
  }
})

