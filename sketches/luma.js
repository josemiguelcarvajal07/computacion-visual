let img;

function preload() {
  img = loadImage("../images/Cat.jpg");
}

function setup() {
  var myCanvas = createCanvas(img.width, img.height);
  myCanvas.parent("luma");
  img.loadPixels();
  pixelDensity(1);
}

function draw() {
  image(img, 0, 0, img.width, img.height);

  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = pixels[index + 0];
      var g = pixels[index + 1];
      var b = pixels[index + 2];

      var luma = r * 0.299 + g * 0.587 + b * 0.0114;

      pixels[index + 0] = luma;
      pixels[index + 1] = luma;
      pixels[index + 2] = luma;
    }
  }
  updatePixels();
}