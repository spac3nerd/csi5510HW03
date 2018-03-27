var webServer = require("./src/server/server.js");
var dbInstance = require("./src/model/dbConnect.js");
var server;

var serverOptions = {
	baseURL: global.baseURL,
	httpPort: 8080,
	logFile: __dirname + "/log/hw03.log",
	resources: __dirname + "/public",
	indexPage: __dirname + "/public/html/index.html",
	badPath:  __dirname + "/public/html/badPath.html"
};

global.baseURL = "http://localhost" + ":" + serverOptions.httpPort;

var dbOptions = {
	host: "localhost",
	user: "root",
	password: "",
	database: "csi5510_hw03",
	port: 3306
};

function init() {
	dbInstance.connect(dbOptions);
	server = new webServer(serverOptions, dbOptions);
}

init();
