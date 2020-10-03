let img;
let Bhist = true;
let BhistR = true;
let BhistG = true;
let BhistB = true;
let hist = [];
let histR = [];
let histG = [];
let histB = [];
let histGMax;
let histRMax
let histBMax

function preload() {
    img = loadImage('../images/sekiro.jpg');
}

function setup() {
    var myCanvas = createCanvas(img.width, img.height);
    myCanvas.parent('histograma');
    original = createGraphics(img.width, img.height);
    mask = createGraphics(img.width, img.height);
    newImage(original)
}

function draw() {
  background(0, 0, 0);
  original.beginDraw();
  original.image(img,0,0);
  original.endDraw();
  mask.beginDraw();
  mask.background(255);

  if (Bhist) {
    mask.stroke(255, 0, 0, 255);
    for (var i = 0; i < img.width; i += 2) {
      var which = int(map(i, 0, img.width, 0, 255));
      var y = int(map(hist[which], 0, histRMax, img.height, 0));
      mask.line(i, img.height, i, y);
    }
}

  if (BhistB) {
    mask.stroke(0, 0, 255, 100);
    for (var i = 0; i < img.width; i += 2) {
      var which = int(map(i, 0, img.width, 0, 255));
      var y = int(map(histB[which], 0, histBMax, img.height, 0));
      mask.line(i, img.height, i, y);
    }
  }

  if (BhistG) {
    mask.stroke(0, 255, 0, 100);
    for (var i = 0; i < img.width; i += 2) {
      var which = int(map(i, 0, img.width, 0, 255));
      var y = int(map(histG[which], 0, histGMax, img.height, 0));
      mask.line(i, img.height, i, y);
    }
  }

  if (BhistR) {
    mask.stroke(0, 255, 0, 100);
    for (var i = 0; i < img.width; i += 2) {
      var which = int(map(i, 0, img.width, 0, 255));
      var y = int(map(histG[which], 0, histGMax, img.height, 0));
      mask.line(i, img.height, i, y);
    }
  }

  mask.endDraw();
  image(original, 0, 0);
  image(mask, 0, 360);
}

function newImage(image) {
  hist = [256];
  histR = [256];
  histG = [256];
  histB = [256];

  for (var i = 0; i < image.width; i++) {
    for (var j = 0; j < image.height; j++) {
      var pixel = image.get(i, j);
      hist[int(brightness(pixel))]++;
      histR[int(red(pixel))]++;
      histG[int(green(pixel))]++;
      histB[int(blue(pixel))]++;
    }
  }
  histMax = max(hist);
  histRMax = max(histR);
  histGMax = max(histG);
  histBMax = max(histB);
}

function keyPressed() {
  if(key === 'a'){
    img = loadImage("../images/subnautica.jpg");
    newImage(img);
    redraw();
  }if(key === 'b'){
    img = loadImage("../images/unity.jpg");
    newImage(img);
    redraw();
  }if(key === 'c'){
    img = loadImage("../images/oddysey.jpg");
    newImage(img);
    redraw();
  }if(key === 'd'){
    img = loadImage("../images/minecraft.jpg");
    newImage(img);
    redraw();
  }if(key === 'e'){
    img = loadImage("../images/sekiro.jpg");
    newImage(img);
    redraw();
  }
}