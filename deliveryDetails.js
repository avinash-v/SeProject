var mongoc = require("mongodb").MongoClient;
var mongoUrl ="mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";

var getDeliveryDetails = function(req, res, next) {
	console.log("Delivery Details Get");
	var dg_id = req.body.dg_id;
	var responseData = {};
	res.setHeader("Content-Type", "application/json");
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
				console.log("Delivery Name : ", dbResult.name_dg);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Delivery with Id ${dg_id} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var getNDeliveryDetails = function(req, res, next) {
	console.log("Delivery Details Get Many :" + req.body.n);
	var dg_id = req.body.dg_id;
	var n = req.body.n;
	var responseData = {};
	res.setHeader("Content-Type", "application/json");
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"dg_id": dg_id
		};
		dbo.collection("DeliveryGuy").find(query).limit(n, function(err, dbResult){
			if(err) throw err
			responseData[dbResult];
			if(dbResult){
				console.log("Delivery Name : ", dbResult.name_dg);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Delivery with Id ${dg_id} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var addDeliveryDetails = function(req, res, next) {
	console.log("Delivery's Details Add");
	res.setHeader("Content-Type", "application/json");
	var responseData = {}
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = req.body;
		dbo.collection("DeliveryGuy").insertOne(query, function(err, dbResult){
			if(err) {
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Deliver Details Added");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			console.log("----------\n");
		});
	});
}

var deleteDeliveryDetails = function(req, res, next) {
	console.log("Delivery's Details DELETE");
	res.setHeader("Content-Type", "application/json");
	var responseData = {}
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = req.body;
		dbo.collection("DeliveryGuy").remove(query, function(err, dbResult){
			if(err) {
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Deliver Details Deleted");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			console.log("----------\n");
		});
	});
}

var getCurrentDeliveryDetails = function(req, res){
	console.log("Delivery's Details Get Current");
	res.setHeader("Content-Type", "application/json");
	responseData = {"location": 1, "ok": 1}
	res.send(JSON.stringify(responseData));
}

var updateLocation = function(req, res){
	console.log("Delivery's Details Update Location");
	console.log(req.body);
	res.setHeader("Content-Type", "application/json");
	var lat = req.body.lat;
	var lon = req.body.lan;
	var dg_id = req.body.dg_id;
	var responseData = {}
	mongoc.connect(mongoUrl, function(err, db) {
		if(err){
			responseData["ok"] = 0;
			res.send(JSON.stringify(responseData));
			throw err;
		}
		var dbo = db.db("piggy");
		var query = {
			'dg_id': dg_id,
		}
		var newValues = {
			$set:  {
								'latitude': lat,
								'longitude': lon
			}
		}
		dbo.collection('DeliveryGuy').updateOne(query, newValues, { upsert: true },  function(err, result) {
			if(err){
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Updated current delivery location");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			db.close();
			console.log("----------\n");
		});
	});
}



module.exports = {
	getDeliveryDetails: getDeliveryDetails,
	getNDeliveryDetails: getNDeliveryDetails,
	addDeliveryDetails: addDeliveryDetails,
	deleteDeliveryDetails: deleteDeliveryDetails,
	getCurrentDeliveryDetails: getCurrentDeliveryDetails,
	updateLocation: updateLocation
}
