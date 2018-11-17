var mongoc = require("mongodb").MongoClient;
var mongoUrl ="mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";

var getDishDetails = function(req, res, next) {
	console.log("Dish Details Get");
	var dish_name = req.body.dish_name;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"dish_name": dish_name
		};
		dbo.collection("DishTable").findOne(query, function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Dish Name : ", dbResult.dish_name);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Dish with Name ${dish_name} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}


//  Search wrt to cook name
var getNDishDetails = function(req, res, next) {
	console.log("Dishes Details Get Many:" + req.body.n);
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
		dbo.collection("DishTable").find(query).toArray(function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Dish Name : ", dbResult.dish_name);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Dishes with name ${dish_name} not found`);
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

// for price suggestion
var addIngredientDetails = function(req, res, next) {
    console.log("Ingredients Details Add");
    var dish_name = req.body.dish_name;
    res.setHeader('Content-Type', 'application/json');
    responseData = {}
    mongoc.connect(mongoUrl, function(err, db) {
        if(err) throw err;
        var dbo = db.db("piggy");
        var query = req.body;
        dbo.collection("Ingredients").insertOne(query, function(err, dbResult){
            if(err) {
                responseData["ok"] = 0;
                res.send(JSON.stringify(responseData));
                throw err;
            }
            console.log("Ingredient Details Added");
            responseData["ok"] = 1;
            res.send(JSON.stringify(responseData));
            console.log("----------\n");
        });
    });
}



var getNCuisineDetails = function(req, res, next) {
	console.log("Cusine Details Get Many:" + req.body.n);
	var cuisine = req.body.cuisine;
	var n = req.body.n;
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			"cuisine": cuisine
		};
		dbo.collection("DishTable").find(query).toArray(function(err, dbResult){
			if(err) throw err;
			responseData["data"] = dbResult;
			if(dbResult){
				console.log("Cuisine Name : ", dbResult.cuisine);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else {
				console.log(`Cusines with name ${cuisine} not found`);
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
		dbo.collection("DishTable").insertOne(query, function(err, dbResult){
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
	addDishDetails: addDishDetails,
	getNCuisineDetails:getNCuisineDetails,
	addIngredientDetails:addIngredientDetails
}
