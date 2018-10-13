var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";


/* Incoming Customer Details */
var newOrder = function(req, res, next){
	console.log("New Order Incoming");

	var data = req.body;
	var alliswell = insertDB(data);

	res.sendStatus(200);
};

function insertDB(data){
	mongoc.connect(mongoUrl, function(err, db){
		if(err) throw err;
		var dbo = db.db("piggy");
		dbo.collection("orders").insertOne(data, function(err, res){
			if(err) throw err;
			console.log("Order Inserted into DB");
			db.close();
		});
	});
}


function findCook(cookName){
		mongoc.connect(mongoUrl, function(err, db){
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {"cookName": cookName};
		dbo.collection("cooks").findAll(query, function(err, res){
			if(err) throw err;
			console.log("Order Inserted into DB");
			db.close();
		});
	});
}

module.exports = newOrder;
