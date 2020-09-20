---
layout: sample
title: Conversion a escala de grises por promedio RGB
permalink: /grises-promedio/
custom_css: style.css
custom_js:
# - p5.min.js
# - p5.sound.min.js
- averages.js
---
Como lo indica el titulo, vamos a convertir una imagen a color a una imagen en escala de grises mediante el metodo de promedio RGB

Esta es la imagen que vamos a transformar, como podemos observar esta es una imagen a color de un jardín.

<img src="../images/Garden.jpg" alt="Garden">

y ahora procedemos a transformar esta imagen a una imagen de escala de grises mediante el metodo de promedio RGB usando el siguiente script:

```js
let img;

function preload() {
    img = loadImage('../images/Garden.jpg');
  };

function setup () {
var myCanvas = createCanvas(886, 664);
myCanvas.parent('averages');
img.loadPixels();
pixelDensity(1);
};

function draw(){
  image(img, 0, 0, img.width, img.height);
  
  loadPixels();
  for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var index = (x + y * width)*4;
        var r = pixels[index+0];
        var g = pixels[index+1];
        var b = pixels[index+2];  
        
        var bw = (r + g + b)/3;
        
        pixels[index+0] = bw;
        pixels[index+1] = bw;
        pixels[index+2] = bw;
      }
  }
updatePixels();
}
```
Finalmente como resultado obtenemos la imagen en escala de grises
<div class="sketch-averages" id='averages'></div>