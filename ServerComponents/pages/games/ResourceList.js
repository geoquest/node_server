ResourceList = function() {
    this._gameRepo = null;
    this._resourceRepo = null;
};

ResourceList.prototype.setGameRepository = function(gameRepository){
	this._gameRepo = gameRepository;
};

ResourceList.prototype.setResourceRepository = function(resourceRepository){
	this._resourceRepo = resourceRepository;
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
	if (gameId === undefined) {
		response.status(500);
		response.end();
		return;
	}
	var self = this;
	this._gameRepo.findGameById(gameId, function(game) {
		if(game == null) {
			response.status(500);
			response.end();
			return;
		}
		self._resourceRepo.findAllByGame(game, function(resourceList){
			var result = [];
			for(var key in resourceList){
				result.push({
					id: resourceList[key].getId(),
					filename: resourceList[key].getFilename(),
					mimeType: resourceList[key].getMimeType()
				});
			}
			response.setHeader("Content-Type", "application/json");
			response.write(JSON.stringify(result));
			response.end();
		});
	});

};

exports.class = ResourceList;