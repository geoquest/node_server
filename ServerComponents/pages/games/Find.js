
var GameRepository = require('../../GameRepository');

Find = function() {
	this._gameRepository = null;
};

Find.prototype.handleRequest = function(request, response)
{
	this._gameRepository.findAll(function(result){
		var responseText = "jsonCallback({\"games\":  " + JSON.stringify(result) +"})";
		response.setHeader("Content-Type", "application/json;charset=UTF-8");
		response.write(responseText);
		response.end();
	});
};

Find.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};


exports.class = Find;