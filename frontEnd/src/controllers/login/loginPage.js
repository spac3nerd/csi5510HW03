/**
 * @module hw03.controllers
 * @class loginPage
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.login = hw03.controllers.login || {};
hw03.controllers.login.loginPage = function(parent, state) {
	hw03.controllers.controller.call(this);
	this.parent = parent;
	this.state = state || "login"; //controls whether the login or signin page is visible
};

hw03.controllers.login.loginPage.prototype = {
	
	_didClickRecover: function(e) {
		if (this.state === "recover") {
			return;
		}
		this.state = "recover";
		this.setView();
	},
	
	//handler for switching to the login form
	_didClickLogin: function(e) {
		if (this.state === "login") {
			return;
		}
		this.state = "login";
		this.setView();
	},
	
	//handler for switching to the signup form
	_didClickSignup: function(e) {
		if (this.state === "signup") {
			return;
		}
		this.state = "signup";
		this.setView();
	},
	
	/**
	 * sets the subviews based on the current state
	 * @method setView
	 */
	setView: function() {
		console.log(this.state);
		if (this.state === "login") {
			this.detachSubviews();
			this.deleteSubviews();
			this.subViews.controllers.login = new hw03.controllers.login.login(this.subViews.containers.formContainer).init();
			this.subViews.controllers.login.setSubview = {
				function: this._didClickRecover, 
				context: this
				
			};
		}
		else if (this.state === "signup") {
			this.detachSubviews();
			this.deleteSubviews();
			this.subViews.controllers.signup = new hw03.controllers.login.signup(this.subViews.containers.formContainer).init();
			this.subViews.controllers.signup.setSubview = {
				function: this.setView, 
				context: this
			};
		}
	},
	
	_createView: function() {
		//fetch the partial
		this.template = _.template($("#loginPageTemplate").html());
		this.parent.append(this.template({}));
		this.container = $("#loginPageParent");
		
		this.subViews.containers.formContainer = $("#formContainer");
		//get the header buttons and attach handlers
		this.controls.loginBtn = $("#c-login");
		this.controls.loginBtn.on("click", $.proxy(this._didClickLogin, this));
		this.controls.signupBtn = $("#c-signup");
		this.controls.signupBtn.on("click", $.proxy(this._didClickSignup, this));
		this.setView();
	},
	/**
	 * @method init
	 * @return {Object} the instance object
	 */
	init: function() {
		console.log("init login Page");
		this._createView();
		
		return this;
	}
};
