/**
 * Simulates a response object that can be used for testing.
 */

Response = function() 
{
	this.template = null;
	this.templateVars = null;
	this.redirectUrl = null;
	this.redirectStatus = null;
	this.statusCode = 200;
	this.ended = false;
	this.body = '';
};

/**
 * Simulates the rendering of a template.
 * 
 * @param {String} template Name of the template.
 * @param {Object}|undefined templateVars Variables that are passed to the template (optional).
 */
Response.prototype.render = function(template, templateVars)
{
	this.template = template;
	this.templateVars = templateVars || {};
	this.end();
};

/**
 * Simulates a redirect.
 * 
 * The status code is optional and can be omitted:
 * <code>
 * response.redirect('/home');
 * </code>
 * 
 * @param {integer}|{String} status
 * @param {String}|undefined url
 */
Response.prototype.redirect = function(status, url) {
	if(url === undefined){
		url = status;
		status = 302;
	}
	this.redirectStatus = status;
	this.redirectUrl = url;
	
};

/**
 * Simulates the method that sets the status code.
 * 
 * @param {integer} code
 * @return {Object} The response object (provides a fluent interface).
 */
Response.prototype.status = function(code) {
	this.statusCode = code;
	return this;
};

/**
 * Simulates the write() function.
 * 
 * @param {String} chunk
 */
Response.prototype.write = function(chunk) {
	this.body += chunk;
};

/**
 * Simulates the termination of the response.
 * 
 * @param {String} chunk Optional content.
 */
Response.prototype.end = function(chunk) {
	if (chunk) {
		this.write(chunk);
	}
	this.ended = true;
};

exports.class = Response;