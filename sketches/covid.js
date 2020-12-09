var table;

function preload() {
  //table = loadTable("../taller-produnfizacion/data/covid.csv", "csv", "header");
  table = loadTable(
    "../taller-profundizacion/data/covid.csv",
    "csv",
    "header"
  );
}

function setup() {
  createCanvas(900, 900);
  background(220);


 // console.log(table);
  textAlign(CENTER, TOP);
  for (let r = 0; r < table.getRowCount(); r++) {
    const departamento = table.getString(r, "Departamento");
    const casos = table.getNum(r, "Casos");
    const muertes = table.getNum(r, "Muertes");
    const x = random(20, width-20);
    const y = random(20, height-70);
    const size = map(casos, 0, 40000, 0, 70);
    const fillColor = map(muertes, 0, 1500, 200, 0);
    fill(fillColor, 45, 20);
    circle(x, y, size);
    fill(0);
    text(departamento, x, y + size / 2 + 4);
    //console.log("say hi");
  }
}

function draw() {

}
