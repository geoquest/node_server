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
		
		console.log(JSON.stringify(request.files));
		
		
		if (!request.files || !request.files.game || !request.files.game.path || !request.files.game.name) {
			this.renderUploadForm(response, 'Error! Please choose a file to upload.');
			return;
		}
		
		var params = { title: 'Game Upload Response'};
	
		var game = new Game.class();
		
		// TODO: set game author (get it from session)
		var content = fs.readFileSync(request.files.game.path, 'utf8');
		
		
		console.log(content);
		try{
		content = JSON.parse(content);
		} catch(err){
			this.renderUploadForm(response, 'Error! Not a legal JSON file.');
			return;
		}
		game.setContent(content);
		
		this._gameRepository.insert(game);

		response.render('upload-response', params);		
	}
};

Upload.prototype.renderUploadForm = function(response, msgParam) {
	var params = { title: 'Game Upload' , msg: msgParam };
	response.render('upload', params);
};

exports.class = Upload;