---
layout: sample
title: Efecto de Cornsweet
permalink: /cornsweet/
custom_css: style.css
custom_js:
  - cornsweet.js
---
El efecto Cornsweet o ilusión Cornsweet es una ilusión óptica que fue descrita en detaller por Tom Cornsweet, y consiste en percibir colores diferentes de dos paletas por elsimple hecho de tener una región de contraste diferente en la unión de estas dos, apesar que ambos bloques tienen el mismo tono. Esto sucede porque el sistema visual humano hace una correción, la parte de arriba por su orientación (La cual asismimos viene de arriba) tiene más luz, y por lo tanto se entiende que la lu reflejada tiene una determinada intensiadad. La parte de abajo, por el contrario, tiene menos luz porque estaría en sombra y, por tanto, se asume que el tono real sería más claro si no estuviese en sombra.

Además, influye que el color de la parte medial, por la forma de los bloques, está invertida: la parte de abajo del bloque superior se oscurece en comparación con la parte superior (porque le daría la sombra) y la parte superior del bloque inferior es muy clara porque le da la luz (y por tanto se supone que ese es su color).
Por otro lado, cuando los bordes de dos objetos (yuxtapuestos) cambian de tono y/o luminosidad, el contraste entre ellos hace que se magnifiquen las diferencias (y que lo claro parezca más claro y lo oscuro, más oscuro). Esto se conoce como ley de contraste simultáneo de los colores y lo estudió y explicó Chevreul. Lo podemos ver más claramente en la siguiente imagen:

<img src="../images/Cornsweet.png" alt="cornsweet" class="center-image">

A continuación se implementa un canvas mostrando la ilusión en el cual se puede observar que ambos bloques tiene el mismo color al mover el puntero de manera horizontal:

<div class="sketch-averages" id='cornsweet'></div>