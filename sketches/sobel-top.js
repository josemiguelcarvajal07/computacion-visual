var img;

function preload() {
    img = loadImage('../images/Tiger.jpg');
}

function setup() {
    var myCanvas = createCanvas(img.width, img.height);
    myCanvas.parent('outline');
    pixelDensity(1);
}

function draw() {
    background(0, 0, 0);

   var k1 = [[0, 0, 0],
             [0, 1, 0],
             [0, 0, 0]];

    img.loadPixels();
    
    var w = img.width;
    var h = img.height;

    for (var y = 0; y < h; y++){
        for (var x = 0; x < w; x++) {
            c = convolution(x, y, k1, img);
            var loc = x + y*w;
            img.pixels[loc] = c
        }
    }

    img.updatePixels();
    image(img, 0, 0, img.width, img.height);
    noLoop(); 
}

function keypPressed() {
  matrixsize = 3:
  if(key == 'a'){
      k1 = [[-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]];
  }
}