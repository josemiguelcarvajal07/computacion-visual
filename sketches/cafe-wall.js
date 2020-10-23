function setup() {
  var myCanvas = createCanvas(800, 535);
  myCanvas.parent("cafe-wall");
  background("#808080");
//   smooth();
//   noLoop();
  mouseMoved = function () {
    draw();
  };
}

function drawRow(row) {
  var cWidth = 55;
  var cHeight = 55;
  var linexHeight = 4;
  var lineyHeight = 4;

  yPos = row * (cHeight + lineyHeight) + lineyHeight;
  numCells = Math.ceil(800 / cWidth) + 3;
  for (var i = -80; i < numCells; i++) {
    if (i % 2 == 0) {
      fill("#000000");
    } else {
      fill("#ffffff");
    }
    noStroke();
    var pos = row % 4;
    if (pos == 3) pos = 1;
    rect(
      i * (cWidth + linexHeight) - (((pos * mouseX) / 15) % (2 * cWidth)) + 15,
      yPos,
      cWidth,
      cHeight
    );
  }
}

function draw() {
  background("#808080");
  for (var i = 0; i < 9; i = i + 1) {
    drawRow(i);
  }
}
