---
layout: sample
title: segmentación de video en tiempo real
permalink: /segmentation/
custom_css: style.css
custom_js:
  - ml5.js
  - segmentation.js
---

Como lo indica el titulo, se transformará el video que recibe la cámara web y se separará a la paersona de su entorno en tiempo real.

¿Qué es exactamente la segmentación? En computación visual, la segmentación de imágenes se refiere a la técnica de agrupar píxeles en una imagen en áreas semánticas, típicamente para ubicar objetos y límites.

Se usa una librería de javascript para Machine Learning llamada ml5 que de fondo usa TensorFlow.

la manera en la que funciona es tomar los píxeles de la imagen y los separa en dos categorías, 1) si el pixel hace parte de una persona y 2) si hace parte del entorno.

<div class="sketch-segmentation" id='segmentation'></div>

como se puede ver la persona se ve con distintos colores aleatoreos mientras que el fondo se ve completamente en blanco logrando así una segmentación.

si se desea conocer más acerca del proyecto y hacer sus propias implementaciones puede ir a https://blog.tensorflow.org/2019/11/updated-bodypix-2.html 

El código que se usa el el siguiente

```js
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
    var myCanvas = createCanvas(320, 240);
    myCanvas.parent("segmentation");
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
```


