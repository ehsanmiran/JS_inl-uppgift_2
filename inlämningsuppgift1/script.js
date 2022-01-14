let usersListArray = [];
let alrRegEmails = [];

const outputDiv = document.querySelector('#listToAdd');
const regForm = document.querySelector('#regForm');
const email = document.querySelector('#email');
const errorMsg = document.querySelector('#errorMsg');
const actButton =document.querySelector('#actButton');

// ------ intiate (add new <div>) to the doc ------
const usersList = () => {
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


// ------ Text Validations -------
const validateText = (id) => {
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

// ------ Email Validations -------
const validateEmail = (emailInput) => {
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
  
  for (let i = 0; i < usersListArray.length; i++) {
    if (emailInput.value === alrRegEmails[i]) {
      emailInput.classList.add('is-invalid');
      emailInput.focus();
      errorMsg.innerHTML = `* "${emailInput.value}" is already Registered.`;
      fbMsg.innerHTML = '';
      // then it's already used
      boolean3 = false;
      return;
    }
    else {
      boolean3 = 'true';
    }
  }

}

// ------ Guide text lines under fields ------
email.addEventListener('keyup', () => {
  validateEmail(email)
})

firstName.addEventListener('keyup', () => {
  validateText('#firstName')
})
lastName.addEventListener('keyup', () => {
  validateText('#lastName')
})

// ------ S U B M I S S I O N ------
// #################################
regForm.addEventListener('submit', e => {
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
    // ------ Adding element to Array for each User ------
    if(addAction === 'ture') {
      usersListArray.push(user);
      console.log('pushed');
      addAction = 'false';
    }
    else {
      usersListArray.splice(objInd, 1, user)
      console.log('spliced');
    }

    console.log(usersListArray);
    
    usersList();
    document.getElementById("regForm").reset();
    boolean1 = 'false';
    boolean2 = 'false';
    boolean3 = 'false';
  }
  for (let i=0; i < usersListArray.length; i++) {
    alrRegEmails[i] = usersListArray[i].email;
  }
  actButton.innerHTML = `<button id="add" class="btn btn-st add-btn"  onclick="return adding();">ADD</button>`;
})

outputDiv.addEventListener('click', e => {
  /* console.log(e.target.parentNode.parentNode.id);
  console.log(e.target.id); */
  if(e.target.id === 'delete') {
    //--- the (Array.filter) method.
    usersListArray = usersListArray.filter(user => user.id !== e.target.parentNode.parentNode.id); 
    usersList();
  }
  if(e.target.id === 'edit') {
    actButton.innerHTML = `<button id="save" class="btn btn-st save-btn" onclick="return editing();">SAVE</button>`;
    const userId = e.target.parentNode.parentNode.id
    const userRef = usersListArray.find(user => user.id === userId)
    const index = usersListArray.findIndex(user => user.id === userId);

    console.log(index);
    console.log(userRef);
    firstName.value = userRef.firstName;
    lastName.value = userRef.lastName;
    email.value = userRef.email;
    
    /* userRef.firstName = 'to be edited';*/
    alrRegEmails[index] = '';
    
    // usersList();
    editing = () => {return objInd = index;}
  }
})

adding = () => {return addAction = 'ture';}


/* document.addEventListener("click", function (e) {
  if (e.target) {
    console.log (e.target.id);
  }
}) */
