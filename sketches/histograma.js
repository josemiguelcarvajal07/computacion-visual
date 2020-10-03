let img;
let BhistR = true;
let BhistG = false;
let BhistB = false;
let histR = [0];
let histG = [0];
let histB = [0];
var histGMax = 0;
var histRMax = 0;
var histBMax = 0;

function preload() {
  img = loadImage("../images/sekiro.jpg");
}

function setup() {
  width = 580;
  height = 600;

  createCanvas(width, height);
}

function draw() {
  img.loadPixels();

  background(255);
  for (i = 0; i < 255; i++) {
    histR[i] = 0;
    histB[i] = 0;
    histG[i] = 0;
  }
  
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      pixel = img.get(i, j);
      histR[int(red(pixel))]++;
      histB[int(blue(pixel))]++;
      histG[int(green(pixel))]++;
    }
  }
  
  for (i = 0; i < 255; i++) {
    if (histR[i] > histRMax) {
      histRMax = histR[i];
    }
    if (histB[i] > histBMax) {
      histBMax = histB[i];
    }
    if (histG[i] > histGMax) {
      histGMax = histG[i];
    }
  }
  if(BhistG){
    for (i = 0; i < 255; i++) {
      h = map(histG[i], 0, histGMax, 0, height - img.height-10)
      fill(0, 255, 0);
      rect(0 + (i * (width / 255)), height, width / 255, -h);
    }
  }
  if(BhistR){
    for (i = 0; i < 255; i++) {
      h = map(histR[i], 0, histRMax, 0, height - img.height-10)
      fill(255, 0, 0);
      rect(0 + (i * (width / 255)), height, width / 255, -h);
    }
  }

  if(BhistB){
    for (i = 0; i < 255; i++) {
      h = map(histB[i], 0, histBMax, 0, height - img.height-10)
      fill(0, 0, 255);
      rect(0 + (i * (width / 255)), height, width / 255, -h);
    }
  }

  image(img, 0, 0);
  loop(); 
}

function keyPressed() {
  if(key === '1'){
    BhistR = !BhistR;
  }
  if(key === '2'){
    BhistB = !BhistB;
  }
  if(key === '3'){
    BhistG = !BhistG;
  }
  if (key === "a") {
    img = loadImage("../images/subnautica.jpg");
    redraw();
  }
  if (key === "b") {
    img = loadImage("../images/unity.jpg");
    redraw();
  }
  if (key === "c") {
    img = loadImage("../images/oddysey.jpg");
    redraw();
  }
  if (key === "d") {
    img = loadImage("../images/minecraft.jpg");
    redraw();
  }
  if (key === "e") {
    img = loadImage("../images/sekiro.jpg");
    redraw();
  }
}
