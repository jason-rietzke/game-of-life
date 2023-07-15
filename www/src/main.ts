import "./style.css";
import { greet } from "game-of-life";

const button = document.getElementById("greet");
if (!button) throw new Error("Could not find button");
button.addEventListener("click", () => greet("World"));
