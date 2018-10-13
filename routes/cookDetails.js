var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";

var getCookDetails = function(req, res, next) {
	console.log("Cook's Details Get");
	var cookId = req.body.cookId;
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cookId": cookId
		};
		dbo.collection("cooks").findOne(query, function(err, dbResult){
			if(err) throw err;
			if(dbResult){
				console.log("Cook Name : ", dbResult.cookName);
				res.send(dbResult);
			} else {
				console.log(`Cook with Id ${cookId} not found`);
			}
		});
	});
}

var getNCookDetails = function(req, res, next) {
	console.log("Cook's Details Get :" + req.body.n);
	var cookId = req.body.cookId;
	var n = req.body.n;
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cookId": cookId
		};
		dbo.collection("cooks").find(query).limit(n, function(err, dbResult){
			if(err) throw err;
			if(dbResult){
				console.log("Cook Name : ", dbResult.cookName);
				res.send(dbResult);
			} else {
				console.log(`Cook with Id ${cookId} not found`);
			}
		});
	});
}

module.exports = {
	getCookDetails: getCookDetails,
	getNCookDetails: getNCookDetails,
}
