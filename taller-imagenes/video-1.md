---
layout: sample
title: Demostración de eficiencia de Video 1
permalink: /video-1/
custom_css: style.css
custom_js:
  - video-1.js
---
Se analizará la eficiencia computacional de un video mediante la funcion frameRate() de p5.js, se puede observar este video de un playa.

<video src="../videos/video-1.mp4" width="640" height="360" autoplay muted loop></video>

Ahora se procederá a analizar el framerate del video usando el siguiente script:

```js
let videoElement;
function setup() {
  videoElement = createVideo(["../videos/video-1.mp4"], onVideoLoad);
  videoElement.parent("video-1");
  var myCanvas = createCanvas(1000, 200);
  myCanvas.parent("video-position");
}
function draw() {
  background(255, 255, 255);
  textSize(20);
  text("- Frame Rate with frameRate() = " + frameRate().toFixed(3), 100, 30);
  text("- Frames that have passed with frameCount = " + frameCount, 100, 70);
  text("- Time difference between the beginning of the previous frame",100, 110);
  text("and the beginning of the current frame with deltaTime = " +deltaTime.toFixed(3),100,135);
}
function onVideoLoad() {
  videoElement.play();
  videoElement.volume(0);
  videoElement.autoplay(true);
  videoElement.size(640, 360);
  videoElement.loop();
}
```

Finalmente como resultado se obtiene un canvas donde se puede observar el FrameRate, el FrameCount y el DeltaTime del video.

<div class="sketch-matrix" id='video-1'></div>
<div class="sketch-matrix" id='video-position'></div>