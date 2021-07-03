const buttonRecord = document.querySelector('.button-record')
const buttonCopy = document.querySelector('.button-copy')
const buttonClear = document.querySelector('.button-clear')
const text = document.querySelector('.text')

const recognition = createRecognition();
let listening = false;

buttonRecord.addEventListener('click', e => {
  if (!recognition) return;

  listening ? recognition.stop() : recognition.start();

  buttonRecord.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar';

  buttonRecord.classList.toggle('text-black');
  buttonRecord.classList.toggle('text-red');
});

buttonCopy.addEventListener('click', e => {
  if (listening) return;

  navigator.clipboard.writeText(text.innerHTML);

  buttonCopy.innerHTML = 'Texto copiado';

  setTimeout(() => {
    buttonCopy.innerHTML = 'Copiar texto';
  }, 3000);
});

buttonClear.addEventListener('click', e => {
  if (listening) return;

  text.innerHTML = '...';
});

function createRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    text.innerHTML = "Speech Recognition is not found";
    return null;
  }

  recognition.lang = "pt_BR";
  recognition.interimResults = true;

  recognition.onstart = () => listening = true;
  recognition.onend = () => listening = false;
  recognition.onerror = e => console.log('error', e);
  recognition.onresult = e => text.innerHTML = e.results[0][0].transcript;

  return recognition;
}