var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";

var getDishDetails = function(req, res, next) {
	console.log("Dish Details Get");
	var dishName = req.body.dishName;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"dishName": dishName
		};
		dbo.collection("dishes").findOne(query, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Dish Name : ", dbResult.dishName);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Dish with Name ${dishName} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var getNDishDetails = function(req, res, next) {
	console.log("Dishes Details Get Many:" + req.body.n);
	var dishName = req.body.dishName;
	var n = req.body.n;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"dishName": dishName
		};
		dbo.collection("cooks").find(query).limit(n, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Dish Name : ", dbResult.dishName);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Dishes with name ${dishName} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var getNCusineDetails = function(req, res, next) {
	console.log("Cusine Details Get Many:" + req.body.n);
	var cusineName = req.body.cusineName;
	var n = req.body.n;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cusineName": cusineName
		};
		dbo.collection("cooks").find(query).limit(n, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Cusine Name : ", dbResult.cusineName);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Cusines with name ${cusineName} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}



var addDishDetails = function(req, res, next) {
	console.log("Dish Details Add");
	res.setHeader("Content-Type", "application/json");
	responseData = {}
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = req.body;
		dbo.collection("cooks").insertOne(query, function(err, dbResult){
			if(err) {
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Dish Details Added");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			console.log("----------\n");
		});
	});
}



module.exports = {
	getDishDetails: getDishDetails,
	getNDishDetails: getNDishDetails,
	addDishDetails: addDishDetails
}
