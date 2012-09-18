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
		
	});
};

UploadResources.prototype.handleUnknownRequests = function(request){
	//redirects to the 404 page for all other requests, except POST
		
	};

UploadResources.prototype.validateGame = function(request, callback) {
//checks if only a game id is passed - in this case it creates a Game object with only an id
//checks the database entry for the game id and completes the full game object from there.
//if the game does not exist, it redirects to a 404 page
	GameRepository.findGameById("123", function(result) {
		if (result == null) {
			callback(false);
		}
		callback(true);
	});	
	
//	newGame = new Game.class();
//	newGame.setId(request.files.game.gameid);
	
	//return newGame;
};

UploadResources.prototype.validateRequest = function(request){
	//the request should have a user id, a game id (or a Game object), file name, file path, mime type and a date
	allFieldsExist = request.hasOwnProperty
	
	//
	allIsNonNull = (request.user.getIdentifier()!=null && 
			request.files.game.path!=null && 
			request.files.game.name!=null &&
			request.files.game.type!=null &&
			request.files.game.filename!=null);
	
	return allIsNonNull;	
};

UploadResources.prototype.constructResource = function(request){
	
	var game = this.validateGame(request);
		
	//Add resource data into Model
	var resource = new Resource.class();
	resource.setFilename(request.files.game.name);
	resource.setTempPath(request.files.game.path);
	resource.setMineType(request.files.game.mime);
	
	resource.setGame(game);
	
	resource.setUser(request.session.user.getIdentifier());
	resource.setDate(new Date());
	
	//TODO Here we have to set setGame also. In order to know for which game we are uploading resources.
	return resource;
}










































UploadResources.prototype.setGameRepository = function(repository) {
	this._gameRepository = repository;
};

UploadResources.prototype.renderUploadForm = function(response, msgParam) {
	var params = { title: 'Game Resources Upload' , msg: msgParam };
	response.render('uploadResources', params);
};

exports.class = UploadResources;