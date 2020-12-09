---
layout: sample
title: Sonido de la música
permalink: /sound/
custom_css: style.css
custom_js:
  - sound.js
---
<p class="map-text">
En esta pagina se puede observar un canvas en el cual se puede observar una representacion de todos los diferentes aeropuertos que hay en el mundo y las conexiones que existen entre ellos. Para realizar esta representacion se utilizo un archivo .csv en el cual se encontro variada informacion sobre cada aeropuerto en el mundo, cosas como nombre del aeropuerto, su ubicacion (latitud y longitud), la ciudad y el pais donde el aeropuerto se encuentra ubicado, y los diferentes aeropuertos con los que esta conectado.</p>

<p class="map-text">
Estas conexiones estan establecidas mediante los vuelos que las aerolineas ofrecen entre cada aeropuerto. La manera en la que este canvas funciona es mediante el uso del raton, cada punto blanco en el canvas representa un aeropuerto, cuando se hace hover sobre cualquiera de los puntos con el cursor, este cambia de color a naranja y tambien lo hacen todos los aeropuertos que esten relacionados con este, y finalmente en la parte inferior izquierda se muestra la siguiente información sobre este aeropuerto:</p>

<ul class="map-text">
    <li>Nombre del aeropuerto</li>
    <li>Ciudad en la que se ubica el aeropuerto</li>
    <li>Pais en el que se ubica el aeropuerto</li>
    <li>Ubicación del aeropuerto en (Latitud, Longitud)</li>
</ul>


<div class="sound" id='sonido'></div>
