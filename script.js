let startTime;
let interval;
let elapsed = 0;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const now = Date.now();
  const time = elapsed + (now - startTime);
  display.textContent = formatTime(time);
}

startBtn.onclick = () => {
  if (!running) {
    running = true;
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
  }
};

pauseBtn.onclick = () => {
  if (running) {
    running = false;
    elapsed += Date.now() - startTime;
    clearInterval(interval);
  }
};

resetBtn.onclick = () => {
  running = false;
  clearInterval(interval);
  startTime = null;
  elapsed = 0;
  display.textContent = '00:00:00';
  laps.innerHTML = '';
};

lapBtn.onclick = () => {
  if (running) {
    const li = document.createElement('li');
    const now = Date.now();
    const time = elapsed + (now - startTime);
    li.textContent = formatTime(time);
    laps.appendChild(li);
  }
};
