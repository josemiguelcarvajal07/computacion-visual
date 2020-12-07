var table;
var flights = [];

var pg

var flight = function(distance,from_long,from_lat,to_long,to_lat,from_country,to_country) {
  this.distance = distance
  this.from_long = from_long
  this.from_lat = from_lat
  this.to_long = to_long
  this.to_lat = to_lat
  this.from_country = from_country
  this.to_country = to_country

  this.departureX = map(this.from_long, -180,180,0,width)
  this.departureY = map(this.from_lat, -90,90,height,0)  
  this.arrivalX = map(this.to_long, -180,180,0,width)
  this.arrivalY = map(this.to_lat, -90,90,height,0)

  this.selected = function() {
    if ( dist(mouseX, mouseY, this.departureX, this.departureY) < 5 ) {
        return true
    } else {
        return false
    }
  }

  this.drawBackgroundAirport = function() {
    pg.ellipse(this.departureX, this.departureY, 5,5)
    pg.ellipse(this.arrivalX, this.arrivalY, 5,5)
  }
	
  this.drawSelectedAirport = function() {
    if ( this.selected() ) {
      fill(235, 56, 12,25)
      ellipse(this.departureX, this.departureY, 5,5)
      ellipse(this.arrivalX, this.arrivalY, 5,5)
    }
  }
}

function preload() {
  table = loadTable("../taller-profundizacion/data/flights.csv","csv","header")
}

function setup() {
  var myCanvas = createCanvas(900, 500);
  myCanvas.parent("aeropuertos");
  noStroke()
  noLoop()
	
  var rows = table.getRows()
  for ( var i in rows ) {
    var from_airport = rows[i].getString("from_airport")
    var from_city = rows[i].getString("from_city")
    var from_country = rows[i].getString("from_country")
    var from_long = rows[i].getNum("from_long")
    var from_lat = rows[i].getNum("from_lat")
    var to_airport = rows[i].getString("to_airport")
    var to_city = rows[i].getString("to_city")
    var to_country = rows[i].getString("to_country")
    var to_long = rows[i].getNum("to_long")
    var to_lat = rows[i].getNum("to_lat")
    var airline = rows[i].getString("airline")
    var airline_country = rows[i].getString("airline_country")
    var distance = rows[i].getNum("distance")

    var this_flight = new flight(distance, from_long, from_lat, to_long, to_lat, from_country, to_country)
    flights.push(this_flight)
  }

  pg = createGraphics(900,500);
  pg.background(100, 145, 217);
  pg.noStroke();
  pg.fill(255,255,255,30);
  for ( var i in flights ) {
    flights[i].drawBackgroundAirport()
	}
}

function draw() {
  background(100, 145, 217)
  image(pg,0,0)
  for ( var i in flights ) {
    flights[i].drawSelectedAirport()
  }
}

function mouseMoved() {
  redraw()
}
