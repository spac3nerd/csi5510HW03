var express = require("express");
var router = express.Router();
var userAuth = require("../authentication/userAuth.js");

var _validRoutes = [];

router.use(function(req, res, next) {
	if (req.headers.authtoken) {
		if (userAuth.checkSession(req.headers.authtoken)) {
			next();
		}
		else {
			var result = {
				success: false,
				message: "invalid token"
			};
			res.writeHead(200, {
				"Content-Type": "text/plain"
			});
			res.end(JSON.stringify(result), "utf-8");
			
		}
	}
	else {
 		if (req.path === "/user/login" || req.path === "/user/register") {
			next();
        }
        else {
 			if (_validRoutes.indexOf(req.path) === -1){
 				next();
			}
			else {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(JSON.stringify({
                    success: false,
                    message: "missing auth token"
                }), "utf-8");
            }
		}
	}
});

function updateValidRoutes(routes) {
	_validRoutes = [];
	for (var k = 0; k < routes.length; k++) {
		for (var n = 0; n < routes[k].stack.length; n++) {
            _validRoutes.push(routes[k].stack[n].route.path);
        }
	}

	return _validRoutes;
}

module.exports = {router, updateValidRoutes};
