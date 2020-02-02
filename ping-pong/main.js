const FPS = 60;
const THRUST = 10;

//select the canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

let computerLevel = 0.03;
// create the user paddle
const user = {
    x: 0,
    y: cvs.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    score: 0

};

// create the com paddle
const com = {
    x: cvs.width - 10,
    y: cvs.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    score: 0

};

// create the net
const net = {
    x: cvs.width - 1,
    y: 0,
    width: 2,
    height: 10,
    color: 'white'
};

// create the ball
const ball = {
    x: cvs.width / 2,
    y: cvs.height / 2,
    radius: 10,
    speed: 5,
    vx: 5,
    vy: 5,
    color: 'white'
};

// draw rect function
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw a circle
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

// draw text 
function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = '45px "Times New Roman"';
    ctx.fillText(text, x, y)
}

// draw the net
function drawNet() {
    for(let i = 0; i <= cvs.height; i+=15) {
        drawRect(net.x / 2, net.y + i, net.width, net.height, net.color);
    }
}

function render() {
    // clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");

    // draw the net
    drawNet();

    // draw score
    drawText(user.score, cvs.width / 4, cvs.height / 7, 'white');
    drawText(com.score, 3 * cvs.width / 4, cvs.height / 7, 'white');

    // draw the user and com paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// control the user paddle
cvs.addEventListener('mousemove', movePaddle);
window.addEventListener('devicemotion', movePaddleTel);

function movePaddle(evt) {
    let rect = cvs.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height / 2;
}

function movePaddleTel(e) {
    let ag = e.accelerationIncludingGravity;
    if((user.y + user.height / 2 < cvs.height) && (user.y - user.height / 2 > 0))
    user.y = cvs.height / 2 - 50 + ag.y * THRUST;
}

// collision detection
function collision(b , p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// reset ball
function resetBall() {
    ball.x = cvs.width / 2;
    ball.y = cvs.height / 2;

    ball.speed = 5;
    ball.vx = -ball.vx;
}



// update : pos, mov, score...
function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // simple AI to control the com paddle
    com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
        ball.vy = -ball.vy;
    }

    let player = (ball.x < cvs.width / 2) ? user : com;

    if (collision(ball, player)) {
        // where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height / 2);
        // normalization
        collidePoint = collidePoint / (player.height / 2);

        // calculate angle in Radian
        let angle = collidePoint * Math.PI / 4;

        // X direction of the ball
        let direction = (ball.x < cvs.width / 2) ? 1 : -1; 

        // change val X and Y
        ball.vx = direction * ball.speed * Math.cos(angle);
        ball.vy =             ball.speed * Math.sin(angle);

        // every time the ball hit a paddle, we encrese its speed
        ball.speed += 0.1;
    }

    // update the score
    if (ball.x - ball.radius < 0) {
        // the com win
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > cvs.width) {
        // the user win
        user.score++;
        computerLevel += 0.005;
        resetBall();
    }
}

// game init
function game() {
    update(); 
    render();
}

// loop
setInterval(game, 1000 / FPS);