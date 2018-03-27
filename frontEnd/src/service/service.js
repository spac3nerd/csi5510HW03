/**
 * @module hw03.service
 * @class service
 */

hw03.service = function() {
	this._url = window.location.href;
};
hw03.service.prototype = {
	/*
	 *The following method sends a request to the server.
	 *@type {type} indicating the data type of function
	 *@route {route} indicating whether or not the request is to the BackEnd or to the Arm.
	 *@data {String} what information is within the request.
	 *@callback{String} indicates origin of submitted information.
	 *@context {String} what information is within the request.
	 *@header {String} information that includes tokens.
	 */
	_sendRequest: function(type, route, data, callback, context, header) {
		$.ajax({
			url: this._url + route,
			type: type,
			contentType: "application/json",
			dataType: "json",
			headers: header || {
				authToken: localStorage.token
			},
			data: JSON.stringify(data)
		}).done(function(data, text, request) {
			if (callback) {
				callback.apply(context, arguments);
			}
		});
	},
	//login page routes
	/*The following function indicates the information needed for login
	 *login requires:
	 *@data {String}
	 *@callback {String}
	 *@context {String}
	 */
	login: function(data, callback, context) {
		this._sendRequest("POST", "user/login", data, callback, context, {});
	},
	//The following method indicates the information needed for user submission of creating an account.
	//signup sends information to sendRequest for proper handling of submitted information.
	//signup needs the following parameters:
	//@data {data}
	//@callback {String}
	//@context {String}
	signup: function(data, callback, context) {
		this._sendRequest("POST", "user/register", data, callback, context);
	},

	/*The following method indicates the information needed for verifying the state of a token.
	 *verifyToken requires the following information:
	 *@callback {String}
	 *@context {String}
	 */
	verifyToken: function(callback, context) {
		this._sendRequest("POST", "user/verifyToken", {}, callback, context);
	},
	getOverview: function(callback, context) {
        this._sendRequest("POST", "projects/getProjects", {}, callback, context);
    },
    getAccount: function(callback, context) {
        this._sendRequest("POST", "user/getAccountInfo", {}, callback, context);
    }
	
};
