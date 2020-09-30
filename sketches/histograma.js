varimg;

function preload() {
    img = loadImage('../images/Tiger.jpg');
}

function setup() {
    var myCanvas = createCanvas(img.width, img.height);
    myCanvas.parent('histograma');
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

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            c = convolution(x, y, k1, img);
            var loc = x + y * w;
            img.pixels[loc] = c
        }
    }

    img.updatePixels();
    image(img, 0, 0, img.width, img.height);
    noLoop();
}

function keyPressed() {
    matrixsize = 3;
    if (key == 'g') {
        matrix = [[-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]];
    } else if (key == 'h') {
        matrix = [[1, 0, -1],
        [2, 0, -2],
        [1, 0, -1]];
    } else if (key == 'i') {
        matrix = [[1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]];
    } else if (key == 'j') {
        matrix = [[1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]];
    }
}

function convolution(x, y, k1, matrixsize, mask) {
    var rtotal = 0.0;
    var gtotal = 0.0;
    var btotal = 0.0;
    for (var i = 0; i < matrixsize; i++) {
        for (var j = 0; j < matrixsize; j++) {
            var xloc = x + i;
            var yloc = y + j;
            var loc = xloc + mask.width * yloc;
            loc = constrain(loc, 0, mask.pixels.length - 1);
            rtotal += (red(mask.pixels[loc])) * k1[i][j];
            gtotal += (green(mask.pixels[loc])) * k1[i][j];
            btotal += (blue(mask.pixels[loc])) * k1[i][j];
        }
    }
    rtotal = constrain(rtotal, 0, 256);
    gtotal = constrain(gtotal, 0, 256);
    btotal = constrain(btotal, 0, 256);
    if (!inv) {
        return color(rtotal, gtotal, btotal);
    } else {
        return color(255 - rtotal, 255 - gtotal, 255 - btotal)
    }
}