function webServer(settings) {
	var bodyParser = require("body-parser");
	var express = require("express");
	var http = require("http");
	var log4js = require("log4js");
    log4js.configure({ // configure to use all types in different files.

		appenders: {
			out: {
				type: "stdout"
			},
			file: {
				type: "file",
				filename: settings.logFile,
				backups: 10
			}
		},
		categories: {
			default: {
				appenders: ["file"],
				level: 'info'
			}
		}

    });
    var infoLogger = log4js.getLogger();
	
	//bring in routes
	var userRoutes = require("../routes/user.js");
    var projectsRoutes = require("../routes/projects.js");
    var authMiddleware = require("../routes/authMiddleware.js");

	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(express.static(settings.resources)); //tell express where to look for static resources
	
	//request for the home page
	app.get("/", function(req, res) {
		res.sendFile(settings.indexPage);
	});
	
	
	//tell Express to use these routes
	app.use(authMiddleware.router);
	app.use(userRoutes);
	app.use(projectsRoutes);

	authMiddleware.updateValidRoutes([userRoutes, projectsRoutes]);


	//for all other requests that don't match
    app.get('*', function(req, res){
        res.sendFile(settings.badPath);
    });
	
	//start the server
	var httpServer = http.createServer(app).listen(settings.httpPort);
	console.log("HTTP Server listening on port " + settings.httpPort);
	infoLogger.info("HTTP Server listening on port " + settings.httpPort);
}

module.exports = webServer;
