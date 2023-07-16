import "./style.css";
import { Universe } from "game-of-life";

const canvas = document.getElementById("game-of-life-canvas");
if (!canvas) throw new Error("Canvas not found");

const universe = Universe.new();

const renderLoop = () => {
	canvas.textContent = universe.render();
	universe.tick();

	requestAnimationFrame(renderLoop);
};
requestAnimationFrame(renderLoop);
