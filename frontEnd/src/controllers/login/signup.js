/**
 * @module hw03.controllers
 * @class signup
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.login = hw03.controllers.login || {};
hw03.controllers.login.signup = function(parent) {
	hw03.controllers.controller.call(this);
	this.parent = parent;
};

hw03.controllers.login.signup.prototype = {

	_signupCallback: function(message) {
		if (message.success) {
			alert("Welcome! Please Log in");
		}
		else {
			alert(message.message);
		}
	},

	_didClickSignup: function(e) {
		var data = {
			firstName: this.inputs.firstName.val(),
			lastName: this.inputs.lastName.val(),
            address: this.inputs.address.val(),
            zip: this.inputs.zip.val(),
			email: this.inputs.email.val(),
			rEmail: this.inputs.rEmail.val(),
			password: this.inputs.password.val(),
			rPassword: this.inputs.rPassword.val()
		};

		var validation = hw03.utils.inputValidator.validateSignup(data);
		if (validation.success) {
			this.service.signup({
				firstName: data.firstName,
				lastName: data.lastName,
				address: data.address,
				zip: data.zip,
				email: data.email,
				password: data.password
			}, this._signupCallback, this);
		}
		else {
			alert(validation.message);
		}
	},

	_createView: function() {
		//fetch the partial
		this.template = _.template($("#signupTemplate").html());
		this.parent.append(this.template({}));
		this.container = $("#signupParent");

		this.inputs.firstName = $("#i-signupFirstName");
		this.inputs.lastName = $("#i-signupLastName");
        this.inputs.address = $("#i-signupAddress");
        this.inputs.zip = $("#i-signupZip");
		this.inputs.email = $("#i-signupEmail");
		this.inputs.rEmail = $("#i-signupREmail");
		this.inputs.password = $("#i-signupPassword");
		this.inputs.rPassword = $("#i-signupRPassword");
		this.controls.submit = $("#c-submitSignup");
		this.controls.submit.on("click", $.proxy(this._didClickSignup, this));
	},
	/**
	 * @method init
	 * @return {Object} the instance object
	 */
	init: function() {
		console.log("init signup");
		this._createView();

		return this;
	}
};