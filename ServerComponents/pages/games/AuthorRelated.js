AuthorRelated = function() {
	
	this._gameRepository = null;
};

AuthorRelated.prototype.setGameRepository = function(gameRepository){
	this._gameRepository = gameRepository;
};

AuthorRelated.prototype.handleRequest = function(request, response)
{
	var user = request.session.user;
	if (user) {
		this._gameRepository.findAllByUser(user, function(result){		
			response.render('games/list.ejs', {'games' : result});
		});
	} else {
		// User is not logged in.
		response.redirect('/');
	}
};

exports.class = AuthorRelated;