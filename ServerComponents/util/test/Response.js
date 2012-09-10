

Response = function() 
{
	this.template = null;
	this.templateVars = null;
	this.redirectUrl = null;
	this.redirectStatus = null;
};

Response.prototype.render = function(template)
{
	
};

Response.prototype.redirect = function(status, url) {
	this.redirectUrl = url;
};

exports.class = Response;