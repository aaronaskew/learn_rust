import { Universe } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg.wasm";

const CELL_SIZE = 5; //px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";
let speed = 1;

// Construct the universe and get its width and height.
/** @type {Universe} */
let universe = Universe.new();
/** @type {Number} */
const width = universe.width();
/** @type {Number} */
const height = universe.height();

// Give the canvas room for all of our cells and a 1px border around each of 
// them.
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("game-of-life-canvas");

canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

let animationId = null;

/*eslint no-debugger: "off"*/
const renderLoop = () => {
    for (let i = 0; i < speed; i++) {
        universe.tick();
    }
    drawGrid();
    drawCells();

    animationId = requestAnimationFrame(renderLoop);
}

const isPaused = () => {
    return animationId === null;
}

const playPauseButton = document.getElementById("play-pause");

const play = () => {
    playPauseButton.textContent = "⏸️";
    renderLoop();
}

const pause = () => {
    playPauseButton.textContent = "▶️";
    cancelAnimationFrame(animationId);
    animationId = null;
}

playPauseButton.addEventListener("click", () => {
    if (isPaused()) {
        play();
    } else {
        pause();
    }
});

canvas.addEventListener("click", event => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    if (event.ctrlKey) {
        universe.insert_glider(row, col);
    } else if (event.shiftKey) {
        universe.insert_pulsar(row, col);
    } else {
        universe.toggle_cell(row, col);
    }

    drawGrid();
    drawCells();
});



const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines
    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines
    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1,);
    }

    ctx.stroke();
}

const getIndex = (row, col) => row * width + col;

const bitIsSet = (n, arr) => {
    const byte = Math.floor(n / 8);
    const mask = 1 << (n % 8);
    return (arr[byte] & mask) === mask;
};

const drawCells = () => {

    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height / 8);

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            ctx.fillStyle = bitIsSet(idx, cells)
                ? ALIVE_COLOR
                : DEAD_COLOR;

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
};

const speedRange = document.getElementById("speed");
const speedLabel = document.getElementById("speed-label");
const speedSpan = document.getElementById("speed-span");

speedRange.addEventListener("input", event => {
    speedLabel.value = event.target.value;
});
speedSpan.addEventListener("change", event => {
    let newSpeed = event.target.value;
    if (newSpeed > 100) {
        newSpeed = 100;
        speedRange.value = speedLabel.value = newSpeed;
    }

    speed = newSpeed;
    console.log(speed);
});

const randomizeButton = document.getElementById("randomize");
randomizeButton.addEventListener("click", () => {
    universe = Universe.new();
    drawCells();
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    universe.set_width(universe.width());
    drawCells();
});

drawGrid();
drawCells();
play();