---
layout: sample
title: Histograma
permalink: /histograma/
custom_css: style.css
custom_js:
- histograma.js
---
A lo largo de esta página, vamos a documentar el estudio realizado para extraer el histograma de una imagen usango p5.js, las imagenes a analizar se pueden ir camiando mediante las letras:

<img src="../images/sekiro.jpg" alt="hisgrama" class="center-image">

- Letra "a": para mostrar la imagen de subnautica
- Letra "b": para mostrar la imagen de Assassin's Creed Unity
- Letra "c": para mostrar la imagen de Assassin's Creed Oddysey
- Letra "d": para mostrar la imagen de Minecraft
- Letra "e": para mostrar la imagen de Sekiro: Shadows Die Twice

El metodo utilizado para realizar el análisis es iterar por cada uno de los pixeles en la imagen y guardar sus propiedades en arreglos de 256 posiciones. Cada elemento de estos nos indica cuántos pixeles tienen el nivel de brillo, 
rojo, verde o azul igual al valor de la posición del arrelgo en la cual se encuentra. Cada valor de los arreglos se grafica en el histograma utilizando el método .line()

El código utilizado para realizar lo descrito anteriormente y obtener el histograma de la imagen seleccionada es el siguente:

```js
let img;
let Bhist = true;
let BhistR = true;
let BhistG = true;
let BhistB = true;
let hist = [];
let histR = [];
let histG = [];
let histB = [];
let histGMax;
let histRMax
let histBMax

function preload() {
    img = loadImage('../images/sekiro.jpg');
}

function setup() {
    var myCanvas = createCanvas(img.width, img.height);
    myCanvas.parent('histograma');
    mask = createGraphics(img.width, img.height);
    pixelDensity(1);
}

function draw() {
    background(0, 0, 0);

    img.loadPixels();

    if (Bhist) {
      mask.background(100);
      mask.stroke(255, 0, 0, 255);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(hist[which], 0, histRMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }

    if (BhistB) {
      mask.background(100);
      mask.stroke(0, 0, 255, 100);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(histB[which], 0, histBMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }

    if (BhistG) {
      mask.background(100);
      mask.stroke(0, 255, 0, 100);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(histG[which], 0, histGMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }

    if (BhistR) {
      mask.background(100);
      mask.stroke(0, 255, 0, 100);
      for (var i = 0; i < img.width; i += 2) {
        var which = int(map(i, 0, img.width, 0, 255));
        var y = int(map(histG[which], 0, histGMax, img.height, 0));
        mask.line(i, img.height, i, y);
      }
    }
}

function newImage(image) {
    let hist = [256];
    let histR = [256];
    let histG = [256];
    let histB = [256];
  
    for (var i = 0; i < image.width; i++) {
      for (var j = 0; j < image.height; j++) {
        var pixel = image.get(i, j);
        hist[int(brightness(pixel))]++;
        histR[int(red(pixel))]++;
        histG[int(green(pixel))]++;
        histB[int(blue(pixel))]++;
      }
    }
    histMax = max(hist);
    histRMax = max(histR);
    histGMax = max(histG);
    histBMax = max(histB);

    img.loadPixels();
    img.updatePixels();
    image(img, 0, 0, img.width, img.height);
  }

function keyPressed() {
    if(key === 'a'){
        img = loadImage("../images/subnautica.jpg");
        newImage(img);
        redraw();
      }if(key === 'b'){
        img = loadImage("../images/unity.jpg");
        newImage(img);
        redraw();
      }if(key === 'c'){
        img = loadImage("../images/oddysey.jpg");
        newImage(img);
        redraw();
      }if(key === 'd'){
        img = loadImage("../images/minecraft.jpg");
        newImage(img);
        redraw();
      }if(key === 'e'){
        img = loadImage("../images/sekiro.jpg");
        newImage(img);
        redraw();
      }
}
```
<div class="histograma" id='histograma'></div>