let constante, lineal, cuadratico;

function setup() {
  var myCanvas = createCanvas(800, 400, WEBGL);
  myCanvas.parent("atenuacion");
  constante = createSlider(0, 10, 0);
  lineal = createSlider(0, 10, 0);
  cuadratico = createSlider(0, 10, 0);
}

function draw() {
  background(0);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  let l = lineal.value()/1000;
  let c = cuadratico.value()/10000;
  lightFalloff(constante.value(),l,c);
  pointLight(40, 125, 240, locX, locY, 125);
  noStroke();
  sphere(100);
  rotateX(frameCount*0.01);
  rotateY(frameCount*0.01);
  translate(200,200,0);
  sphere(50);
  translate(0,-200,0);
  cone(40,70) 
}
