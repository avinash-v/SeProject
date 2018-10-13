var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";

var getCustomerDetails = function(req, res, next) {
	console.log("Customer's Details Get");
	var customerId = req.body.customerId;
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"customerId": customerId
		};
		dbo.collection("customers").findOne(query, function(err, dbResult){
			if(err) throw err;
			if(dbResult){
				console.log("Customer Name : ", dbResult.customerName);
				res.send(dbResult);
			} else {
				console.log(`Customer with Id ${customerId} not found`);
			}
		});
	});
}

var getNCustomerDetails = function(req, res, next) {
	console.log("Customer's Details Get :" + req.body.n);
	var customerId = req.body.customerId;
	var n = req.body.n;
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"customerId": customerId
		};
		dbo.collection("customers").find(query).limit(n, function(err, dbResult){
			if(err) throw err;
			if(dbResult){
				console.log("Customer Name : ", dbResult.customerName);
				res.send(dbResult);
			} else {
				console.log(`Customer with Id ${customerId} not found`);
			}
		});
	});
}

module.exports = {
	getCustomerDetails: getCustomerDetails,
	getNCustomerDetails: getNCustomerDetails,
}
