const RADIUS = 0.05;
const FPS = 1000;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";

// Initial points
const A = createDot(
  Math.random() * 400 + 400,
  Math.random() * 100 + 50,
  RADIUS + 3
);
const B = createDot(
  Math.random() * 400 + 50,
  Math.random() * 250 + 350,
  RADIUS + 3
);
const C = createDot(
  Math.random() * 400 + 800,
  Math.random() * 250 + 350,
  RADIUS + 3
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
  Math.random() * 1100 + 20,
  Math.random() * 500 + 20,
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
