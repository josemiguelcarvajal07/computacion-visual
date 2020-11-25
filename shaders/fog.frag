precision mediump float;

varying vec2 vTexCoord;
uniform vec4 u_fogColor;
uniform float u_fogAmount;
uniform sampler2D uMatcapTexture;

void main() {

  // Lets just draw the texcoords to the screen
  //gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 0.0 ,1.0);
  vec4 color = texture2D(uMatcapTexture, vTexCoord);
  gl_FragColor = mix(color, u_fogColor, u_fogAmount); 
  
}