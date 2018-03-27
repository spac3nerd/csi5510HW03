tokenKeystore =  function() {
	var crypto = require("crypto");
	var tokens = {};
	
	function generateToken() {
		return crypto.randomBytes(64).toString("hex");
	};

	return {
		
		addToken: function(email) {
			var id = generateToken();
			tokens[id] = email;
			return id;
		},
		getUser: function(id) {
			return tokens[id];
		},
		removeToken: function(id) {
			delete tokens[id];
		},
		verifyToken: function(token, email) {
			if (arguments.length === 1) {
				if (tokens[token]) {
					return true;
				}
				else {
					return false;
				}
			}
			else if (arguments.length === 2) {
				if (tokens[token] === email) {
					return true;
				}
				else {
					return false;
				}
			}
		}
	};
};

module.exports = tokenKeystore;
