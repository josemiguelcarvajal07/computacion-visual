var map;
var minVal = Number.MAX_VALUE;
var maxVal = -Number.MAX_VALUE;
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
  map.data.setStyle(styleFeature);
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

function styleFeature(feature) {
  var low = [5, 69, 54];
  var high = [151, 83, 34];

  // delta represents where the value sits between the min and max
  var delta =
    (feature.getProperty("bicycle_data") - minVal) / (maxVal - minVal);

  var color = [];
  for (var i = 0; i < 3; i++) {
    // calculate an integer color based on the delta
    color[i] = (high[i] - low[i]) * delta + low[i];
  }

  // determine whether to show this shape or not
  var showRow = true;
  if (
    feature.getProperty("bicycle_data") == null ||
    isNaN(feature.getProperty("bicycle_data"))
  ) {
    showRow = false;
  }

  var outlineWeight = 0.5,
    zIndex = 1;
  if (feature.getProperty("state") === "hover") {
    outlineWeight = zIndex = 2;
  }

  return {
    strokeWeight: outlineWeight,
    strokeColor: "#fff",
    zIndex: zIndex,
    fillColor: "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)",
    fillOpacity: 0.75,
    visible: showRow,
  };
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
              if (minVal >= datas[6]){
                minVal = datas[6]
              }
              if(maxVal <= datas[6]){
                maxVal = datas[6]
              }
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
