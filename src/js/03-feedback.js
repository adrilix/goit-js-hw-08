import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formInput = document.querySelector('input');
const formMessage = document.querySelector('textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);
const KEY_STORAGE = 'feedback-form-state';
let getMeaning = null;
findLogic();

const savedValue = {
  email: getMeaning?.email ? getMeaning.email : '',
  message: getMeaning?.message ? getMeaning.message : '',
};

function onFormInput(event) {
  savedValue[event.target.name] = event.target.value;
  localStorage.setItem(KEY_STORAGE, JSON.stringify(savedValue));
}

function findLogic() {
  getMeaning = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (getMeaning) {
    if (getMeaning.email) {
      formInput.value = getMeaning.email;
    }

    if (getMeaning.message) {
      formMessage.value = getMeaning.message;
    }
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!savedValue.email || !savedValue.message) {
    alert('Всі рядки повинні бути заповнені');
    return;
  }
  form.reset();
  localStorage.removeItem(KEY_STORAGE);
  console.log(savedValue);
}

// console.log(getMeaning)
