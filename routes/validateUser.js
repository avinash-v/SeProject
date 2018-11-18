var mongoc = require("mongodb").MongoClient;
var mongoUrl ="mongodb://ec2-54-89-140-181.compute-1.amazonaws.com";


/* Incoming Customer Details */
var userValidation = function(req, res, next){
	console.log("\n----------\nValidating User");
	console.log(req.body);
	res.setHeader('Content-Type', 'application/json');
	responseData = {};
	mongoc.connect(mongoUrl, { useNewUrlParser: true}, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			userName: req.body.userName,
		}
		dbo.collection("users").findOne(query, function(err, result){
			if(err) throw err;
			db.close();
			responseData["data"] = "";
			if(result && result.password === req.body.password){
				console.log("password :", result.password);
				responseData["ok"] = 1;
				res.send(JSON.stringify(responseData));
			} else{
				console.log("wrong password");
				responseData["ok"] = 0;
				res.send(JSON.stringify(responseData));
			}
			console.log("----------\n");
		});
	});
}

var userRegistration = function(req, res, next){

	console.log("\n----------\nRegistering User");
	console.log(req.body);

	res.setHeader('Content-Type', 'application/json');
	responseData = {}
	mongoc.connect(mongoUrl, { useNewUrlParser: true}, function(err, db) {
			if(err) throw err;
			var dbo = db.db("piggy");
			var query = {
				userName: req.body.userName,
			}
			dbo.collection("users").findOne(query, function(err, result){
				if(err) throw err;
				if(result){
					console.log("user already present");
					responseData['ok'] = 0;
					res.send(JSON.stringify(responseData));
				} else{
					dbo.collection("users").insertOne(req.body)
						.then(()=>{
							console.log("New User "+req.body.userName+" regsitered");
							responseData["ok"] = 1;
							res.send(JSON.stringify(responseData));
						})
						.catch((err)=>{
							console.log("Error :"+err);
							responseData["ok"] = 0;
							res.send(JSON.stringify(responseData));
						});
				}
				db.close();
				console.log("----------\n");
			});
		});
}

module.exports = {
	userValidation: userValidation,
	userRegistration: userRegistration
}
