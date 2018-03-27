var express = require("express");
var router = express.Router();
var userModel = require("../model/user.js");
var userAuth = require("../authentication/userAuth.js");
var log4js = require("log4js");
var infoLogger = log4js.getLogger();

router.post("/user/login", function(req, res) {
	function dbCallback(result) {
		if (result.success) {
			var newToken = userAuth.addUser(req.body.email);
			console.log(newToken);
			res.writeHead(200, {
				"Content-Type": "text/plain"
			});
            infoLogger.info("User Login Successful - " + req.body.email);
			res.end(JSON.stringify({success: result.success, authtoken: newToken}), "utf-8");
		} else {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            infoLogger.info("User Login Failed - " + req.body.email);
            res.end(JSON.stringify(result), "utf-8");
		}
	}
	userModel.login(req.body, dbCallback);
});

//check to see if a given token is valid
router.post("/user/verifyToken", function(req, res) {
	if (req.headers.authtoken) {
		if (userAuth.checkSession(req.headers.authtoken)) {
			var result = {
				success: true
			};
			res.writeHead(200, {
				"Content-Type": "text/plain"
			});
            infoLogger.info("User Token Check Successful - " + req.headers.authtoken);
			res.end(JSON.stringify(result), "utf-8");
		}
		else {
			var result = {
				success: false
			};
			res.writeHead(200, {
				"Content-Type": "text/plain"
			});
            infoLogger.info("User Token Check Failed - " + req.headers.authtoken);
			res.end(JSON.stringify(result), "utf-8");
		}
	}
	else {
		var result = {
			success: false
		};
		res.writeHead(200, {
			"Content-Type": "text/plain"
		});
        infoLogger.info("User Token Check Failed - " + req.headers.authtoken);
		res.end(JSON.stringify(result), "utf-8");
	}
});

router.post("/user/register", function(req, res) {
	function dbCallback(result) {
		if (result.success) {
			res.writeHead(200, {"Content-Type": "text/plain"});
            infoLogger.info("User Registration Successful - " + req.body.email);
			res.end(JSON.stringify(result), "utf-8");
		}
		else {
			res.writeHead(200, {"Content-Type": "text/plain"});
            infoLogger.info("User Registration Failed - " + req.body.email);
			res.end(JSON.stringify(result), "utf-8");
		}
	}
	userModel.register(req.body, dbCallback);
});

router.post("/user/getAccountInfo", function(req, res) {
	console.log(userAuth);
	var userEmail = userAuth.getUserEmailByToken(req.headers.authtoken);
    function dbCallback(result) {
        if (result.success) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            infoLogger.info("User Get Account Info Successful - " + userEmail);
            res.end(JSON.stringify(result), "utf-8");
        }
        else {
            res.writeHead(200, {"Content-Type": "text/plain"});
            infoLogger.info("User Get Account Info Failed - " + userEmail);
            res.end(JSON.stringify(result), "utf-8");
        }
    }
    userModel.getAccountInfo(userEmail, dbCallback);
});

module.exports = router;
