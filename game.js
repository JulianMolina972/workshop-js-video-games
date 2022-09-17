const $ = (selector) => document.querySelector(selector);
const canvas = $("#game");
const game = canvas.getContext("2d");


let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);



function setCanvasSize() {

  if(window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }


  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / 10) + 1 ;

  startGame();
}


function startGame() {

  
  console.log({
    canvasSize,
    elementSize
  })
  game.font = elementSize + 'px Verdana';
  game.textAlign = 'end';
  // game.textAlign = 'start';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  


  for (let x = 1; x <= 10; x++) {
    for(let y = 1; y <= 10; y++) {
      game.fillText(emojis[mapRowCols[x - 1][y - 1]], y * elementSize , x * elementSize);
    }
    
    
  }

  // game.fillRect(50, 50, 100, 100);
  // game.font = '30px Arial';
  // game.fillStyle = 'red';
  // game.textAlign = 'right';
  // game.fillText('Hello World', 100, 100);
  // game.clearRect(50, 50, 100, 100);
  // game.clearRect(0, 0, 50, 50);
}