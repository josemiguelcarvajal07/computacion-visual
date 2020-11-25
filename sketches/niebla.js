let myShader;
let fogColor = [1, 0.99, 0.99, 1];
let fog=0;

function preload() {

  myShader = loadShader("fog.vert", "fog.frag");
  imgbase = loadImage("images/gflor.jpeg");
}

function setup() {

  var canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('sketch-div');
  
  fogAmount=fog
  shader(myShader);
  myShader.setUniform("uMatcapTexture", imgbase);
  noStroke();
}

function draw() {
  background(211,211,211);
  fogAmount=fog

  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.009);
    itgitg
  shader(myShader);
  myShader.setUniform("u_fogColor", fogColor);
  myShader.setUniform("u_fogAmount", fogAmount);
    

  box(width / 2);
}

function mouseMoved() {
  fog = mouseX*0.002;
  if (fog > 1) {
    fog = 1;
  }
  if (fog < 0) {
    fog = 0;
  }
}