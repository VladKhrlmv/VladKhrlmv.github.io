const RADIUS = 0.1;
const FPS = 1000;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, canvas.width, canvas.height);
const width = canvas.width;
const height = canvas.height;
ctx.fillStyle = "white";

// Initial points
const A = createDot(
  Math.random() * (width - 100) / 3 + (width - 100) / 3,
  Math.random() * (height - 100) / 3 + 100,
  RADIUS + 7
);
const B = createDot(
  Math.random() * (width - 100) / 3 + 100,
  Math.random() * (height - 100) / 3 + (height - 100) * 2 / 3,
  RADIUS + 7
);
const C = createDot(
  Math.random() * (width - 100) / 3 + (width - 100) * 2 / 3,
  Math.random() * (height - 100) / 3 + (height - 100) * 2 / 3,
  RADIUS + 7
);

function createDot(x, y, r) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fill();
  return {
    x: x,
    y: y,
    r: RADIUS,
  };
}

let currentDot = createDot(
  Math.random() * width + 20,
  Math.random() * height + 20,
  RADIUS
);

function newDot() {
  let dice = Math.floor(Math.random() * 6 + 1);
  switch (dice) {
    case 1:
    case 2:
      currentDot = createDot(
        currentDot.x + (A.x - currentDot.x) / 2,
        currentDot.y + (A.y - currentDot.y) / 2,
        RADIUS
      );
      break;
    case 3:
    case 4:
      currentDot = createDot(
        currentDot.x + (B.x - currentDot.x) / 2,
        currentDot.y + (B.y - currentDot.y) / 2,
        RADIUS
      );
      break;
    case 5:
    case 6:
      currentDot = createDot(
        currentDot.x + (C.x - currentDot.x) / 2,
        currentDot.y + (C.y - currentDot.y) / 2,
        RADIUS
      );
      break;
  }
}

setInterval(newDot, 1000 / FPS);
