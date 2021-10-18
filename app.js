const board = document.getElementById("gameboard");
const size = 15;
let rows = board.clientHeight / size;
let columns = board.clientWidth / size;

let cells = [];
let aliveCells = [];
let play = false;

document.getElementById("togglePlayState").onclick = function () {
	play = !play;
	this.innerHTML = play ? "Pause" : "Play";
};

function buildCells() {
	cellProtos = [];
	for (let i = 0; i < rows; i++) {
		let rowCells = [];
		for (let j = 0; j < columns; j++) {
			if (cells[i] && cells[i][j]) {
				rowCells.push(cells[i][j]);
			} else {
				rowCells.push(false);
			}
		}
		cellProtos.push(rowCells);
	}
	cells = cellProtos;
}

function buildBoard() {
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
			cell.id = i + "-" + j;
			if (state) {
				cell.classList.add("alive");
			}
			cell.onclick = function () {
				cell.classList.toggle("alive");
				const state = cells[this.dataset.x][this.dataset.y];
				cells[this.dataset.x][this.dataset.y] = !state;
				if (!state) {
					aliveCells.push({
						x: parseInt(this.dataset.x),
						y: parseInt(this.dataset.y),
					});
				} else {
					aliveCells = aliveCells.filter((cell) => cell.x !== this.dataset.x || cell.y !== this.dataset.y);
				}
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

	const checkCells = [...aliveCells];
	for (let i = 0; i < aliveCells.length; i++) {
		// get all neighbours of alive cell
		const x = aliveCells[i].x;
		const y = aliveCells[i].y;
		for (let j = -1; j <= 1; j++) {
			for (let k = -1; k <= 1; k++) {
				const tempCell = { x: x + j, y: y + k };
				if (!checkCells.find((c) => c.x === tempCell.x && c.y === tempCell.y)) {
					checkCells.push(tempCell);
				}
			}
		}
	}

	const newCells = [...cells];
	const newAliveCells = [];
	let calcCount = 0;

	for (let i = 0; i < checkCells.length; i++) {
		let x = checkCells[i].x;
		let y = checkCells[i].y;
		let neighbors = 0;
		for (let j = -1; j <= 1; j++) {
			for (let k = -1; k <= 1; k++) {
				if (j === 0 && k === 0) {
					continue;
				}
				if (aliveCells.find((c) => c.x === x + j && c.y === y + k)) {
					neighbors++;
				}
				calcCount++;
			}
		}
		if (aliveCells.find((c) => c.x === x && c.y === y)) {
			if (neighbors === 2 || neighbors === 3) {
				newAliveCells.push({ x: x, y: y });
				if (x >= 0 && y >= 0 && x < cells.length && y < cells[x].length) {
					newCells[x][y] = true;
					document.getElementById(x + "-" + y).classList.add("alive");
				}
			} else {
				if (x >= 0 && y >= 0 && x < cells.length && y < cells[x].length) {
					newCells[x][y] = false;
					document.getElementById(x + "-" + y).classList.remove("alive");
				}
			}
		} else {
			if (neighbors === 3) {
				newAliveCells.push({ x: x, y: y });
				if (x >= 0 && y >= 0 && x < cells.length && y < cells[x].length) {
					newCells[x][y] = true;
					document.getElementById(x + "-" + y).classList.add("alive");
				}
			} else {
				if (x >= 0 && y >= 0 && x < cells.length && y < cells[x].length) {
					newCells[x][y] = false;
					document.getElementById(x + "-" + y).classList.remove("alive");
				}
			}
		}
	}

	aliveCells = newAliveCells;
	// cells = newCells;
	document.getElementById("togglePlayState").innerHTML = `Pause – ${calcCount}`;
}

function step(timestamp) {
	if (play) {
		setTimeout(() => {
			applyRules();
		}, 50);
	}
	window.requestAnimationFrame(step);
}

window.onload = function () {
	buildCells();
	buildBoard();
	window.requestAnimationFrame(step);
};

window.onresize = function () {
	rows = board.clientHeight / size;
	columns = board.clientWidth / size;
	buildCells();
	buildBoard();
};
