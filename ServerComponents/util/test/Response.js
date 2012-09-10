/**
 * Simulates a response object that can be used for testing.
 */

Response = function() 
{
	this.template = null;
	this.templateVars = null;
	this.redirectUrl = null;
	this.redirectStatus = null;
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

exports.class = Response;