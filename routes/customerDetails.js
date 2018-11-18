var mongoc = require("mongodb").MongoClient;
var mongoUrl  ="mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";

var getCustomerDetails = function(req, res, next) {
	console.log("Customer's Details Get");
	var custId = req.body.custId;
	var responseData = {};
	res.setHeader("Content-Type", "application/json");
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"custId": custId
		};
		dbo.collection("Customer").findOne(query, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult
			if(dbResult){
				console.log("Customer Name : ", dbResult.custName);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Customer with Id ${custId} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var getNCustomerDetails = function(req, res, next) {
	console.log("Customer's Details Get Many:" + req.body.n);
	var custId = req.body.custId;
	var n = req.body.n;
	var responseData = {};
	res.setHeader("Content-Type", "application/json");
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"custId": custId
		};
		dbo.collection("Customer").find(query).limit(n, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult
			if(dbResult){
				console.log("Customer Name : ", dbResult.custName);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Customer with Id ${custId} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var addCustomerDetails = function(req, res, next) {
	console.log("Customer's Details Add");
	res.setHeader("Content-Type", "application/json");
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = req.body;
		dbo.collection("Customer").insertOne(query, function(err, dbResult){
			if(err) {
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Customer Details Added");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			console.log("----------\n");
		});
	});
}

module.exports = {
	getCustomerDetails: getCustomerDetails,
	getNCustomerDetails: getNCustomerDetails,
	addCustomerDetails: addCustomerDetails
}
