---
layout: sample
title: Niebla
permalink: /niebla/
custom_css: style.css
custom_js:
  - niebla.js
---
Para realizar una implementación de niebla, se debe usar algún tipo de cálculo de profundidad de la cámara para hacer que el color se asemeje a la niebla. para ello se debe implementar la siguiente fórmula:


<img src="../images/ecuacionfog.jpg" alt="fog" class="center-image">

en donde gl_fragcolor representar un valor entre creo y uno, que es el porcentaje de ambos colores. La función mix mezcla los dos primeros valores, cuando fogAmount es cero, mix devuelve el color original, por el contrario cuando es uno devuelve el color de la niebla.

<div class="center-text">
<div class="center-image" id='niebla'></div>
</div>