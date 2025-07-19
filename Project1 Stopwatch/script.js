console.log("✅ script.js is connected!");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const timeDisplay = document.getElementById('countdown');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0')
  );
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000); 
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  lapsContainer.innerHTML = "";
}

function recordLap() {
  if (!timerInterval) return;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap: ${lapTime}`;
  lapsContainer.appendChild(lapItem);
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
