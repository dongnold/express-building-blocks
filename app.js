var express = require('express');
var app = express();

app.get("/", function(request, response) {
	response.json("OK");
	
});


app.listen(3000);