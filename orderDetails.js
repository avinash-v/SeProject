var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";
//

// Mostly not using anywhere
var getOrderDetails = function(req, res, next) {
	console.log("Order's Details Get");
	var cookId = req.body.cookId;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cookId": cookId
		};
		dbo.collection("OrdersTable").findOne(query, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Order Name : ", dbResult.orderName);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Order with Id ${orderId} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

// For cook to see all the orders she has got
var getNOrderDetails = function(req, res, next) {
	var cookId = req.body.cookId;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cookId": cookId
		};
		dbo.collection("OrdersTable").find(query).toArray(function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Cook Name : ", dbResult.cooksName);
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


/* Inserts a row in the OrdersTable table and assigns a delivery guy for that order */
var addOrderDetails = function(req, res, next) {
	console.log("Adding to Order's table");
	res.setHeader("Content-Type", "application/json");
	responseData = {}
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query1 = req.body;
		dbo.collection("OrdersTable").insertOne(query1, function(err, dbResult){
			if(err) {
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
				throw err;
			}
			console.log("Order Details Added");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
			console.log("-----------------------------\n");
		});//end of query1
		//Assign the delivery guy to the order
			var query2 = {
				"onDuty": 1
			};
			var projection2 = {
				"dg_id":1,
				"name_dg":0,
				"phone_dg":0,
				"onDuty":0,
				"Account_no":0,
				"notifications":0,
				"latitude":0,
				"longitude":0,
				"gender":0,
				"addr_details":0,
				"rating_dg":0,
				"dl_no":0,
				"nod":0,
				"dt":0,
				"total_amt":0,
				"amt_today":0,
				"_id":0,
			};
			console.log("Checking for on duty delivery guys ")
			var onDutyDeliveryGuys = '';
			console.log("avi")
			dbo.collection("DeliveryGuy").find(query2, projection2).toArray(function(err, dbResult){
				console.log("Inside deli")
				if(err) throw err;
				onDutyDeliveryGuys = dbResult;
				if(dbResult){
					console.log("Found delivery guys on duty");
					responseData["ok"] = 1;
					res.send(JSON.stringify(responseData));
				}
				else {
					console.log("No delivery guys on duty");
					responseData["ok"] = 0;
					res.send(JSON.stringify(responseData));
				}
	});// end of query2


	var query3 = {
		"del_status": 1
	};
	var projection3 = {
		"totalItemsCount":0,
		"cooksName":0,
		"cust_name":0,
		"dishList":0,
		"dg_assigned":0,
		"cookId":0,
		"custId":0,
		"dg_id":1,
		"del_status":0,
		"dish_list":0,
		"total_amt":0,
		"_id":0
	};
	console.log("Searching the current order details")
	dbo.collection("OrdersTable").find(query3,projection3).toArray(function(err, dbResult){
		if(err) throw err;
		freeDeliveryGuys = dbResult;
		if(dbResult){
			console.log("Found the current order details");
			responseData["ok"] = 1;
			res.send(JSON.stringify(responseData));
		}
		else {
			console.log("current order details not found");
			responseData["ok"] = 0;
			res.send(JSON.stringify(responseData));
		}
});// end of query3

// Assuming onDutyDeliveryGuys and freeDeliveryGuys are arrays, get intersection of those two and pick the first one
// from https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
var assigned_dg_id = onDutyDeliveryGuys.filter(value => -1 !== freeDeliveryGuys.indexOf(value))[0];
var update_dg_id = {
		$set: {"dg_id":assigned_dg_id}
}
var query4 = query1



// Update the order table with this dg_id
console.log("Updating the OrdersTable table with delivery guy")
dbo.collection("OrdersTable").updateOne(query4, update_dg_id, { upsert: true }).toArray(function(err, dbResult){
	if(err) throw err;
	if(dbResult){
		console.log("Updated order with delivery guy");
		responseData["ok"] = 1;
		res.send(JSON.stringify(responseData));
	}
	else {
		console.log("updating order table with delivery guy failed");
		responseData["ok"] = 0;
		res.send(JSON.stringify(responseData));
	}
});// end of query4


var query5 = {"cookId":cookId};
// ADD 1 to notifications column ofcook
console.log("Pushing notifications to cook")
dbo.collection("Cook").update(query5,{$inc:{notifications:1}}).toArray(function(err, dbResult){
	if(err) throw err;
	if(dbResult){
		console.log("Sent notification to the cook");
		responseData["ok"] = 1;
		res.send(JSON.stringify(responseData));
	}
	else {
		console.log("Could not send notification to the cook");
		responseData["ok"] = 0;
		res.send(JSON.stringify(responseData));
	}
});// end of query5

var query6 = {"dg_id":assigned_dg_id};
// ADD 1 to notifications column of deliveryGuy
console.log("Pushing notifications to delivery guy")
dbo.collection("DeliveryGuy").update(query6,{$inc:{notifications:1}}).toArray(function(err, dbResult){
	if(err) throw err;
	if(dbResult){
		console.log("Sent notification to the delivery guy");
		responseData["ok"] = 1;
		res.send(JSON.stringify(responseData));
	}
	else {
		console.log("Could not send notification to the delivery guy");
		responseData["ok"] = 0;
		res.send(JSON.stringify(responseData));
	}
});// end of query6

console.log("Successfully assigned delivery guy to the order and sent notifications to both cook and delivery guy")
	});
}

module.exports = {
	getOrderDetails: getOrderDetails,
	getNOrderDetails: getNOrderDetails,
	addOrderDetails: addOrderDetails
}
