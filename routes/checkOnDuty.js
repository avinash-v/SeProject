var mongoc = require("mongodb").MongoClient;
var mongoUrl ="mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";


var checkDeliveryGuyOnDuty = function(req, res, next) {
	console.log("Checking if delivery guy is on duty");
	var dg_id = req.body.dg_id;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"dg_id": dg_id
		};
		dbo.collection("DeliveryGuy").findOne(query, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Delivery guy name : ", dbResult.name_dg);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Delivery Guy with Id ${dg_id} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}


var checkCookOnDuty = function(req, res, next) {
	console.log("Checking if Cook is on duty");
	var cookId = req.body.cookId;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cookId": cookId
		};
		dbo.collection("Cook").findOne(query, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Cook's name : ", dbResult.cooksName);
				responseData["ok"] = 1;
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

module.exports = {
	checkCookOnDuty:checkCookOnDuty,
  checkDeliveryGuyOnDuty:checkDeliveryGuyOnDuty
}
