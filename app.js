const board = document.getElementById("gameboard");
const size = 15;
const rows = board.clientHeight / size;
const columns = board.clientWidth / size;

let cells = [];
let play = false;

document.getElementById("togglePlayState").onclick = function () {
  play = !play;
  this.innerHTML = play ? "Pause" : "Play";
};

function buildCells() {
  for (let i = 0; i < rows; i++) {
    let rowCells = [];
    for (let j = 0; j < columns; j++) {
      rowCells.push(false);
      //   rowCells.push(Math.random() > 0.5);
    }
    cells.push(rowCells);
  }
}

function drawBoard() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const state = cells[i][j];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.height = size + "px";
      cell.style.width = size + "px";
      cell.style.top = i * size + "px";
      cell.style.left = j * size + "px";
      cell.dataset.x = i;
      cell.dataset.y = j;
      if (state) {
        cell.classList.add("alive");
      }
      cell.onclick = function () {
        cell.classList.toggle("alive");
        cells[this.dataset.x][this.dataset.y] =
          !cells[this.dataset.x][this.dataset.y];
      };
      board.appendChild(cell);
    }
  }
}

function applyRules() {
  if (!play) {
    return;
  }
  // any live cell with two or three live neighbours survives
  // any dead cell with three live neighbours becomes a live cell
  // all other live cells die in the next generation

  // create a new array of cells
  let newCells = [];

  // iterate through the old array
  for (let i = 0; i < cells.length; i++) {
    let rowCells = [];
    for (let j = 0; j < cells[i].length; j++) {
      let state = cells[i][j];
      let neighbours = 0;
      // check the neighbours
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) {
            continue;
          }
          if (cells[i + x] && cells[i + x][j + y]) {
            neighbours++;
          }
        }
      }
      // apply the rules
      if (state) {
        if (neighbours === 2 || neighbours === 3) {
          rowCells.push(true);
        } else {
          rowCells.push(false);
        }
      } else {
        if (neighbours === 3) {
          rowCells.push(true);
        } else {
          rowCells.push(false);
        }
      }
    }
    newCells.push(rowCells);
  }
  // apply the new array to the old array
  cells = newCells;
  drawBoard();
}

window.onload = function () {
  buildCells();
  drawBoard();
  setInterval(applyRules, 20);
};
