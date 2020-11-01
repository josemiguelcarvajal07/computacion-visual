function setup() {
  var myCanvas = createCanvas(800, 400);
  myCanvas.parent("cornsweet");
}

function draw() {
  var k = map(mouseX, 0, width, 200, 0);
  noStroke();
  fill(172,172,172);
  rect(0, 0, 800, 400);
  fill(59, 125, 191, k);
  rect(380, 0, 80, 400);
}
