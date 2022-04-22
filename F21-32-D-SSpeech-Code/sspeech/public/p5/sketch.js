let sketchRNN, currentStroke, x, y;
let nextPen = 'down';
let seedPath = [];
let seedPoints = [];
let obj = "";
let personDrawing = false;


function preload() {
  fetch('../result.txt')
  .then(response => response.text())
  .then(text => sketchRNN = ml5.sketchRNN(text));
}

function clearCanvas() {
  clear();
}

function startDrawing() {
  personDrawing = true;
  x = mouseX;
  y = mouseY;
}

function stopDrawing() {
  personDrawing = false;
  const rdpPoints = [];
  const total = seedPoints.length;
  const start = seedPoints[0];
  const end = seedPoints[total - 1];
  rdpPoints.push(start);
  rdp(0, total - 1, seedPoints, rdpPoints);
  rdpPoints.push(end);
  background(255);
  stroke(0);
  strokeWeight(4);
  beginShape();
  noFill();
  for (let vector of rdpPoints) {
    vertex(vector.x, vector.y);
  }
  endShape();
  x = rdpPoints[rdpPoints.length - 1].x;
  y = rdpPoints[rdpPoints.length - 1].y;
  seedPath = [];
  for (let i = 1; i < rdpPoints.length; i++) {
    let strokePath = {
      dx: rdpPoints[i].x - rdpPoints[i-1].x,
      dy: rdpPoints[i].y - rdpPoints[i-1].y,
      pen: 'down'
    }
    // line(x, y, x + strokePath.dx, y + strokePath.dy);
    // x += strokePath.dx;
    // y += strokePath.dy;
    seedPath.push(strokePath);
  }
  sketchRNN.generate(seedPath, gotStrokePath);
}

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(stopDrawing);
  // x = width / 2;
  // y = height / 2;
  background(255);
  console.log("Model Loaded!");
}

function gotStrokePath(error, strokePath) {
  currentStroke = strokePath;
}

function draw() {
  stroke(0);
  strokeWeight(4);
  if (personDrawing) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    seedPoints.push(createVector(mouseX, mouseY));
  }
  if (currentStroke) {
    if (nextPen == 'end') {
      sketchRNN.reset();
      // stopDrawing();
      return;
    }
    if (nextPen == 'down') {
      line(x, y, x + currentStroke.dx, y + currentStroke.dy);
    }
    x += currentStroke.dx;
    y += currentStroke.dy;

    console.log("Current Stroke X: ", currentStroke.dx);
    console.log("Current Stroke Y: ", currentStroke.dy);

    console.log("X: ", x);
    console.log("Y: ", y);
    
    nextPen = currentStroke.pen;
    currentStroke = null;
    sketchRNN.generate(gotStrokePath);
  }
}