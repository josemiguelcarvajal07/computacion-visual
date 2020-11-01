function setup() {
  var myCanvas = createCanvas(700, 700, WEBGL);
  myCanvas.parent("beuchet");
}

function draw() {
  var k = map(mouseX, 0, width, 200, 0);
  background(0);
  stroke(101,82,82);
  fill(255,255,255);
  translate(0,0,k);
  translate(width/2, height/2, -200);
  rotateX(radians(-10));
  rotateY(radians(-57));
  fill(94,11,11);
  box(100, 10, 100);
  fill(101,82,82);
  translate(50, -40, -50);
  box(5,100,5);
  translate(-100, 0, 0);
  box(5,100,5);
  translate(50, -15, 0);
  fill(94,11,11);
  box(100,50,1);
  rotateY(radians(57));
  rotateX(radians(10));
  translate(-50, 95, 250);
  fill(101,82,82);
  box(5,50,5);
  translate(-36.7, -12, 0);
  box(5,45,5);
  translate(55,4, 0);
  box(5,35,5);
  translate(39, 5, 0);
  box(5,57,5);
  rotateZ(radians(-80));
  translate(0, -20, 0);
  box(5,40,5);
}
