let app = require("express")();
let fs = require('fs');
let bodyParser = require('body-parser')
var DEBUG = true;
let PORT = 8080;	 
app.get("/rsids/:number", (req, res)=>{
	DEBUG && console.log("Page: /rsids/:number");
	let parsedDna = [];
	// fs.readFile("./data/DNA.txt")
	let lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('./data/DNA.txt')
	});
	var counter = 0;
	lineReader.on('line', function (line) { 
		let splittedLine = line.split("	");
		parsedDna.push({
			rsid: splittedLine[0],
			chromosome: splittedLine[1],
			position:splittedLine[2],
			allele1:splittedLine[3],
			allele2:splittedLine[4]
		});  
	});
	lineReader.on('close', function (line) { 
		console.log("Parsing is completed!");
		let dnaPackage = parsedDna;
		dnaPackage.length=req.params.number;
		res.send(dnaPackage);
		lineReader.close();

	});
});

app.get("/", (req,res)=>{
	DEBUG && console.log("Index page has been requested!");
	fs.readFile("./public/index.html", (error, page)=>{
		error && (()=>{
			console.log("Error has been detected in the main route! No index.html pages");
			res.status(404).send("Server under maintain!");
		})();
		res.write(page);
		res.status(200).end();
	});
})
app.listen(PORT, ()=>{
	console.log("Server is running on port:", PORT)
})

