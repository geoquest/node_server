AuthorRelated = function() {
	
	this._gameRepository = null;
};

AuthorRelated.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};

AuthorRelated.prototype.handleRequest = function(request, response)
{
	this._gameRepository.findAllByUser(user, function(result){
		console.log(result);
		
	});
};

exports.class = AuthorRelated;