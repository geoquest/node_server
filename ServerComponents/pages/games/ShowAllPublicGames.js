ShowAllPublicGames = function() {
	
	this._gameRepository = null;
};

ShowAllPublicGames.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};

ShowAllPublicGames.prototype.handleRequest = function(request, response)
{
	this._gameRepository.findAll(function(result) {	
		response.render('games/public-games.ejs', {'games' : result});
	});
};

exports.class = ShowAllPublicGames;