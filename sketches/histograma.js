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
  img = loadImage('../images/sekiro.jpg');
}

function setup() {
  width = img.width;
  height = img.height;

  h1 = createElement("h1", "Levels Histogram");
  h1.style("z-index", 50);
  h1.style("x-index", 150);
  h1.style("x-index", width / 2);

  createCanvas(width, height);

  img.loadPixels();

  background(255);
  var pixelBrt = [];
  
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      pixel = img.get(i, j);
      pixelBrt[brightness(pixel)]++;
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

}