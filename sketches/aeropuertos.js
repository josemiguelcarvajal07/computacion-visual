var table;
var flights = [];

var pg;

var flight = function (
  from_airport,
  from_city,
  from_country,
  from_long,
  from_lat,
  to_long,
  to_lat) {
  this.from_airport = from_airport;
  this.from_city = from_city;
  this.from_country = from_country;
  this.from_long = from_long;
  this.from_lat = from_lat;
  this.to_long = to_long;
  this.to_lat = to_lat;

  this.departureX = map(this.from_long, -180, 180, 0, width);
  this.departureY = map(this.from_lat, -90, 90, height, 0);
  this.arrivalX = map(this.to_long, -180, 180, 0, width);
  this.arrivalY = map(this.to_lat, -90, 90, height, 0);

  this.selected = function () {
    if (dist(mouseX, mouseY, this.departureX, this.departureY) < 1.5) {
      return true;
    } else {
      return false;
    }
  };

  this.drawBackgroundAirport = function () {
    pg.ellipse(this.departureX, this.departureY, 5, 5);
    pg.ellipse(this.arrivalX, this.arrivalY, 5, 5);
  };

  this.drawSelectedAirport = function () {
    if (this.selected()) {
      fill(235, 56, 12, 255);
      ellipse(this.departureX, this.departureY, 5, 5);
      ellipse(this.arrivalX, this.arrivalY, 5, 5);
    }
  };

  this.printInfo = function () {
    if (this.selected()) {
      fill(255, 255, 255, 255);
      textSize(30);
      text(
        `${this.from_airport}, ${this.from_city}, ${this.from_country}, (${this.from_lat},${this.from_long})`,
        10,
        700
      );
    }
  };
};

function preload() {
  table = loadTable(
    "../taller-profundizacion/data/flights.csv",
    "csv",
    "header"
  );
}

function setup() {
  var myCanvas = createCanvas(1348, 774);
  myCanvas.parent("aeropuertos");
  noStroke();
  noLoop();

  var rows = table.getRows();
  for (var i in rows) {
    var from_airport = rows[i].getString("from_airport");
    var from_city = rows[i].getString("from_city");
    var from_country = rows[i].getString("from_country");
    var from_long = rows[i].getNum("from_long");
    var from_lat = rows[i].getNum("from_lat");
    var to_long = rows[i].getNum("to_long");
    var to_lat = rows[i].getNum("to_lat");

    var this_flight = new flight(
      from_airport,
      from_city,
      from_country,
      from_long,
      from_lat,
      to_long,
      to_lat
    );
    flights.push(this_flight);
  }

  pg = createGraphics(1348, 774);
  pg.background(100, 145, 217);
  pg.noStroke();
  pg.fill(255, 255, 255, 30);
  for (var i in flights) {
    flights[i].drawBackgroundAirport();
  }
}

function draw() {
  background(100, 145, 217);
  image(pg, 0, 0);
  for (var i in flights) {
    flights[i].drawSelectedAirport();
    flights[i].printInfo();
  }
}

function mouseMoved() {
  redraw();
}
