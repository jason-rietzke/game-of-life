import "./style.css";
// @ts-ignore
import { memory } from "game-of-life/game_of_life_bg.wasm";
import { Universe, Cell } from "game-of-life";

const CELL_SIZE = 3; // px
const GRID_COLOR = "#393a3c";
const DEAD_COLOR = "#151618";
const ALIVE_COLOR = "#94a8ff";

const universe = Universe.new(window.innerWidth / CELL_SIZE, window.innerHeight / CELL_SIZE);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("game-of-life-canvas") as HTMLCanvasElement | null;
if (!canvas) throw new Error("Canvas not found");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctxType = "2d";
const ctx = canvas.getContext(ctxType);
if (!ctx) throw new Error(`Context ${ctxType} not found`);

const renderLoop = () => {
	universe.tick();

	drawGrid();
	drawCells();

	requestAnimationFrame(renderLoop);
};

const drawGrid = () => {
	ctx.beginPath();
	ctx.strokeStyle = GRID_COLOR;

	// Vertical lines.
	for (let i = 0; i <= width; i++) {
		ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
		ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
	}

	// Horizontal lines.
	for (let j = 0; j <= height; j++) {
		ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
		ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
	}

	ctx.stroke();
};

const drawCells = () => {
	const cellsPtr = universe.cells();
	const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

	ctx.beginPath();

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			const idx = getIndex(row, col);

			ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

			ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
		}
	}

	ctx.stroke();
};

const getIndex = (row: number, column: number) => {
	return row * width + column;
};

drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
