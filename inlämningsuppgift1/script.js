let usersListArray = [];
let alrRegEmails = [];

const outputDiv = document.querySelector('#listToAdd');
const regForm = document.querySelector('#regForm');
const email = document.querySelector('#email');
const errorMsg = document.querySelector('#errorMsg');
var accounter = 0;

const usersList = () => {                       // ------ intiate (add new <div>) to the doc ------
  outputDiv.innerHTML = '';
  usersListArray.forEach(user => {
    outputDiv.innerHTML += `
    <div id="${user.id}" class="d-flex justify-content-between align-items-center bg-white p-2 mb-2">
      <div>  
        <p class="m-0 h5">${user.firstName} ${user.lastName}</p>
        <p class="m-0">${user.email}</p>
      </div>
      <div>
        <button type="button" id="edit" class="btn btn-info btn-sm px-3">EDIT</button>
        <button type="button" id="delete" class="btn btn-danger btn-sm">DELETE</button>
    </div>
    `;
  })
}

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
  
  if (accounter !== 0) {
    return;
  }
  for (let i = 0; i < usersListArray.length; i++) {
    if (emailInput.value === alrRegEmails[i]) {
      emailInput.classList.add('is-invalid');
      emailInput.focus();
      errorMsg.innerHTML = `* "${emailInput.value}" is already Registered.`;
      fbMsg.innerHTML = '';
      // then it's already used
      boolean3 = false;
      return;
    }else
    {
      boolean3 = 'true';
    }
  }
  accounter = 0;
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
  
  
  if(
  boolean1 === 'true' &&
  boolean2 === 'true' &&
  boolean3 === 'true') {
    const user = {
      id: Date.now().toString(),
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    }
    usersListArray.push(user);                  // ------ Adding element to Array for each User ------
    console.log(usersListArray);
    
    usersList();
    document.getElementById("regForm").reset();
    boolean1 = 'false';
    boolean2 = 'false';
    boolean3 = 'false';
  }
  for (let i=0; i < usersListArray.length; i++) {
    alrRegEmails[i] = usersListArray[i].email;
    console.log(alrRegEmails);
  }
})

outputDiv.addEventListener('click', e => {
  console.log(e.target.parentNode.parentNode.id);
  console.log(e.target.id);
  if(e.target.id === 'delete') {
    //--- the (Array.filter) method.
    usersListArray = usersListArray.filter(user => user.id !== e.target.parentNode.parentNode.id); 
    usersList();
  }
  if(e.target.id === 'edit') {
    accounter += 1;
    console.log(accounter);
    const userId = e.target.parentNode.parentNode.id

    const userRef = usersListArray.find(user => user.id === userId)
    
    firstName.value = userRef.firstName
    lastName.value = userRef.lastName
    email.value = userRef.email

    // userRef.firstName = firstName.value;
    usersList();

  }

})