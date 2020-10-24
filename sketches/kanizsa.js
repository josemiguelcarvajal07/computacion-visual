var angulo = 0;

function setup() {
  var myCanvas = createCanvas(800, 800);
  myCanvas.parent("kanizsa");
}

function draw() {
  background(255);
  fill(0);

  push();
  translate(200, 200);
  rotate(HALF_PI + angulo);
  arc(0, 0, 300, 300, PI, HALF_PI);
  pop();

  push();
  translate(600, 200);
  rotate(HALF_PI * 2 - angulo);
  arc(0, 0, 300, 300, PI, HALF_PI);
  pop();

  push();
  translate(600, 600);
  rotate(HALF_PI * 3 + angulo);
  arc(0, 0, 300, 300, PI, HALF_PI);
  pop();

  push();
  translate(200, 600);
  rotate(HALF_PI * 4 - angulo);
  arc(0, 0, 300, 300, PI, HALF_PI);
  pop();

  angulo += 0.01;
}
