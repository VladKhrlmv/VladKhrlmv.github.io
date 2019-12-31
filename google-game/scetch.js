let sheep;
let shImg;
let fImg;
let bImg;
let fences = [];
let soundClassifier;

function preload() {
    const options = { probabilityThreshold: 0.95 };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
    shImg = loadImage('sheep3.png');
    fImg = loadImage('fence.png');
    bImg = loadImage('bg.jpg');
    
}

function setup() {
    createCanvas(700, 450);
    sheep = new Sheep();
    soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
    if (error) {
      console.error(error);
    }
  console.log(results[0].label, results[0].confidence);
    if (results[0].label == 'up') {
      sheep.jump();
    }
}

function keyPressed() {
    if (key == ' ') {
        sheep.jump();
    }
}
  
function draw() {
    if(random(1) < 0.005) {
      fences.push(new Fence());
    }
    
    
  
  
  
    background(bImg);
    for (let f of fences) {
      f.move();
      f.show();
      if (sheep.hits(f)) {
        console.log('game over');
        noLoop();
      }
      
    }
    
    sheep.show();
    sheep.move();
  
    
}