var aceleracion = 0.3;
var velocidad = 0.0;

function setup() {
  var myCanvas = createCanvas(700, 700);
  myCanvas.parent("wagon-wheel");
}

function draw() {
  background(255);
  push();
  fill(102, 51, 0);
  translate(width / 2.0, height / 2.0);
  var i = 0;
  while (i < 360) {
    push();
    rotate(radians(i + 180 + velocidad));
    rect(40, 20, 13, 50, 20);
    pop();
    i += 30;
  }
  fill(102, 51, 0);
  var j = 0;
  while (j < 360) {
    push();
    rotate(radians(j + 180 + velocidad));
    rect(-80, 50, 13, 90, 20);
    pop();
    j += 30;
  }
  fill(102, 51, 0);
  var k = 0;
  while (k < 360) {
    push();
    rotate(radians(k + 180 + velocidad));
    rect(80, 137, 13, 90, 20);
    pop();
    k += 30;
  }
  fill(102, 51, 0);
  var l = 0;
  while (l < 360) {
    push();
    rotate(radians(l + 180 + velocidad));
    rect(-40, 242, 13, 90, 20);
    pop();
    l += 30;
  }
  pop();
  velocidad += aceleracion;
  aceleracion += 0.3;
}
