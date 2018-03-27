var bcrypt = require("bcrypt");
var salt = "$2a$10$2pue8UkToY/dqotJLO3ivO";
var dbInstance = require("./dbConnect");
var db = dbInstance.db;

function login(credentials, callback) {
	var email = credentials.email;
	var password = credentials.password;
	var query;
	if(global.TESTING_MODE){
		callback({success: true})
	} else {
		query = 'SELECT * FROM user_table WHERE email = ' + db.escape(email);
        db.query(query, function (err, rows) {
            if (!err) {
                if (rows.length >= 1) {
                    if (bcrypt.hashSync(password, salt) === rows[0].password) {
                        callback({success: true});
                    }
                    else {
                        callback({
                            success: false,
                            message: "Invalid password"
                        });
                    }
                }
                else {
                    callback({
                        success: false,
                        message: "Invalid email"
                    });
                }
            }
            else {
                throw err;
            }
        });
    }
}

function getAccountInfo(email, callback) {
	query = 'SELECT * FROM user_table WHERE email = ' + db.escape(email);
	db.query(query, function (err, rows) {
		if (!err) {
			if (rows.length >= 1) {
                callback({
					success: true,
					data: {
						email: rows[0].email,
						address: rows[0].address,
						zip: rows[0].zip
					}
                });
			}
			else {
				callback({
					success: false,
					message: "Invalid email"
				});
			}
		}
		else {
			throw err;
		}
	});
}
	
function register(credentials, callback) {
	var email = credentials.email;
	var password = credentials.password;
	var address = credentials.address;
	var zip = credentials.zip;
	var query = 'SELECT * FROM user_table WHERE email = ' + db.escape(email);
	db.query(query, function(err, rows) {
		if (!err) {
			if (rows.length >= 1) {
				callback({
					success: false,
					message: "Email already exists!"
				});
			}
			else {
				var newHash = bcrypt.hashSync(password, salt);
				query = 'INSERT INTO user_table (email, password, address, zip) VALUES (' + db.escape(email) + ',' + db.escape(newHash) + ',' + db.escape(address) +  ',' + db.escape(zip) + ')';
				db.query(query, function (err, rows) {
					if (!err) {
						callback({success: true});
					} else {
						throw err;
					}
				});
			}
		}
		else {
			throw err;
		}
	});
}


module.exports = {login, register, getAccountInfo};
