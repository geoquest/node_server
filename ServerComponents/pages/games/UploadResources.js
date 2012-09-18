var Game = require("../../Game.js");
var Resource= require("../../Resource.js");
var fs = require('fs');

UploadResources = function() {
	this._gameRepository = null;
	this._resourceRepository = null;
};

/**
 * Receives the Game Repository and stores it for later usage.
 * 
 * @param {GameRepository}
 */
UploadResources.prototype.setGameRepository = function(gameRepository) {
	this._gameRepository = gameRepository;
};

/**
 * Receives the Resource Repository and stores it for later usage.
 * 
 * @param {ResourceRepository}
 */
UploadResources.prototype.setResourceRepository = function(resourceRepository) {
	this._resourceRepository = resourceRepository;
};

UploadResources.prototype.handleRequest = function(request, response) {
	if (request.method === 'GET') {
		response.render('uploadResources.ejs', {msg:  'Please upload your game resources.'});
		return;
	}
	if (request.method === 'POST') {
		this._handlePOST(request, response);
	}
};

UploadResources.prototype._handlePOST = function(request, reponse) {
	var gameId = request.param('gameId');
	if (gameId === undefined) {
		reponse.redirect('error/NotFound');
		return;
	}
	if (!this._hasUploadedFile(request)) {
		// TODO: re-render form?
		reponse.redirect('error/NotFound');
		return;
	}
	var self = this;
	this._gameRepository.findGameById(gameId, function(game) {
		if (game === null) {
			// Game does not exist.
			reponse.redirect('error/NotFound');
			return;
		}
		if (game.getAuthors().indexOf(request.session.user.getId()) === -1) {
			reponse.redirect('error/NotFound');
			return;
		}
		// Current user is author of the game and allowed to add resources.
		var resource = self.constructResource(request, game);
		self._resourceRepository.insert(resource);
	});
};

/**
 * Checks if the request contains an uplaoded file.
 * 
 * @param {Object} request
 * @return {Boolean}
 */
UploadResources.prototype._hasUploadedFile = function(request) {
	if (request.files === null || (typeof request.files) !== 'object') {
		return false;
	}
	if (!('game' in request.files) || (typeof request.files.game) !== 'object') {
		// We are expecting a file named "game".
		return false;
	}
	var requiredAttributes = ['path', 'name', 'type'];
	for (var i = 0; i < requiredAttributes.length; i++) {
		var attribute = requiredAttributes[i];
		if (!(attribute in request.files.game) || (typeof request.files.game[attribute]) !== 'string') {
			return false;
		}
	}
	return true;
};

UploadResources.prototype.constructResource = function(request, game){
	var resource = new Resource.class();
	
	resource.setGame(game);	
	
	resource.setFilename(request.files.game.name);
	resource.setTempPath(request.files.game.path);
	resource.setMineType(request.files.game.mime);
	resource.setUser(request.session.user);
	
	resource.setDate(new Date());
	
	return resource;
};

exports.class = UploadResources;