const $ = (selector) => document.querySelector(selector);
const canvas = $("#game");
const game = canvas.getContext("2d");
const btnUp = $("#up");
const btnDown = $("#down");
const btnRight = $("#right");
const btnLeft = $("#left");


let canvasSize;
let elementSize;
let level = 0;
let lives = 3;


const playerPosition = {
  x: undefined,
  y: undefined
}

const giftPosition = {
  x: undefined,
  y: undefined
}

const enemiesPositions = [];

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

  elementSize = (canvasSize / 10)  ;

  startGame();
}


function startGame() {

  game.font = elementSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];


  if(!map){
    gameWin();
    return;
  }
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  enemiesPositions.length = 0;
  game.clearRect(0,0, canvasSize, canvasSize);


  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col]
      const posX = (colI + 1) * elementSize;
      const posY = (rowI + 1) * elementSize;

      if(col == 'O') {
        if(!playerPosition.x && !playerPosition.y ) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition})
        }
      } else if (col == 'I') {
          giftPosition.x = posX;
          giftPosition.y = posY; 
      } else if (col == 'X') {
        enemiesPositions.push({x: posX, y: posY})
      }

      game.fillText(emoji, posX, posY);


    })
  });

  movePlayer();


}

function levelWin() {
  console.log('subiste de nivel')
  level++;
  startGame();
}

function levelFail() {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log('terminaste el juego ')
}

function movePlayer () {
  const gitfCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const gitfCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3); 
  const gitfCollision = gitfCollisionX && gitfCollisionY;
  if (gitfCollision) {
    levelWin();
  }

  const enemyCollision = enemiesPositions.some(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  })

  if (enemyCollision) {
    levelFail();

  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

function moveByKeys(e) {
  switch(e.keyCode) {
    case 38:
      moveUp();
      break;
    case 40:
      moveDown();
      break;
    case 39:
      moveRight();
      break;
    case 37:
      moveLeft();
      break;
  }

}

function moveUp() {
  if ((playerPosition.y - elementSize) < elementSize ){
    // return;
  } else{
    playerPosition.y -= elementSize;
    startGame();
  }
}

function moveDown() {
  
  if ((playerPosition.y + elementSize) > canvasSize ){
    // return;
  } else{
    playerPosition.y += elementSize;
    startGame();
  }
}

function moveRight() {
  
  if ((playerPosition.x + elementSize) > canvasSize ){
    // return;
  } else{
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveLeft() {
  
  if ((playerPosition.x - elementSize) < elementSize ){
    // return;
  } else{
    playerPosition.x -= elementSize;
    startGame();
  }
}

// function clearPlayer() {
//   game.clearRect(playerPosition.x, playerPosition.y, elementSize, elementSize);
// }