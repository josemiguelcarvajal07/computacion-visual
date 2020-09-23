var img;

function preload() {
    img = loadImage('../images/Tiger.jpg');
}

function setup() {
    var myCanvas = createCanvas(img.width, img.height);
    myCanvas.parent('gaussian-blur');
    pixelDensity(1);
}

function draw() {
    background(0, 0, 0);

    var k1 = [[1, 2, 1],
              [2, 4, 2],
              [1, 2, 1]];

    img.loadPixels();
    
    var w = img.width;
    var h = img.height;
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            var ul = ((x-1+w)%w + w*((y-1+h)%h))*4; 
            var uc = ((x-0+w)%w + w*((y-1+h)%h))*4; 
            var ur = ((x+1+w)%w + w*((y-1+h)%h))*4; 
            var ml = ((x-1+w)%w + w*((y+0+h)%h))*4; 
            var mc = ((x-0+w)%w + w*((y+0+h)%h))*4; 
            var mr = ((x+1+w)%w + w*((y+0+h)%h))*4; 
            var ll = ((x-1+w)%w + w*((y+1+h)%h))*4; 
            var lc = ((x-0+w)%w + w*((y+1+h)%h))*4; 
            var lr = ((x+1+w)%w + w*((y+1+h)%h))*4; 
                
            p0 = img.pixels[ul]*k1[0][0]; 
            p1 = img.pixels[uc]*k1[0][1]; 
            p2 = img.pixels[ur]*k1[0][2]; 
            p3 = img.pixels[ml]*k1[1][0]; 
            p4 = img.pixels[mc]*k1[1][1]; 
            p5 = img.pixels[mr]*k1[1][2]; 
            p6 = img.pixels[ll]*k1[2][0]; 
            p7 = img.pixels[lc]*k1[2][1]; 
            p8 = img.pixels[lr]*k1[2][2]; 
            var red = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/16;
                
            p0 = img.pixels[ul+1]*k1[0][0]; 
            p1 = img.pixels[uc+1]*k1[0][1]; 
            p2 = img.pixels[ur+1]*k1[0][2]; 
            p3 = img.pixels[ml+1]*k1[1][0]; 
            p4 = img.pixels[mc+1]*k1[1][1]; 
            p5 = img.pixels[mr+1]*k1[1][2]; 
            p6 = img.pixels[ll+1]*k1[2][0]; 
            p7 = img.pixels[lc+1]*k1[2][1]; 
            p8 = img.pixels[lr+1]*k1[2][2]; 
            var green = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/16;
                
            p0 = img.pixels[ul+2]*k1[0][0]; 
            p1 = img.pixels[uc+2]*k1[0][1]; 
            p2 = img.pixels[ur+2]*k1[0][2]; 
            p3 = img.pixels[ml+2]*k1[1][0]; 
            p4 = img.pixels[mc+2]*k1[1][1]; 
            p5 = img.pixels[mr+2]*k1[1][2]; 
            p6 = img.pixels[ll+2]*k1[2][0]; 
            p7 = img.pixels[lc+2]*k1[2][1]; 
            p8 = img.pixels[lr+2]*k1[2][2]; 
            var blue = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/16;
                
            img.pixels[mc] = red;
            img.pixels[mc+1] = green;
            img.pixels[mc+2] = blue;
            img.pixels[mc+3] = img.pixels[lc+3];
        }
    }	
    
    img.updatePixels();
    image(img, 0, 0, img.width, img.height);
    noLoop(); 
}

function mousePressed() {
    redraw(5);
}