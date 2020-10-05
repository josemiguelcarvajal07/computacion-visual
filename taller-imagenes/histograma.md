---
layout: sample
title: Histograma
permalink: /histograma/
custom_css: style.css
custom_js:
  - histograma.js
---

A lo largo de esta página se va a documentar el estudio realizado para extraer el histograma de una imagen usango p5.js, las imagenes a analizar se pueden ir camiando mediante los siguiente comandos con letras:

- Letra "a": para mostrar la imagen de subnautica
- Letra "b": para mostrar la imagen de Assassin's Creed Unity
- Letra "c": para mostrar la imagen de Assassin's Creed Oddysey
- Letra "d": para mostrar la imagen de Minecraft
- Letra "e": para mostrar la imagen de Sekiro: Shadows Die Twice

El metodo utilizado para realizar el análisis es iterar por cada uno de los pixeles en la imagen y guardar sus propiedades en arreglos de 256 posiciones. Cada elemento de estos nos indica cuántos pixeles tiene de rojo, verde o azul igual al valor de la posición del arrelgo en la cual se encuentra. Cada valor de los arreglos se grafica en el histograma utilizando el método rect()

Para mostrar u ocultar cada histograma de color utilice los siguientes comandos:

- Número "1": mostrar u ocultar el histograma del color rojo
- Número "2": mostrar u ocultar el histograma del color azul
- Número "3": mostrar u ocultar el histograma del color verde

El código utilizado para realizar lo descrito anteriormente y obtener el histograma de la imagen seleccionada es el siguente:

```js
let img;
let BhistR = true;
let BhistG = false;
let BhistB = false;
let histR = [0];
let histG = [0];
let histB = [0];
var histGMax = 0;
var histRMax = 0;
var histBMax = 0;

function preload() {
  img = loadImage('../images/sekiro.jpg');
}

function setup() {
  width = 580;
  height = 600;

  createCanvas(width, height);
  noLoop();
}

function draw() {
  
  img.loadPixels();

  background(255);
  for (i = 0; i < 255; i++) {
    histR[i] = 0;
    histB[i] = 0;
    histG[i] = 0;
  }
  
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      pixel = img.get(i, j);
      histR[int(red(pixel))]++;
      histB[int(blue(pixel))]++;
      histG[int(green(pixel))]++;
    }
  }
  
  for (i = 0; i < 255; i++) {
    if (histR[i] > histRMax) {
      histRMax = histR[i];
    }
    if (histB[i] > histBMax) {
      histBMax = histB[i];
    }
    if (histG[i] > histGMax) {
      histGMax = histG[i];
    }
  }
  if(BhistG){
    for (i = 0; i < 255; i++) {
      h = map(histG[i], 0, histGMax, 0, height - img.height-10)
      fill(0, 255, 0);
      rect(0 + (i * (width / 255)), height, width / 255, -h);
    }
  }
  if(BhistR){
    for (i = 0; i < 255; i++) {
      h = map(histR[i], 0, histRMax, 0, height - img.height-10)
      fill(255, 0, 0);
      rect(0 + (i * (width / 255)), height, width / 255, -h);
    }
  }

  if(BhistB){
    for (i = 0; i < 255; i++) {
      h = map(histB[i], 0, histBMax, 0, height - img.height-10)
      fill(0, 0, 255);
      rect(0 + (i * (width / 255)), height, width / 255, -h);
    }
  }

  image(img, 0, 0);
}

function keyPressed() {
  if(key === '1'){
    BhistR = !BhistR;
    redraw();
  }
  if(key === '2'){
    BhistB = !BhistB;
    redraw();
  }
  if(key === '3'){
    BhistG = !BhistG;
    redraw();
  }
  if (key === "a") {
    img = loadImage("../images/subnautica.jpg");
    redraw();
  }
  if (key === "b") {
    img = loadImage("../images/unity.jpg");
    redraw();
  }
  if (key === "c") {
    img = loadImage("../images/oddysey.jpg");
    redraw();
  }
  if (key === "d") {
    img = loadImage("../images/minecraft.jpg");
    redraw();
  }
  if (key === "e") {
    img = loadImage("../images/sekiro.jpg");
    redraw();
  }
}
```

<div class="center-text">

<div class="sketch-matrix" id='histograma'></div>

</div>
