var mysql = require("mysql");
var db = undefined;

function connect(settings) {
	this.db = mysql.createConnection(settings);
	
	this.db.connect(function(err)
	{
		if (!err) {
			console.log("Database at " + settings.host + " connected on port " + settings.port);
		} else {
			console.log("Error connecting to database");
		}
	});
	
};

function getDB () {
	return this.db;
};

module.exports = {
	db: db, 
	connect: connect
};
