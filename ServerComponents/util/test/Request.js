/**
 * Object that is used to simulate HTTP request objects.
 * 
 * Provides properties and methods that are often used in pages.
 */

Request = function() 
{
	this.method = "GET";
	this.params = {};
	this.session = {};
};

/**
 * Returns the parameter with the provided name.
 * 
 * Returns undefined if the parameter is not available.
 * 
 * @param {String} name
 * @return {Object}|undefined
 */
Request.prototype.param = function(name) 
{
	if (name in this.params) {
		return this.params[name];
	}
	return undefined;
};

exports.class = Request;