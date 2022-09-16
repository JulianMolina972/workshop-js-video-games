const $ = (selector) => document.querySelector(selector);
const canvas = $("#game");
const game = canvas.getContext("2d");

window.addEventListener('load', startGame);

function startGame() {
  // game.fillRect(50, 50, 100, 100);
  game.font = '30px Arial';
  game.fillStyle = 'red';
  game.textAlign = 'right';
  game.fillText('Hello World', 100, 100);
  // game.clearRect(50, 50, 100, 100);
  // game.clearRect(0, 0, 50, 50);
}