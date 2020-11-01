function setup() {
  var myCanvas = createCanvas(800, 400);
  myCanvas.parent("cornsweet");
}

function draw() {
  var k = map(mouseX, 0, width, 200, 0);
  noStroke();
  fill(172,172,172);
  rect(0, 0, 800, 400);
  for (var i = 370; i < 430; i++) {
    fill(180,180,180);
    rect(i, 0, i, 400);
  }
  fill(0, 0, 0, k);
  rect(360, 0, 80, 400);
}
