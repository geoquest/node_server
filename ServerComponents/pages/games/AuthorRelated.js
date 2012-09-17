AuthorRelated = function() {
	
	this._gameRepository = null;
};

AuthorRelated.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};

AuthorRelated.prototype.handleRequest = function(request, response)
{
	var user = request.session.user;
	this._gameRepository.findAllByUser(user, function(result){		
		response.render('games/list.ejs', {'games' : result});
	});
};

exports.class = AuthorRelated;