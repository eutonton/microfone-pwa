let mediaRecorder;
let audioChunks = [];
const startButton = document.getElementById('start-record');
const stopButton = document.getElementById('stop-record');
const audioPlayback = document.getElementById('audio-playback');

startButton.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  startButton.disabled = true;
  stopButton.disabled = false;

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl;
    audioPlayback.play();

    audioChunks = [];
  };
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso.'))
      .catch(error => console.log('Erro ao registrar o Service Worker:', error));
  }
  
