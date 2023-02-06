import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('input[name=delay]');
const stepDelay = document.querySelector('input[name=step]');
const creationAmount = document.querySelector('input[name=amount]');
const btnSubmit = document.querySelector('button');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  for (let i = 0; i < creationAmount.value; i += 1) {
    let delaingTime = Number(delay.value) + Number(stepDelay.value) * i;
    createPromise(i + 1, delaingTime)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  e.currentTarget.reset();
});
