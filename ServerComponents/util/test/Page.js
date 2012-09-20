/**
 * Simple page module that can be used for testing.
 * 
 * Stores the received request and response objects, 
 * so you are able to inspect these afterwards.
 */

Page = function() {
	this.request = null;
	this.response = null;
	this.called = false;
};

/**
 * Simulates request handling.
 * 
 * @param {Object} request
 * @param {Object} response
 */
Page.prototype.handleRequest = function(request, response) {
	this.called = true;
	this.request = request;
	this.response = response;
};

module.exports.class = Page;