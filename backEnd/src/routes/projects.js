var express = require("express");
var router = express.Router();
var log4js = require("log4js");
var infoLogger = log4js.getLogger();

router.post("/projects/getProjects", function(req, res) {
    var data = [
        {
            name: "Sorin Badila",
            project: "CSI5510",
            description: "ADV Web Development"
        },
        {
            name: "Nicholas Rafalski",
            project: "CSI5510",
            description: "ADV Web Development"
        },
        {
            name: "Logan Mcguire",
            project: "CSI5510",
            description: "ADV Web Development"
        },
        {
            name: "Emmanuel Musvaire",
            project: "CSI5510",
            description: "ADV Web Development"
        }
    ];
    result = {
        success: true,
        data: data
    };
    infoLogger.info("Projects Get Projects Successful - " + req.headers.authtoken);
    res.end(JSON.stringify(result), "utf-8");
});


module.exports = router;
