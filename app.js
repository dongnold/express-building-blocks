var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncoder = bodyParser.urlencoded({extended:false});

//app.get("/", function(request, response) {
	//throw "Hey Error" ;
//	response.json("OK");
	
//});


app.use(express.static("public"));


var cities = {
	"Lotopia": "lotopia descrption",
	"Caspiana": "caspiana description", 
	"Indigo" : "indigo description"
	}; 

app.get("/cities", function(request, response) {
	
	response.json(Object.keys(cities));
});


app.post("/cities", urlEncoder, function(request, response) {
	var newCity =  request.body ;
	cities[newCity.name] = newCity.description;
	response.status(201).json(newCity.name);
});

module.exports  = app ;