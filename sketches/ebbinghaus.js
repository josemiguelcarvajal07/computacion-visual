function setup() {
  var myCanvas = createCanvas(800, 400);
  myCanvas.parent("ebbinghaus");
}

function draw() {
  background(255);
  var k = map(mouseX, 0, width, 200, 0);

  noStroke();
  fill(210,115,20);
  ellipse(260, 200, 65, 65);

  fill(59, 125, 191, k);
  ellipse(210, 120, 90, 90);
  ellipse(310, 120, 90, 90);
  ellipse(210, 280, 90, 90);
  ellipse(310, 280, 90, 90);
  ellipse(160, 200, 90, 90);
  ellipse(360, 200, 90, 90);

  fill(210,115,20);
  ellipse(550, 200, 65, 65);

  fill(59, 125, 191, k);
  ellipse(550, 154, 25, 25);
  ellipse(550, 246, 25, 25);
  ellipse(500, 200, 25, 25);
  ellipse(600, 200, 25, 25);
  ellipse(515, 235, 25, 25);
  ellipse(585, 235, 25, 25);
  ellipse(515, 164, 25, 25);
  ellipse(585, 164, 25, 25);
}
