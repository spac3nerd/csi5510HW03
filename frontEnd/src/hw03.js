
hw03 = function(content) {
	this.content = $(content);
	this.activeController = undefined;
	this.controllerOptions = {};
	this.attachedBackground = undefined;
};

hw03.prototype = {
	/**
	 * Ends the current session and returns to the login screen
	 * @method _logout
	 * @private
	 */
	_logout: function() {
		delete localStorage.token;
		this.content.removeClass("contentOverflow");
		this.setPage("login");
	},
	
	/**
	 * Sets current page controller
	 * @method setPage
	 * @param {String} page A string representing the page whose controller will be set as active
	 */
	setPage: function(page, login) {
		if (login) {
			this.content.addClass("contentOverflow");
		}
		switch (page) {
			case "login":
				if (this.activeController) {
					this.activeController.detach();
				}
				this.activeController = new hw03.controllers.login.loginPage(this.content, "login").init();
				break;
			case "signup":
				if (this.activeController) {
					this.activeController.detach();
				}
				this.activeController = new hw03.controllers.login.loginPage(this.content, "signup").init();
				break;
			case "home":
				if (this.activeController) {
					this.activeController.detach();
				}
				this.activeController = new hw03.controllers.home.homePage(this.content).init();
				break;
			//doesn't actually load a new page by itself
			case "logout":
				this._logout();
				break;
		}
	},
	/**
	 * Initializes base controller properties, changes settings with Underscore, and checks login status
	 * @method init
	 */
	init: function() {
		//Initialize some base controller properties
		hw03.controllers.controller.prototype.setPage = $.proxy(this.setPage, this);
		
		var service = new hw03.service();
		//change some settings with underscore
		_.templateSettings = {
			interpolate: /\{\{(.+?)\}\}/g, //change the evaluation wrappers from <% %> to {{ }} so that there are no conflicts with the replacement task
			variable: "rc" //the varible in which passed in values to templates are stored - rc is just commonly used
		};
		
		//testing home page
		//window.localStorage.removeItem("authToken");
		
		var loginStatusCallback = function(message) {
		    console.log(message);
			if (message.success) {
				this.setPage("home");
			}
			else {
				this.setPage("login");
			}
		};
		//check the user's login status
		service.verifyToken(loginStatusCallback, this);
	}
};
