let app = require("express")();
let fs = require('fs');
var DEBUG = true;

app.get("/", (req, res)=>{
	DEBUG && console.log("Page /");

	let parsedDna = [];
	// fs.readFile("./data/DNA.txt")
	let lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('./data/DNA.txt')
	});


	lineReader.on('line', function (line) {
		parsedDna.push(line.split(" ")); 
	});
	lineReader.on('end', function (line) { 
		console.log("Parsing is completed!");
		lineReader.close();
	});

});