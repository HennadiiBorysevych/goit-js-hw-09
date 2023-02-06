function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let invervalID = null;

btnStart.addEventListener('click', handleBodyChangeColor);
btnStop.addEventListener('click', handleBodyColorStop);

function handleBodyChangeColor() {
  btnStart.setAttribute('disabled', 'true');
  btnStop.removeAttribute('disabled');
  invervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleBodyColorStop() {
  btnStop.setAttribute('disabled', 'true');
  btnStart.removeAttribute('disabled');
  clearInterval(invervalID);
}
