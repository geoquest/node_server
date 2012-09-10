var Game = require("../Game.js");
var fs = require('fs');

Upload = function() {
	this._gameRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
Upload.prototype.setGameRepository = function(repository) {
	this._gameRepository = repository;
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
		var content = fs.readFileSync(request.files.game.path, 'utf8');
		try{
			content = JSON.parse(content);
		} catch(err){
			this.renderUploadForm(response, 'Error! Not a legal JSON file.');
			return;
		}

		// Upload successful
		var params = { title: 'Game Upload Response', msg: 'Your game has been uploaded successfully.'};

		var game = new Game.class();
		game.setContent(content);
		// TODO: set game author (get it from session)

		this._gameRepository.insert(game);

		response.render('upload-response', params);
	}
};

Upload.prototype.renderUploadForm = function(response, msgParam) {
	var params = { title: 'Game Upload' , msg: msgParam };
	response.render('upload', params);
};

exports.class = Upload;