function preload() {
    table = loadTable("../taller-profundizacion/data/siniestros.csv","csv","header")
  }
  
function setup() {
    var myCanvas = createCanvas(800, 800);
    myCanvas.parent("aeropuertos");
    noStroke()
    noLoop()
}