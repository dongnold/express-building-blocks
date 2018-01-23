var request =  require('supertest');
var app = require('./app');
var redis = require('redis');
var client = redis.createClient();

client.select(process.env.NODE_ENV.length);
client.flushdb();



describe("Requests to the root path", function() {
	it("Returns a 200 status code", function(done) {
		request(app)
		.get("/")
		.expect(200, done)
	});
	
	it("Returns HTML format", function(done) {
		request(app)
		.get("/")
		.expect("Content-Type", /html/, done);
	});
	
	
	it("Returns index file with Cities " , function(done) {
		request(app)
		.get("/")
		.expect(/Cities/, done);
	});
}); 


describe("Listing cities on /cities", function() {
	it("Returns a 200 status code", function(done) {
		request(app)
		.get("/cities")
		.expect(200,done)
		
	});
	
	it("Returns JSON content-type", function(done) {
		request(app)
		.get("/cities")
		.expect("Content-Type",/json/,done)
	});
	
	it("Returns initial cities", function(done) {
		request(app)
		.get("/cities")
		.expect(JSON.stringify([]),done)
		
	});
}); 


describe("Creating new cities", function() {
	it("Returns a 201 status code", function(done) {
		request(app)
		.post("/cities")
		.send("name=Springfield&description=where+the+simpsons+live")
		.expect(201,done);
		
	});
	
	
	it("Returns the city name", function(done) {
		request(app)
		.post("/cities")
		.send("name=Springfield&description=where+the+simpsons+live")
		.expect(/Springfield/,done);

	});	
	
	
	it("Validates city name and description", function(done) {
		request(app)
		.post("/cities")
		.send("name=&description=")
		.expect(400,done)
	});
	
});

describe("Delete cities", function() {
	
	before(function(){
		client.hset("cities" , "CityToDelete" , "test city to delete");
	});
	
	after(function(){
		client.flushdb();
	});
	
	it("Returns a 204 status code", function(done) {
		request(app)
		.delete("/cities/CityToDelete")
		.expect(204,done)
		
	});
	
});


describe("Show city description", function() {
	
	before(function(){
		client.hset("cities" , "Banana" , "A tasty city ");
	});
	
	after(function(){
		client.flushdb();
	});
	
	it("Returns a 200 status code", function(done) {
		request(app)
		.get("/cities/Banana")
		.expect(200,done);
		
	});
	
	
	it("Returns HTML format ", function(done) {
		request(app)
		.get("/cities/Banana")
		.expect("Content-Type", /html/, done);	
		
	});
	
	
	it("Returns description for given city ", function(done) {
		request(app)
		.get("/cities/Banana")
		.expect(/A tasty city/,done);	
		
	});
});