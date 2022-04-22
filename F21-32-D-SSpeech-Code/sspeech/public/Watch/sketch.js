let input;
let img;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  
  input = createFileInput(handleFile);
  input.position(40, 460);
}

function draw() {
  background(255);
  
  if (img) {
    image(img, 0, 0, width, height);
  }
}

function handleFile(file) {
  if (file.type === 'video') {
    img = createVideo(file.data, '');
    img.loop();
    img.hide();
  } else {
    img = null;
  }
}