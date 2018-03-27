/**
 * @module hw03.utils
 * @class inputValidator
 */

hw03.utils = hw03.utils || {};
hw03.utils.inputValidator = {
	_emailRegEx: /\S+@\S+/,

	 /**
	 * Validates user login
	 * @method displayText
	 * @param {Object} data An object containing the user's email and password
	 * @return {Object} An object with a success boolean and a message string for invalid input
	 */
	validateLogin: function(data) {
		if (this._emailRegEx.test(data.email)) {
			if (data.password.length >= 1) {
				return {
					success: true
				};
			}
			else {
				return {
					success: false,
					message: "No Password Entered"
				};
			}
		}
		else {
			return {
				success: false,
				message: "Invalid E-mail"
			};
		}
	},
	/**
	 * Validates user signup
	 * @method validateSignup
	 * @param {Object} data An object containing the user's first name, last name, email, and password
	 * @return {Object} An object with a success boolean and a message string for invalid input
	 */
	//TODO- re-write this to catch everything at once
	validateSignup: function(data) {
		if (data.firstName.length === 0) {
			return {
				success: false,
				message: "Enter First Name"
			};
		}
		if (data.lastName.length === 0) {
			return {
				success: false,
				message: "Enter Last Name"
			};
		}
        if (data.address.length === 0) {
            return {
                success: false,
                message: "Enter Address"
            };
        }
        if (data.zip.length === 0) {
            return {
                success: false,
                message: "Enter Zip"
            };
        }
		if ( (!this._emailRegEx.test(data.email)) || (!this._emailRegEx.test(data.rEmail)) ) {
			return {
				success: false,
				message: "Invalid Email"
			};
		}
		if (data.email !== data.rEmail) {
			return {
				success: false,
				message: "Emails do not match"
			};
		}
		if ( (data.password.length === 0) || (data.rPassword.length === 0) ) {
			return {
				success: false,
				message: "Enter Password"
			};
		}
		if (data.password !== data.rPassword) {
			return {
				success: false,
				message: "Passwords do not match"
			};
		}
		
		return {
			success: true
		};
	},
	/**
	 * Validates user email
	 * @method validateEmail
	 * @param {String} email The Email string to be validated
	 * @return {Object} An object with a success boolean and a message string for invalid input
	 */
	validateEmail: function(email) {
		if (this._emailRegEx.test(email)) {
			return {
				success: true
			};
		}
		else {
			return {
				success: false,
				message: "Invalid Email"
			};
		}
	}
};