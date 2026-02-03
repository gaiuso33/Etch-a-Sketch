const grid = document.querySelector("#grid");

let mode = "black";      // "black" | "rainbow" | "eraser"
let mouseDown = false;

document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

    function createGrid(size) {
    grid.innerHTML = ""; // clear old grid
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const total = size * size;
    for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // draw on hover OR click-drag
    cell.addEventListener("mouseover", () => {
        if (!mouseDown) return;
        paint(cell);
    });
    cell.addEventListener("mousedown", () => paint(cell));

    grid.appendChild(cell);
    }
    }

function paint(cell) {
    if (mode === "eraser") cell.style.backgroundColor = "transparent";
    else if (mode === "rainbow") cell.style.backgroundColor = randomColor();
    else cell.style.backgroundColor = "black";
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

createGrid(16);

document.querySelector("#clear").addEventListener("click", () => {
    document.querySelectorAll(".cell").forEach(c => (c.style.backgroundColor = "transparent"));
});

document.querySelector("#resize").addEventListener("click", () => {
    let size = Number(prompt("Grid size? (max 64)", "16"));
    if (!Number.isFinite(size) || size < 1) return;
    if (size > 64) size = 64;
    createGrid(size);
});

document.querySelector("#rainbow").addEventListener("click", () => (mode = "rainbow"));
document.querySelector("#eraser").addEventListener("click", () => (mode = "eraser"));
