var map;
var minVal;
var maxVal;
var tipo = 'CHOQUE';
var date = '2007';
var date_mes = 'Enero';
var gravedad = 'CON HERIDOS';

const files = {siniestros: "../googleMaps/datos/Trabajados2.csv"}

async function initMap() {
  let bogota = { lat: 4.570868, lng: -74 };
 
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: bogota,
  });

  await d3.json("../googleMaps/datos/poligonos-localidades2.geojson").then((data) => {
    const UTAMValues = data;

    map.data.addGeoJson(UTAMValues, {
      idPropertyName: "Identificador unico de la localidad",
    });
  });

  map.data.addListener("mouseover", mouseInToRegion);
  map.data.addListener("mouseout", mouseOutOfRegion);
  auxData();

  var selectBox = document.getElementById("tipo");
  google.maps.event.addDomListener(selectBox, "change", function () {
    tipo = selectBox.options[selectBox.selectedIndex].value;
    clearCensusData();
    auxData();
  });

  var selectBox2 = document.getElementById("anno");
  google.maps.event.addDomListener(selectBox2, "change", function () {
    date = selectBox2.options[selectBox2.selectedIndex].value;
    clearCensusData();
    auxData();
  });

  var selectBox3 = document.getElementById("mes");
  google.maps.event.addDomListener(selectBox3, "change", function () {
    date_mes = selectBox3.options[selectBox3.selectedIndex].value;
    clearCensusData();
    auxData();
  });

  var selectBox4 = document.getElementById("gravedad");
  google.maps.event.addDomListener(selectBox4, "change", function () {
    gravedad = selectBox4.options[selectBox4.selectedIndex].value;
    clearCensusData();
    auxData();
  });
}


function clearCensusData() {
  minVal = Number.MAX_VALUE;
  maxVal = -Number.MAX_VALUE;
  map.data.forEach(function (row) {
    row.setProperty("census_variable", undefined);
  });
  document.getElementById("tooltip").style.display = "none";
}

function auxData() {
  $.ajax({
    type: "GET",
    url: files["siniestros"],
    dataType: "text",
    success: function (data) {
      processData(data);
    },
  });
}

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(";");
  var loaded = {};

  for (var i = 1; i<allTextLines.length; i++){
    console.log("Mensaje en ProcessData");
    var datas = allTextLines[i].split(";");
    if(datas.length == headers.length){
      if(datas[2]==tipo){
        if(datas[3]==gravedad){
          if(datas[4]==date){
            if(datas[5]==date_mes){
              UTAMName = datas[0];
              loaded[UTAMName] = datas[6];
              map.data.getFeatureById(UTAMName).setProperty("bicycle_data", loaded[UTAMName]);
            }
          }
        }
      }
    }
  }
}

let actualUTAMInfo = "";

function mouseInToRegion(e) {
  console.log(e.feature.j);
  actualUTAMInfo = "";
  actualUTAMInfo += "<strong>Código Localidad: </strong>" + e.feature.j['Identificador unico de la localidad']+ "<br>";
  actualUTAMInfo += "<strong>Localidad: </strong>" + e.feature.j['Nombre de la localidad'] + "<br>";

  // update the label
  document.getElementById("data-label").textContent = "Siniestros del tipo y en la fecha seleccionada";
  document.getElementById("data-value").textContent = e.feature
    .getProperty("bicycle_data")
    .toLocaleString();
  document.getElementById("utam-info").innerHTML = actualUTAMInfo;  
  document.getElementById("tooltip").style.display = "block";
}

function mouseOutOfRegion(e) {
  e.feature.setProperty("state", "normal");
  actualUTAMInfo = "";
}
