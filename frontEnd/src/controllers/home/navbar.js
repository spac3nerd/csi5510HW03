//DEPRECATED
//replaced by homePage.js
/**
 * @module hw03.controllers
 * @class navbar
 * DEPRECATED
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.home = hw03.controllers.home || {};
hw03.controllers.home.navbar = function(parent, setHomeView) {
	hw03.controllers.controller.call(this);
	this.parent = parent;
	this.setHomeView = setHomeView;
};

hw03.controllers.home.navbar.prototype = {
	/**
	 * Callback for the modal window, sets view to logout
	 * @method _createNavbar
	 * @param {Boolean} confirmation whether the user has confirmed yet
	 * @private
	 */
	_modalCallback: function(confirmation) {
		if (confirmation) {
			this.setPage("logout");
		}
	},
	/**
	 * Sets view to facilities
	 * @method _didClickFacilities
	 * @param {Object} e the event
	 * @private
	 */
	_didClickFacilities: function(e) {
		this.setHomeView("facilities");
	},
	/**
	 * Sets view to bays
	 * @method _didClickBays
	 * @param {Object} e the event
	 * @private
	 */
	_didClickBays: function(e) {
		this.setHomeView("bays");
	},
	/**
	 * Sets view to parcels
	 * @method _didClickParcels
	 * @param {Object} e the event
	 * @private
	 */
	_didClickParcels: function(e) {
		this.setHomeView("parcels");
	},
	/**
	 * Sets view to units
	 * @method _didClickUnits
	 * @param {Object} e the event
	 * @private
	 */
	_didClickUnits: function(e) {
		this.setHomeView("units");
	},
	/**
	 * Asks the user to confirm logout with a two-choice modal window
	 * @method _createNavbar
	 * @param {Object} e the event
	 * @private
	 */
	_didClickLogout: function(e) {
		this.modalWindow.displayTwoChoice("Do you wish to Log Out?", $.proxy(this._modalCallback, this));
	},
	/**
	 * Creates the navigation bar
	 * @method _createView
	 * @private
	 */
	_createView: function() {
		//fetch the partial
		this.template = _.template($("#navbarTemplate").html());
		this.parent.append(this.template({}));
		this.container = $("#navbarParent");
		//set up animations
		this.animate.animate($(this.container.children()[0]), "slideDown", "medium");
		
		
		this.controls.logoutBtn = $("#navbarLogout");
		this.controls.logoutBtn.on("click", $.proxy(this._didClickLogout, this));
		$("#c-navbarFacilities").on("click", $.proxy(this._didClickFacilities, this));
		$("#c-navbarBays").on("click", $.proxy(this._didClickBays, this));
		$("#c-navbarParcels").on("click", $.proxy(this._didClickParcels, this));
		$("#c-navbarUnits").on("click", $.proxy(this._didClickUnits, this));
		
	},
	/**
	 * @method init
	 * @return {Object} the instance object
	 */
	init: function() {
		console.log("init navbar");
		this._createView();
		
		return this;
	}
};