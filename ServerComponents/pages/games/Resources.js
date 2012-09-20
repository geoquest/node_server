var Game = require("../../Game.js");
var Resource= require("../../Resource.js");

Resources = function() {
	this._gameRepository = null;
	this._resourceRepository = null;
	this._template = 'games/resources.ejs';
	this._templateVariables = {
			showDialog: false,
			titleModel : '',
			msgModal : '',
			msg : '',
			game: null,
			resources: [],
			highlightResourceFilename: '',
			uploadError: false,			
	};
};

/**
 * Receives the Game Repository and stores it for later usage.
 * 
 * @param {GameRepository}
 */
Resources.prototype.setGameRepository = function(gameRepository) {
	this._gameRepository = gameRepository;
};

/**
 * Receives the Resource Repository and stores it for later usage.
 * 
 * @param {ResourceRepository}
 */
Resources.prototype.setResourceRepository = function(resourceRepository) {
	this._resourceRepository = resourceRepository;
};

Resources.prototype.handleRequest = function(request, response) {
	var gameId = request.param('gameId');
	
	if (gameId === undefined) {
		response.redirect('error/NotFound');
		return;
	}
	var self = this;
	this._gameRepository.findGameById(gameId, function(game) {
		if (game === null) {
			// Game does not exist.
			response.redirect('error/NotFound');
			return;
		}
		if (game.getAuthors().indexOf(request.session.user.getId()) === -1) {
			response.redirect('error/NotFound');
			return;
		}

		//this._resourceRepository.findAllByGame(game, function(resources) {
			//self._templateVariables.resources = resources;
		
			//making some fake resources for display because the db query method above is not done yet
			for(var i = 0; i < 5; i++){
				var resource1 = new Resource.class();
				
				resource1.setGame(game);	
				resource1.setFilename("Fake resource " + i);
				resource1.setTempPath("C:\\");
				resource1.setMimeType("jpeg");
				resource1.setUser(request.session.user);
				resource1.setDate(new Date());
				self._templateVariables.resources.push(resource1);
			}

				
			if (request.method === 'POST') {
				self._handlePOST(request, response, game);
			} 
			else {//GET request with valid gameid
				self._setMessage('Please upload your game resources.');
				self._setGame(game);
				response.render(self._template, self._templateVariables);
			}
		//}		
	});
};


Resources.prototype._handlePOST = function(request, response, game) {
	if (!this._hasUploadedFile(request)) {
		this._setMessage('Please provide a resource file.');
		this._raiseUploadError();
	}else{
		// Current user is author of the game and allowed to add resources.
		var resource = this.constructResource(request, game);
		this._resourceRepository.insert(resource);
		this._setHighlightResource(resource);
		this._templateVariables.resources.push(resource);
		this._setMessage('Resource was successfully added.');
	}
	this._setGame(game);	
	
	response.render(this._template, this._templateVariables);
};

/**
 * Checks if the request contains an uploaded file.
 * 
 * @param {Object} request
 * @return {Boolean}
 */
Resources.prototype._hasUploadedFile = function(request) {
	if (request.files === null || (typeof request.files) !== 'object') {
		return false;
	}
	if (!('resource' in request.files) || request.files.resource ===null || (typeof request.files.resource) !== 'object') {
		// We are expecting a file named "resource".
		return false;
	}
	
	//we add this check because the two if above seem to be insufficient
	if (!request.files || !request.files.resource || !request.files.resource.path || !request.files.resource.name) {
		this._setMessage('Error! Please choose a file to upload.');
		this._raiseUploadError();
		return false;
	}
	
	var requiredAttributes = ['path', 'name', 'type'];
	for (var i = 0; i < requiredAttributes.length; i++) {
		var attribute = requiredAttributes[i];
		if (!(attribute in request.files.resource) || (typeof request.files.resource[attribute]) !== 'string') {
			return false;
		}
	}
	
	return true;
};

Resources.prototype.constructResource = function(request, game){
	var resource = new Resource.class();
	
	resource.setGame(game);	
	
	resource.setFilename(request.files.resource.name);
	resource.setTempPath(request.files.resource.path);
	resource.setMimeType(request.files.resource.mime);
	resource.setUser(request.session.user);
	
	resource.setDate(new Date());
	
	return resource;
};

Resources.prototype._setMessage = function(message) {
	this._templateVariables.msg = message;
};

Resources.prototype._setGame = function(game) {
	this._templateVariables.game = game;
};

Resources.prototype._raiseUploadError = function() {
	this._templateVariables.uploadError = true;
};

Resources.prototype._setHighlightResource = function(resource) {
	this._templateVariables.highlightResourceFilename = resource.getFilename();
};

exports.class = Resources;