let bodypix;
let video;
let segmentation;
let img;

const options = {
    outputStride: 8,
    segmentationThreshold: 0.5,
}

function preload(){
    bodypix = ml5.bodyPix(options)
}

function setup() {
    createCanvas(320, 240);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element
    createPalette();

    bodypix.segmentWithParts(video, gotResults, options)
}


function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    segmentation = result;

    background(255, 0, 0);
    //image(video, 0, 0, width, height)
    image(segmentation.partMask, 0, 0, width, height)

    bodypix.segmentWithParts(video, gotResults, options)

}

function createPalette() {
    colorMode(RGB);
    options.palette = bodypix.config.palette;
    Object.keys(options.palette).forEach(part => {
        const r = floor(random(255));
        const g = floor(random(255));
        const b = floor(random(255));
        const c = color(r, g, b)
        options.palette[part].color = c;
    });
}