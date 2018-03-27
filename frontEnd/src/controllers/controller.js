/**
 * @module hw03.controllers
 * @class controller
 */

hw03.controllers = hw03.controllers || {};
//every controller will inherit from this
hw03.controllers.controller = function() {
	/**
	 * The element which contains the template - expected to be a jQuery object
	 * @property container
	 * @type Object
	 */
	this.container = undefined; 
	this.service = new hw03.service();
	this.setPage = hw03.controllers.controller.prototype.setPage;
	this.controls = {}; //Append all controls to this object
	this.inputs = {};
	this.subViews = { //Append all controllers and containers that are children of the current instance to this object
		containers: {},
		controllers: {},
		protectedViews: {} //a reference to a controller - will not be touched by detach/delete unless explicitly stated 
	};
	this.setSubview = undefined;//function that can be passes to children so that they can change their parent's subview
	/**
	 * detach parent from the DOM
	 * @method detach
	 */
	this.detach = function() {
		if (this.parent) {
			this.container.detach();
		}
	}; 
	/**
	 * detach all subviews
	 * @method detachSubviews
	 * @param {Boolean} detachProtected if true, will not detach
	 */
	this.detachSubviews = function(detachProtected) {
		for (var k in this.subViews.controllers) {
			if (!detachProtected) {
				if (this.subViews.protectedViews[k]) {
					continue;
				}
				else {
					this.subViews.controllers[k].detach();
				}
			}
			else {
				this.subViews.controllers[k].detach();
			}
		}
	};
	/**
	 * delete all subviews
	 * @method deleteSubviews
	 * @param {Boolean} deleteProtected if true, will not delete
	 */
	this.deleteSubviews = function(deleteProtected) {
		for (var k in this.subViews.controllers) {
			if (!deleteProtected) {
				if (this.subViews.protectedViews[k]) {
					continue;
				}
				else {
					delete this.subViews[k];
				}
			}
			delete this.subViews[k];
		}
	};
};
