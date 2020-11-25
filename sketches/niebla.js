var img;
let fogAmount;
var gl_Fragcolor;

function preload() {
  img = loadImage("../images/Tiger.jpg");
}

function setup() {
  var myCanvas = createCanvas(800, 400, WEBGL);
  myCanvas.parent("niebla");
  fogAmount = createSlider(0, 10, 0);
}

function draw() {
  background(0);
  img.loadPixels();
  let d = pixelDensity();
  let halfImage = 4 * (width * d) * (height * d / 2);
  for (var x = 0; x < halfImage; x++) {
      gl_Fragcolor = img.pixels[x] + (10-img.pixels[x])*fogAmount.Value()/10;
  }
  img.updatePixels();
  image(img, 0, 0, img.width, img.height);
  noLoop();
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(40, 125, 240, locX, locY, 125);
  noStroke();
  sphere(100);
  rotateX(frameCount*0.01);
  rotateY(frameCount*0.01);
  rotateZ(frameCount*0.01);
  translate(200,200,0);
  sphere(50);
  translate(0,-200,0);
  cone(40,70) 
}