var express = require('express');
var app = express();

app.get("/", function(request, response) {
	//throw "Hey Error" ;
	response.json("OK");
	
});


app.get("/cities", function(request, response) {
	response.json("OK");
});

module.exports  = app ;