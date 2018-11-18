var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";


var getNReviews = function(req, res, next) {
	console.log("Get n reviews:" + req.body.n);
	var cookId = req.body.cookId;
	var n = req.body.n;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cookId": cookId
		};
		console.log(cookId)
		dbo.collection("ReviewsTable").find(query).toArray(function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				responseData["ok"] = 1;
				console.log(dbResult)
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Cook with Id ${cookId} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var addReview = function(req, res, next) {
	console.log("Adding reviews");
	res.setHeader("Content-Type", "application/json");
	responseData = {}
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = req.body;
		dbo.collection("ReviewsTable").insertOne(query, function(err, dbResult){
			if(err) {
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Cook review Added");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			console.log("----------\n");
		});
	});
}

module.exports = {
    getNReviews:getNReviews,
    addReview:addReview
}
