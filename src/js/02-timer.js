import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = selectedDates[0].getTime();

    if (startTime - Date.now() < 0) {
      Notify.info('Please choose a date in the future');
      btnStart.setAttribute('disabled', 'true');
      clearInterval(timerId);
    } else {
      btnStart.removeAttribute('disabled');
      handleTimerStart(startTime);
    }
  },
};

function handleTimerStart(time) {
  btnStart.addEventListener('click', () => {
    clearInterval(timerId);

    timerId = setInterval(() => {
      const currentTime = Date.now();

      const timeDifference = currentTime - time;
      const timeConverted = convertMs(timeDifference);
      console.log(timeConverted);

      days.textContent = Math.abs(timeConverted.days);
      hours.textContent = Math.abs(timeConverted.hours);
      minutes.textContent = Math.abs(timeConverted.minutes);
      seconds.textContent = Math.abs(timeConverted.seconds);
    }, 1000);
  });
}

const picker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
