const grid = document.querySelector("#grid");

let mode = "black"; // black | rainbow | eraser
let mouseDown = false;

document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false);

function createGrid(size){
grid.innerHTML = "";

for(let r = 0; r < size; r++){
    const row = document.createElement("div");
    row.className = "row";

    for(let c = 0; c < size; c++){
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.addEventListener("mousedown", () => paint(cell));
    cell.addEventListener("mouseover", () => {
        if (!mouseDown) return;
        paint(cell);
    });
    row.appendChild(cell);
    }

    grid.appendChild(row);
}
}

function paint(cell){
    if (mode === "eraser") cell.style.backgroundColor = "transparent";
    else if (mode === "rainbow") cell.style.backgroundColor = randomColor();
    else cell.style.backgroundColor = "black";
}

function randomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Buttons
document.querySelector("#clear").addEventListener("click", () => {
    document.querySelectorAll(".cell").forEach(cell => {
    cell.style.backgroundColor = "transparent";
});
});

document.querySelector("#resize").addEventListener("click", () => {
    let size = Number(prompt("Grid size? (1 - 64)", "16"));
    if (!Number.isFinite(size) || size < 1) return;
    if (size > 64) size = 64;
    createGrid(size);
});

document.querySelector("#black").addEventListener("click", () => mode = "black");
document.querySelector("#rainbow").addEventListener("click", () => mode = "rainbow");
document.querySelector("#eraser").addEventListener("click", () => mode = "eraser");

// Start default
createGrid(16);
