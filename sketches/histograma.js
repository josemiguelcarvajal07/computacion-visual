let img;
let mask;
let Bhist = false;
let BhistR = true;
let BhistG = false;
let BhistB = false;
let hist = [];
let histR = [];
let histG = [];
let histB = [];
let histGMax;
let histRMax;
let histBMax;

function preload() {
  img = loadImage("../images/sekiro.jpg");
}

function setup() {
  var myCanvas = createCanvas(img.width, img.height);
  myCanvas.parent("histograma");
  mask = createGraphics(640, 360);
  pixelDensity(1);
}

  h1 = createElement("h1", "Levels Histogram");
  h1.style("z-index", 50);
  h1.style("x-index", 150);
  h1.style("x-index", width / 2);

  if (Bhist) {
    mask.stroke(255, 0, 0, 255);
    for (var i = 0; i < img.width; i += 2) {
      var which = int(map(i, 0, img.width, 0, 255));
      var y = int(map(hist[which], 0, histMax, img.height, 0));
      mask.line(i, img.height, i, y);
    }
  }

  img.loadPixels();

  background(255);
  var pixelBrt = [];
  
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      pixel = img.get(i, j);
      var loc = (x + y * img.width) * 4;
      pixelBrt[img.pixels[loc + 4]]++;
      histR[int(red(pixel))]++;
      histG[int(green(pixel))]++;
      histB[int(blue(pixel))]++;
    }
  }
  
  var maxPixels = 0;
  for (i = 0; i < 255; i++) {
    if (pixelBrt[i] > maxPixels) {
      maxPixels = pixelBrt[i];
    }
  }

  for (i = 0; i < 255; i++) {
    h = map(pixelBrt[i], 0, maxPixels, 0, height - img.height-10)
    fill(i, i, i);
    rect(0 + (i * (width / 255)), height, width / 255, -h);
  }

  image(img, 0, 0);
}

function draw() {

function keyPressed() {
  if (key === "a") {
    img = loadImage("../images/subnautica.jpg");
    newImage(img);
    redraw();
  }
  if (key === "b") {
    img = loadImage("../images/unity.jpg");
    newImage(img);
    redraw();
  }
  if (key === "c") {
    img = loadImage("../images/oddysey.jpg");
    newImage(img);
    redraw();
  }
  if (key === "d") {
    img = loadImage("../images/minecraft.jpg");
    newImage(img);
    redraw();
  }
  if (key === "e") {
    img = loadImage("../images/sekiro.jpg");
    newImage(img);
    redraw();
  }
}
