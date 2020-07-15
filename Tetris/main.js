document.addEventListener('DOMContentLoaded', () => {
    const WIDTH = 10;
    const SCORE_DISPLAY = document.querySelector('#score');
    const START_BUTTON = document.querySelector('#start-button');
    const DISPLAY_SQUARES = document.querySelectorAll('.mini-grid div');
    const DISPLAY_WIDTH = 4;
    const TETR_SPEED = 1;
    //Tetrominoes
    const LRT = [
        [1      , WIDTH + 1, WIDTH * 2 + 1  , 2             ],
        [WIDTH  , WIDTH + 1, WIDTH + 2      , WIDTH * 2 + 2 ],
        [1      , WIDTH + 1, WIDTH * 2 + 1  , WIDTH * 2     ],
        [WIDTH  , WIDTH * 2, WIDTH * 2 + 1  , WIDTH * 2 + 2 ]
    ];
    const LLT = [
        [0         , 1              , WIDTH + 1      , WIDTH * 2 + 1 ],
        [WIDTH +2  , WIDTH * 2 + 2  , WIDTH * 2 + 1  , WIDTH * 2     ],
        [1         , WIDTH + 1      , WIDTH * 2 + 1  , WIDTH * 2 + 2 ],
        [WIDTH     , WIDTH * 2      , WIDTH  + 1     , WIDTH + 2     ]
    ];
    const ZLT = [
        [0        , WIDTH       , WIDTH + 1, WIDTH * 2 + 1],
        [WIDTH + 1, WIDTH + 2   , WIDTH * 2, WIDTH * 2 + 1],
        [0        , WIDTH       , WIDTH + 1, WIDTH * 2 + 1],
        [WIDTH + 1, WIDTH + 2   , WIDTH * 2, WIDTH * 2 + 1]
    ];
    const ZRT = [
        [2        , WIDTH + 2   , WIDTH + 1    , WIDTH * 2 + 1],
        [WIDTH    , WIDTH + 1   , WIDTH * 2 + 1, WIDTH * 2 + 2],
        [2        , WIDTH + 2   , WIDTH + 1    , WIDTH * 2 + 1],
        [WIDTH    , WIDTH + 1   , WIDTH * 2 + 1, WIDTH * 2 + 2]
    ];
    const TT = [
        [1      , WIDTH     , WIDTH + 1 , WIDTH + 2     ],
        [1      , WIDTH + 1 , WIDTH + 2 , WIDTH * 2 + 1 ],
        [WIDTH  , WIDTH + 1 , WIDTH + 2 , WIDTH * 2 + 1 ],
        [1      , WIDTH     , WIDTH + 1 , WIDTH * 2 + 1 ]
    ];
    const OT = [
        [0, 1, WIDTH, WIDTH + 1],
        [0, 1, WIDTH, WIDTH + 1],
        [0, 1, WIDTH, WIDTH + 1],
        [0, 1, WIDTH, WIDTH + 1]
    ];
    const IT = [
        [1    , WIDTH + 1, WIDTH * 2 + 1 , WIDTH * 3 + 1],
        [WIDTH, WIDTH + 1, WIDTH + 2     , WIDTH + 3],
        [1    , WIDTH + 1, WIDTH * 2 + 1 , WIDTH * 3 + 1],
        [WIDTH, WIDTH + 1, WIDTH + 2     , WIDTH + 3]
    ];
    const TETROMINOES = [LRT, LLT, ZLT, ZRT, TT, OT, IT];
    // next tetrs
    const NEXT = [
        [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1 , 2                    ],
        [0, 1                , DISPLAY_WIDTH + 1     , DISPLAY_WIDTH * 2 + 1],
        [0, DISPLAY_WIDTH    , DISPLAY_WIDTH + 1     , DISPLAY_WIDTH * 2 + 1],
        [2, DISPLAY_WIDTH + 2, DISPLAY_WIDTH + 1     , DISPLAY_WIDTH * 2 + 1],
        [1, DISPLAY_WIDTH    , DISPLAY_WIDTH + 1     , DISPLAY_WIDTH + 2    ],
        [0, 1                , DISPLAY_WIDTH         , DISPLAY_WIDTH + 1    ],
        [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1 , DISPLAY_WIDTH * 3 + 1]

    ];


    let grid = document.querySelector('.grid');
    for(let i = 0; i < 200; i++) {
        let div = document.createElement('div');
        grid.append(div);
    }
    for(let i = 0; i < 10; i++) {
        let div = document.createElement('div');
        grid.append(div);
        div.classList.add('taken');
    }
    let squares = Array.from(document.querySelectorAll('.grid div'));

    

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * TETROMINOES.length);
    let nextRandom = Math.floor(Math.random() * TETROMINOES.length);
    let timerId;
    let score = 0;

    // random select tetr and it's rotation
    let current = TETROMINOES[random][currentRotation];

    
    // document.addEventListener('keydown', control);


    function control(e) {
        if(e.keyCode == 37) {
            moveLeft();
        }
        if(e.keyCode == 39) {
            moveRight();
        }
        if(e.keyCode == 38) {
            rotate();
        }
        if(e.keyCode == 40) {
            freeze();
            moveDown();
        }
    }    

    // draw the first rotation in the random tetr
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    };

    // undraw the tetr
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }; 

    function moveDown() {
        undraw();
        currentPosition += WIDTH;
        draw();
        // setTimeout(freeze, 1000/TETR_SPEED - 200);
        freeze();
    };

    // freeze
    function freeze() {
        if (current.some( index => squares[currentPosition + index + WIDTH].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // start the new tetr falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * TETROMINOES.length);
            current = TETROMINOES[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    // move tetrs left, if it's possible
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % WIDTH === 0);

        if (!isAtLeftEdge) currentPosition -= 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }
    
     // move tetrs right, if it's possible
     function moveRight() {
         undraw();
         const isAtRightEdge = current.some(index => (currentPosition + index) % WIDTH === WIDTH - 1);

         if (!isAtRightEdge) currentPosition += 1;

         if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
             currentPosition -= 1;
         }

         draw();
     }

    //  rotate the tetrs
     function rotate() {
        undraw();
        currentRotation++;
        if(currentRotation == current.length) {
            currentRotation = 0;
        }
        current = TETROMINOES[random][currentRotation];
        draw();
     }

    //  show up next tetr
    let displayIndex = 0;
    

    // display the shape in the mini-grid
    function displayShape() {
        // clear grid
        DISPLAY_SQUARES.forEach(square => {
            square.classList.remove('tetromino');
        });

        NEXT[nextRandom].forEach(index => {
            DISPLAY_SQUARES[displayIndex + index].classList.add('tetromino');
        });
    };

    function addScore() {
        for (let i = 0; i < 199; i+=WIDTH) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
            
            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                SCORE_DISPLAY.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                });
                const SQUARES_REMOVED = squares.splice(i, WIDTH);
                squares = SQUARES_REMOVED.concat(squares);
                squares.forEach(cell => {
                    grid.appendChild(cell);
                });
            };
        }
    };

    // functionality to the button
    START_BUTTON.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            document.removeEventListener('keydown', control);
        } else {
            draw();
            document.addEventListener('keydown', control);
            timerId = setInterval(moveDown, 1000/TETR_SPEED);
            displayShape();
        }
    });

    // game over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            SCORE_DISPLAY.innerHTML = 'end';
            clearInterval(timerId);
        }
    }


















});