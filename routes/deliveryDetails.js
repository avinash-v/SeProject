var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";

var getDeliveryDetails = function(req, res, next) {
	console.log("Delivery's Details Get");
	var deliveryId = req.body.deliveryId;
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"deliveryId": deliveryId
		};
		dbo.collection("deliveries").findOne(query, function(err, dbResult){
			if(err) throw err;
			if(dbResult){
				console.log("Delivery Name : ", dbResult.deliveryName);
				res.send(dbResult);
			} else {
				console.log(`Delivery with Id ${deliveryId} not found`);
			}
		});
	});
}

var getNDeliveryDetails = function(req, res, next) {
	console.log("Delivery's Details Get :" + req.body.n);
	var deliveryId = req.body.deliveryId;
	var n = req.body.n;
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"deliveryId": deliveryId
		};
		dbo.collection("deliveries").find(query).limit(n, function(err, dbResult){
			if(err) throw err;
			if(dbResult){
				console.log("Delivery Name : ", dbResult.deliveryName);
				res.send(dbResult);
			} else {
				console.log(`Delivery with Id ${deliveryId} not found`);
			}
		});
	});
}

module.exports = {
	getDeliveryDetails: getDeliveryDetails,
	getNDeliveryDetails: getNDeliveryDetails,
}
