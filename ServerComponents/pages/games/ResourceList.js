ResourceList = function() {
    
};

/**
 * Requires a game id and returns a list of all resources that
 * are connected to it.
 * 
 * The list is returned as JSON and contains meta information 
 * about each resource, for example id in the database, file name, etc.
 * 
 * @param {Object} request
 * @param {Object} response
 */
ResourceList.prototype.handleRequest = function(request, response)
{
	var gameId = request.query["id"];

};

exports.class = ResourceList;