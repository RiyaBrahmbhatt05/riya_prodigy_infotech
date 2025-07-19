const board = document.getElementById("board");
const statusText = document.querySelector(".status");
const resetBtn = document.getElementById("resetBtn");
const modeSelect = document.getElementById("mode");
const themeToggle = document.getElementById("themeToggle");
const emojiEffect = document.getElementById("emojiEffect");

const xScoreSpan = document.getElementById("xScore");
const oScoreSpan = document.getElementById("oScore");
const drawScoreSpan = document.getElementById("drawScore");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let vsAI = modeSelect.value === "ai";

let xWins = 0;
let oWins = 0;
let draws = 0;

const winEmojis = ["🚀", "🌟", "🛸", "🌌", "🛰️"];
const drawEmojis = ["🪐", "☄️", "🌠", "🪐"];

const symbols = {
  "X": "🌑",
  "O": "🌕"
};

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  cells = [];
  currentPlayer = "X";
  gameActive = true;
  emojiEffect.textContent = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }

  statusText.textContent = `Commander ${currentPlayer}'s Turn`;
}

function handleCellClick(index) {
  if (!gameActive || cells[index].textContent !== "") return;

  makeMove(index, currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer}`);
    return;
  }

  if (isDraw()) {
    endGame("draw");
    return;
  }

  if (vsAI && currentPlayer === "X") {
    currentPlayer = "O";
    statusText.textContent = `AI's Move...`;
    setTimeout(() => aiMove(), 500);
  } else if (!vsAI) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Commander ${currentPlayer}'s Turn`;
  }
}

function makeMove(index, player) {
  cells[index].textContent = symbols[player];
}

function aiMove() {
  if (!gameActive) return;

  const emptyIndices = cells
    .map((cell, i) => cell.textContent === "" ? i : null)
    .filter(i => i !== null);

  const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(move, "O");

  if (checkWin("O")) {
    endGame("O");
    return;
  }

  if (isDraw()) {
    endGame("draw");
    return;
  }

  currentPlayer = "X";
  statusText.textContent = `Commander ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    if (
      cells[a].textContent === symbols[player] &&
      cells[b].textContent === symbols[player] &&
      cells[c].textContent === symbols[player]
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
    return false;
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function endGame(result) {
  gameActive = false;
  if (result === "X") {
    statusText.textContent = `🌑 Commander X Wins!`;
    xWins++;
    emojiEffect.textContent = getRandomEmoji(winEmojis);
  } else if (result === "O") {
    statusText.textContent = vsAI ? `🌕 AI Triumphs!` : `🌕 Commander O Wins!`;
    oWins++;
    emojiEffect.textContent = getRandomEmoji(winEmojis);
  } else {
    statusText.textContent = "🌌 It's a Draw!";
    draws++;
    emojiEffect.textContent = getRandomEmoji(drawEmojis);
  }
  updateScoreboard();
}

function updateScoreboard() {
  xScoreSpan.textContent = xWins;
  oScoreSpan.textContent = oWins;
  drawScoreSpan.textContent = draws;
}

function getRandomEmoji(array) {
  return array[Math.floor(Math.random() * array.length)];
}

resetBtn.addEventListener("click", createBoard);

modeSelect.addEventListener("change", () => {
  vsAI = modeSelect.value === "ai";
  createBoard();
});

themeToggle.addEventListener("change", () => {
  document.body.className = themeToggle.value;
});

createBoard();
