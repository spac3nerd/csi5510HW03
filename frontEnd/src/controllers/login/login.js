/**
 * @module hw03.controllers
 * @class login
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.login = hw03.controllers.login || {};
hw03.controllers.login.login = function(parent) {
	hw03.controllers.controller.call(this);
	this.parent = parent;
};

hw03.controllers.login.login.prototype = {
	
	_loginCallback: function(message) {
		if (message.success) {
			if (message.authtoken) {
				window.localStorage.token = message.authtoken;
			}
			this.setPage("home", true);
		}
		else {
			alert("Unable to log in: " + message.message);
		}
	},
	
	_didClickLogin: function(e) {
		var data = {
			email: this.inputs.email.val(),
			password: this.inputs.password.val()
		};
		var validation = hw03.utils.inputValidator.validateLogin(data);
		
		if (validation.success) {
			this.service.login(data, this._loginCallback, this);
		}
		else {
			talert("Unable to log in: " + validation.message);
		}
	},
	
	_createView: function() {
		//fetch the partial
		this.template = _.template($("#loginTemplate").html());
		this.parent.append(this.template({}));
		this.container = $("#loginParent");
		
		this.inputs.email = $("#i-loginEmail");
		this.inputs.password = $("#i-loginPassword");
		this.controls.submit = $("#c-submitLogin");
		this.controls.submit.on("click", $.proxy(this._didClickLogin, this));
	},
	/**
	 * @method init
	 * @return {Object} the instance object
	 */
	init: function() {
		console.log("init login");
		this._createView();
		
		return this;
	}
};