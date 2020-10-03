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
    let mask = createGraphics(img.width, img.height);
}

function draw() {
    background(0, 0, 0);

    img.loadPixels();
    mask.loadPixels()

    if (Bhist) {
      mask.background(100);
      mask.stroke(255, 0, 0, 255);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(hist[which], 0, histRMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }

    if (BhistB) {
      mask.background(100);
      mask.stroke(0, 0, 255, 100);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(histB[which], 0, histBMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }

    if (BhistG) {
      mask.background(100);
      mask.stroke(0, 255, 0, 100);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(histG[which], 0, histGMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }

    if (BhistR) {
      mask.background(100);
      mask.stroke(0, 255, 0, 100);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(histG[which], 0, histGMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }
}

function newImage(image) {
    let hist = [256];
    let histR = [256];
    let histG = [256];
    let histB = [256];
  
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

    mask.loadPixels();
    mask.updatePixels();
    image(mask, 0, 0, mask.width, mask.height);
  }

function keyPressed() {
    if(key === 'a'){
        img = loadImage("../images/subnautica.jpg");
        newImage(img);
        redraw(5);
      }if(key === 'b'){
        img = loadImage("../images/unity.jpg");
        newImage(img);
        redraw(5);
      }if(key === 'c'){
        img = loadImage("../images/oddysey.jpg");
        newImage(img);
        redraw(5);
      }if(key === 'd'){
        img = loadImage("../images/minecraft.jpg");
        newImage(img);
        redraw(5);
      }if(key === 'e'){
        img = loadImage("../images/sekiro.jpg");
        newImage(img);
        redraw(5);
      }
}