var validator = require("../validator/token.js");
var tokenKeystore = new validator();

function getUserEmailByToken(token){
	return tokenKeystore.getUser(token);
}
function addUser(email) {
	return tokenKeystore.addToken(email);
};

function checkSession(token) {
	return tokenKeystore.verifyToken(token);
};

function endSession(token) {
	tokenKeystore.removeToken(token);
};


module.exports = {
	addUser: addUser,
	checkSession: checkSession,
	endSession: endSession,
    getUserEmailByToken: getUserEmailByToken
};
