function make2DArray (cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 10; 
let w = Math.floor(document.documentElement.clientWidth / 100) * 100;
let h = Math.floor(document.documentElement.clientHeight / 100) * 100;


function setup() {
    createCanvas(w, h);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
}


function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution, resolution);
            }
        }
    }

    let next = make2DArray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // count live neighbours
            let sum = 0;
            let neighbours = count(grid, i, j);


            if (state == 0 && neighbours == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
               
        }
    }
    grid = next;
}


function count(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for (let j = -1; j < 2 ;j++) {

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum += grid[col][row];
        }
    }

    sum -= grid[x][y];

    return sum;
}
