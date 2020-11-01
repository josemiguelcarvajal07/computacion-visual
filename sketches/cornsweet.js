function setup() {
  var myCanvas = createCanvas(800, 400);
  myCanvas.parent("cornsweet");
  stroke(172,172,172);
  fill(172,172,172);
  rect(0, 0, 800, 400);
}

function draw() {
  if (mousePressed == true) {
    fill(0,0,0);
    rect(380, 0, 80, 400);
  }else{
    for(int i = 370; i <= 430 ;i = i+1){
      fill(180,180,180);
      rect(i, 0, i, 400);
    }
  }
}
