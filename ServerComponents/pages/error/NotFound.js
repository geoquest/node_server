

NotFound = function() {
	
};

/**
 * Renders a "Page not found" template and sends the appropriate HTTP code.
 * 
 * @param {Object} request
 * @param {Object} response
 */
NotFound.prototype.handleRequest = function(request, response)
{
	response.statusCode = 404;
	response.render('error/not-found.ejs');
};

exports.class = NotFound;