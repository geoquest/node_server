var Game = require("../../Game.js");
var fs = require('fs');

Upload = function() {
	this._gameRepository = null;
	this._gameValidator = null;
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
		this.renderUploadForm(response, 'Please upload your game in JSON format.');
	}
	
	if (request.method === 'POST') {

		// Check if a file has been provided
		if (!request.files || !request.files.game || !request.files.game.path || !request.files.game.name) {
			this.renderUploadForm(response, 'Error! Please choose a file to upload.');
			return;
		}
		
		// Read file contents and try to parse it as JSON
		var gameData = fs.readFileSync(request.files.game.path, 'utf8');
		try {			
			gameData = JSON.parse(gameData);
			var valid = this._gameValidator.validateGame(gameData);
			if (valid == false){
				this.renderUploadForm(response, 'Error! Not a proper game file.');
				return;
			}
		} catch(err) {
			this.renderUploadForm(response, 'Error! Not a legal JSON file.');
			return;
		}

		// Upload successful
		var params = { title: 'Game Upload Response', msg: 'Your game has been uploaded successfully.'};
		
		gameData.authors = [request.session.user.getId()];

        var game = new Game.fromJSON(gameData);      
		
		this._gameRepository.insert(game);

		response.render('upload-response', params);
	}
};

Upload.prototype.renderUploadForm = function(response, msgParam) {
	var params = { title: 'Game Upload' , msg: msgParam };
	response.render('upload', params);
};

exports.class = Upload;