var Game = require("../../Game.js");
var fs = require('fs');

Upload = function() {
	this._gameRepository = null;
	this._gameValidator = null;
	this._template = null;
	this._templateVariables = {};
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
Upload.prototype.setGameRepository = function(repository) {
	this._gameRepository = repository;
};

/**
 * Receives the GameValidator via dependency injection.
 * 
 * @param {GameValidator} validator
 */
Upload.prototype.setGameValidator = function(validator) {
	this._gameValidator = validator;
};

Upload.prototype.handleRequest = function(request, response) {
	if (request.method === 'GET') {
		this._handleGet(request);
	} else if (request.method === 'POST') {
		this._handlePost(request);
	}
	response.render(this._template, this._templateVariables);
};

/**
 * Handles GET requests.
 * 
 * @param {Object} request
 */
Upload.prototype._handleGet = function(request) {
	this.renderUploadForm('Please upload your game in JSON format.');
};

/**
 * Handles POST requests to upload games.
 * 
 * @param {Object} request
 */
Upload.prototype._handlePost = function(request) {
	// Check if a file has been provided
	if (!request.files || !request.files.game || !request.files.game.path || !request.files.game.name) {
		this.renderUploadForm('Error! Please choose a file to upload.');
		return;
	}
	
	// Read file contents and try to parse it as JSON
	var content = fs.readFileSync(request.files.game.path, 'utf8');
	try {			
		content = JSON.parse(content);
		var valid = this._gameValidator.validateGame(content);
		if (valid == false){
			this.renderUploadForm('Error! Not a proper game file.');
			return;
		}
		
	} catch(err) {
		this.renderUploadForm('Error! Not a legal JSON file.');
		return;
	}
	
	// Upload successful
	var gameData = {
		'authors': [request.session.user.getId()],
		'content': content
	};
    var game = new Game.fromJSON(gameData);      
 
	this._gameRepository.insert(game);
	

	this._template = 'upload-response';
	this._templateVariables.title = 'Game Upload Response';
	this._templateVariables.msg = 'Your game has been uploaded successfully.';
};

Upload.prototype.renderUploadForm = function(msgParam) {
	this._templateVariables.title = 'Game Upload';
	this._templateVariables.msg = msgParam;
	this._template = 'upload';
};

exports.class = Upload;