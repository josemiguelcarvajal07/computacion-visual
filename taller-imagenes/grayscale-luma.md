---
layout: sample
title: Conversion a escala de grises con la fórmula luma
permalink: /grises-luma/
custom_css: style.css
custom_js:
  - luma.js
---

Como lo indica el titulo, vamos a convertir una imagen a color a una imagen en escala de grises mediante la fórmula luma, la cual es la siguiente:

<div class="center-text">
    <b>Luma = R*(0.299)+G*(0.587)+ B*(0.0114)</b>
</div>

Esta es la imagen que se transformará, como se puede observar esta es una imagen a color de un gato.

<img src="../images/Cat.jpg" alt="Cat" class="center-image">

Y ahora se procede a transformar esta imagen a una imagen de escala de grises mediante el metodo de promedio RGB usando el siguiente script:

```js
let img;

function preload() {
  img = loadImage("../images/Cat.jpg");
}

function setup() {
  var myCanvas = createCanvas(960, 640);
  myCanvas.parent("luma");
  img.loadPixels();
  pixelDensity(1);
}

function draw() {
  image(img, 0, 0, img.width, img.height);

  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = pixels[index + 0];
      var g = pixels[index + 1];
      var b = pixels[index + 2];

      var luma = r * 0.299 + g * 0.587 + b * 0.0114;

      pixels[index + 0] = luma;
      pixels[index + 1] = luma;
      pixels[index + 2] = luma;
    }
  }
  updatePixels();
}
```

Finalmente como resultado se obtiene la imagen en escala de grises

<div class="sketch-luma" id='luma'></div>
