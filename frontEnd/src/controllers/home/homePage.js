/**
 * @module hw03.controllers
 * @class homePage
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.home = hw03.controllers.home || {};
hw03.controllers.home.homePage = function(parent) {
	hw03.controllers.controller.call(this);
	this.parent = parent;
	this.currentPage = undefined;
	this.controls = {};
	this.order = {
		"overview": 0
	};
};

hw03.controllers.home.homePage.prototype = {

	_didClickOverview: function(e) {
		this.setView("overview");
		this._setActiveSelect(this.controls.overview);
	},
    _didClickAccount: function(e) {
        this.setView("account");
        this._setActiveSelect(this.controls.account);
    },
	_didClickLogout: function(e) {
        this.setPage("logout");
	},
	_setActiveSelect: function(btn) {
		for (var k in this.controls) {
			this.controls[k].removeClass("pageSelectContainerSelected");
		}
		btn.addClass("pageSelectContainerSelected");
	},
	
	/**
	 * sets the subviews based on the current state
	 * @method setView
	 */
	setView: function(newView) {
		if (newView === this.state) {
			return;
		}
		console.log(this.state);
		if (newView === "overview") {
			if (this.currentPage) {
				this.currentPage.detach();
			}
			this.currentPage = new hw03.controllers.home.overview(this.subViews.containers.homeContainer).init();
			this.state = "overview";
		}
        else if (newView === "account") {
            if (this.currentPage) {
                this.currentPage.detach();
            }
            this.currentPage = new hw03.controllers.home.account(this.subViews.containers.homeContainer).init();
            this.state = "account";
        }
	},
	/**
	 * Create the navigation bar
	 * @method _createNavbar
	 * @private
	 */
	_createNavbar: function() {
		var navbarController = new hw03.controllers.home.navbar(this.subViews.containers.homeNavbar, $.proxy(this.setView, this)).init();
		this.subViews.controllers.navbar = navbarController;
		this.subViews.protectedViews.navbar = true;
	},
	/**
	 * Create the main home view
	 * @method _createView
	 * @private
	 */
	_createView: function() {
		//fetch the partial
		this.template = _.template($("#homePageTemplate").html());
		this.parent.append(this.template({}));
		this.container = $("#homePageParent");
		this.subViews.containers.homeContainer = $("#homePageBody");
		//this.subViews.containers.homeNavbar = $("#homePageHeader");

		//this._createNavbar();

		this.controls.overview = $("#overviewSelect");
        this.controls.account = $("#accountSelect");

		this.controls.overview.on("click", $.proxy(this._didClickOverview, this));
        this.controls.account.on("click", $.proxy(this._didClickAccount, this));
		$("#headerLogout").on("click", $.proxy(this._didClickLogout, this));
		
		this.setView("overview");
		this._setActiveSelect(this.controls.overview);
	},
	/**
	 * @method init
	 * @return {Object} the instance object
	 */
	init: function() {
		console.log("init home Page");
		this._createView();
		
		return this;
	}
};