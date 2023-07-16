import "./style.css";
// @ts-ignore
import { memory } from "game-of-life/game_of_life_bg.wasm";
import { Universe, Cell } from "game-of-life";

const CELL_SIZE = 10; // px
const GRID_COLOR = "#393a3c";
const DEAD_COLOR = "#151618";
const ALIVE_COLOR = "#94a8ff";

const canvas = document.getElementById("game-of-life-canvas") as HTMLCanvasElement | null;
if (!canvas) throw new Error("Canvas not found");
const playToggleBtn = document.getElementById("play-toggle") as HTMLButtonElement | null;
if (!playToggleBtn) throw new Error("PlayToggle not found");
const randomizerBtn = document.getElementById("randomizer") as HTMLButtonElement | null;
if (!randomizerBtn) throw new Error("Randomizer not found");
const clearBtn = document.getElementById("clear") as HTMLButtonElement | null;
if (!clearBtn) throw new Error("Clear not found");

let animationId: number | null = null;
const isPaused = () => {
	return animationId === null;
};

const play = () => {
	playToggleBtn.textContent = "⏸";
	renderLoop();
};
const pause = () => {
	playToggleBtn.textContent = "▶";
	if (animationId) cancelAnimationFrame(animationId);
	animationId = null;
};
playToggleBtn.addEventListener("click", () => (isPaused() ? play() : pause()));
randomizerBtn.addEventListener("click", () => {
	universe.randomize();
	drawGrid();
	drawCells();
});
clearBtn.addEventListener("click", () => {
	universe.clear();
	drawGrid();
	drawCells();
});

const universe = Universe.new(window.innerWidth / CELL_SIZE, window.innerHeight / CELL_SIZE);
universe.randomize();
const width = universe.width();
const height = universe.height();

canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctxType = "2d";
const ctx = canvas.getContext(ctxType);
if (!ctx) throw new Error(`Context ${ctxType} not found`);

const renderLoop = () => {
	universe.tick();
	drawGrid();
	drawCells();
	animationId = requestAnimationFrame(renderLoop);
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

canvas.addEventListener("click", (event) => {
	const boundingRect = canvas.getBoundingClientRect();

	const scaleX = canvas.width / boundingRect.width;
	const scaleY = canvas.height / boundingRect.height;

	const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
	const canvasTop = (event.clientY - boundingRect.top) * scaleY;

	const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
	const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

	universe.toggle_cell(row, col);

	drawGrid();
	drawCells();
});
