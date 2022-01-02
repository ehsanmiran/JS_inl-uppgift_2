const regForm = document.querySelector('#regForm');
const email = document.querySelector('#email');


let boolean = 'false';

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
    boolean = 'true';
  }
}

const validateEmail = (emailInput) => {
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if(regEx.test(emailInput.value)) {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    boolean = 'true';
  }
  else {
    emailInput.classList.remove('is-valid');
    emailInput.classList.add('is-invalid');
    emailInput.focus();
    boolean = 'false';
  }
}

regForm.addEventListener('submit', e => {
  e.preventDefault();
  
  validateText('#firstName');
  validateText('#lastName');
  validateEmail(email);
  
  if(boolean === 'true') {
    let user = {
      id: (new Date()).getTime(),
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
      email: e.currentTarget.email.value,
    }
    console.log(user);
  }
})

email.addEventListener('keyup', () => {
    validateEmail(email)
  })
firstName.addEventListener('keyup', () => {
    validateText('#firstName')
  })
lastName.addEventListener('keyup', () => {
    validateText('#lastName')
  })



