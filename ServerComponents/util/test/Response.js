

Response = function() 
{
	this.template = null;
	this.templateVars = null;
	this.redirectUrl = null;
	this.redirectStatus = null;
};

Response.prototype.render = function(template, templateVars)
{
	this.template = template;
	this.templateVars = templateVars || {};
};

Response.prototype.redirect = function(status, url) {
	if(url === undefined){
		url = status;
		status = 302;
	}
	this.redirectStatus = status;
	this.redirectUrl = url;
	
};

exports.class = Response;