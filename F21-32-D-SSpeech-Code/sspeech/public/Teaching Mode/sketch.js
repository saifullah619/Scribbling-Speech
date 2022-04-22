var drawing = [];
var currentPath = [];
var logged = false;
let canvas;
let input;
let img;
let bool = true;

const changeValue = () => {
  bool = !bool;
  
  var btn = document.getElementById('ps'); 
  if (btn.textContent.toLowerCase() === 'play') {
    btn.textContent = 'Stop';
    btn.style.backgroundColor = '#FF0000';
  } else {
    btn.textContent = 'Play';
    btn.style.backgroundColor = '#4CAF50';
  }
}

const clearTheCanvas = () => {
  clear();
  drawing = [];
  currentPath = [];
}

function setup() {
  canvas = createCanvas(1200, 600);
  canvas.mousePressed(startPath);
  frameRate(30);
  
  input = createFileInput(handleFile);
  input.position(20, 550);
}

function startPath() {
  currentPath = [];
  drawing.push(currentPath);
}

function draw() {
  background(255);
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      if (mouseX <= 300 && mouseY <= 600) {
        stop();
      }
      else {
        var point = {
          x: mouseX,
          y: mouseY
        }
        currentPath.push(point);
      }
    }
  }
  
  stroke(0);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
  
  if (img && bool) {
    image(img, 0, 100, 300, 400);
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'video') {
    img = createVideo(file.data, '');
    img.loop();
    img.hide();
  } else {
    img = null;
  }
}
