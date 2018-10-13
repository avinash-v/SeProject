var mongoc = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";


/* Incoming Customer Details */
var userValidation = function(req, res, next){

	console.log("\n----------\nValidating User");
	console.log(req.body);
	res.setHeader('Content-Type', 'application/json');

	mongoc.connect(mongoUrl, { useNewUrlParser: true}, function(err, db) {
		if(err) throw err;
		var dbo = db.db("piggy");
		var query = {
			userName: req.body.userName,
		}
		dbo.collection("users").findOne(query, function(err, result){
			if(err) throw err;
			db.close();
			if(result && result.password === req.body.password){
				console.log("password :", result.password);
				res.send(JSON.stringify({ok: 1}));
			} else{
				console.log("wrong password");
				res.send(JSON.stringify({ok: 0}));
			}
			console.log("----------\n");
		});
	});
}

var userRegistration = function(req, res, next){

	console.log("\n----------\nRegistering User");
	console.log(req.body);

	res.setHeader('Content-Type', 'application/json');
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
					res.send(JSON.stringify({ok: 0}));
				} else{
					dbo.collection("users").insertOne(req.body)
						.then(()=>{
							console.log("New User "+req.body.userName+" regsitered")
							res.send(JSON.stringify({ok: 1}));
						})
						.catch((err)=>{
							console.log("Error :"+err);
							res.send(JSON.stringify({ok: 0}));
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
