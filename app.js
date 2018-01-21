var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncoder = bodyParser.urlencoded({extended:false});
var redis = require('redis');

var client ;

//Create Redis connection
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	client= redis.createClient(rtg.port, rtg.hostname);

	client.auth	(rtg.auth.split(":")[1]);
} else {
    client = redis.createClient();
}



client.select((process.env.NODE_ENV || "development").length);
 
//app.get("/", function(request, response) {
	//throw "Hey Error" ;
//	response.json("OK");
	
//});


app.use(express.static("public"));


client.hset("cities",  "Lotopia", "lotopia descrption"); 
client.hset("cities",  "Caspiana", "caspiana description"); 
client.hset("cities",  "Indigo" , "indigo description" ); 


app.get("/cities", function(request, response) {
	
	
	client.hkeys("cities", function(error, names) { 
		if (error) throw error ;
		response.json(names);
	});
	
});


app.post("/cities", urlEncoder, function(request, response) {
	var newCity =  request.body ;
	client.hset("cities", newCity.name, newCity.description,function(error){
		if (error) throw error; 
		response.status(201).json(newCity.name);
	}) ;
	
});

module.exports  = app ;