let fogAmount;
var gl_Fragcolor;

function setup() {
  var myCanvas = createCanvas(800, 400, WEBGL);
  myCanvas.parent("niebla");
  fogAmount = createSlider(0, 10, 0);
}

function draw() {
  background(0);
  noLoop();
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  specularColor(255, 0, 0);
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