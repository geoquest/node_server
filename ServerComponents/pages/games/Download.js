var GameRepository = require('../../GameRepository');

Download = function() {
	this._gameRepository = null;
};

Download.prototype.handleRequest = function(request, response)
{
	var gameId = request.query["id"];
		
	this._gameRepository.findGameById(gameId, function(result){
		
		var responseText = "jsonCallback({game: " + JSON.stringify(result) +"})";
		response.setHeader("Content-Type", "application/json;charset=UTF-8");
		response.write(responseText);
		response.end();
	});
};

Download.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};


exports.class = Download;