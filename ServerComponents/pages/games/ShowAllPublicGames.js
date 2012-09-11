ShowAllPublicGames = function() {
	
	this._gameRepository = null;
};

ShowAllPublicGames.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};

ShowAllPublicGames.prototype.handleRequest = function(request, response)
{
	this._gameRepository.findAll(function(result){		
		for(var index in result) {
		    console.log(result[index]);
		}
		response.render('games/listPublic.ejs', {'games' : result});
	});
};

exports.class = ShowAllPublicGames;