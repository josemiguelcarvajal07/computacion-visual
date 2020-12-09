---
layout: sample
title: Sonido de la música
permalink: /sound/
custom_css: style.css
custom_js:
  - sound.js
---
En esta pagina se puede observar un canvas en el cual se observa una vizualización según el canal de sonido para una canción. 

Lo que se hace es tomar una canción con su audio en mp3 y realiza con p5.FFT el cuaĺ es la transformada rápida de furier para convertir la señal original(ya sea tiempo o espacio) hacia el espacio de la frecuencia. y lo que se observa es esta frecuencia graficando sus ondas de sonido. 


<div class="sound" id='sonido'></div>

Se tomó inspiración en el siguiente blog https://medium.com/@nishancw/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07