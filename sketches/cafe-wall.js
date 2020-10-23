function setup() {
  var myCanvas = createCanvas(800, 527);
  myCanvas.parent("cafe-wall");
  background("#808080");
  mouseMoved = function () {
    draw();
  };
}

function dibujarFila(fila) {
  posicionVertical = fila * 59;
  var i = -100;
  while (i <= 20) {
    if (i % 2 == 0) {
      fill("#000000");
    } else {
      fill("#ffffff");
    }
    noStroke();
    var posicionLadrillo = fila % 4;
    if (posicionLadrillo == 3) posicionLadrillo = 1;
    rect(
      i * 59 - (((posicionLadrillo * mouseX) / 10) % 100) + 10,
      posicionVertical,
      55,
      55
    );
    i++;
  }
}

function draw() {
  var i = 0;
  background("#808080");
  while (i < 9) {
    dibujarFila(i);
    i++;
  }
}
