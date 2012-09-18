var Game = require("../../Game.js");
var fs = require('fs');
var url = require('url')

YourGames = function() {
	this._gameRepository = null;
	this._gameValidator = null;
	this._template = 'games/your-games.ejs';
	this._templateVariables = {
			showDialog: false,
			title : '',
			msgModal : '',
			uploadError: false,
			highlightGameId: null
	};
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
YourGames.prototype.setGameRepository = function(repository) {
	this._gameRepository = repository;
};

/**
 * Receives the GameValidator via dependency injection.
 * 
 * @param {GameValidator} validator
 */
YourGames.prototype.setGameValidator = function(validator) {
	this._gameValidator = validator;
};

YourGames.prototype.handleRequest = function(request, response) {
	var self = this;
	var user = request.session.user;
	this._gameRepository.findAllByUser(user, function(games) {
		self._templateVariables.games = games;
		self._setMessage('Please upload your game in JSON format.');
		if (request.method === 'POST') {
			self._handleUpload(request);
		}
		
		
		var url_parts = url.parse(request.url, true);
	    var query = url_parts.query;
	    console.log(query);
	    
	    if(query.showDialog){
	    	
	    	self._templateVariables.showDialog = true;
	    	self._templateVariables.title = 'GeoQuest Landing Page';
	    	self._templateVariables.msgModal = 'Welcome ' + user + '!';
			response.render(self._template, self._templateVariables);
	    }
	    else{
	    	var params = {showDialog : false, title: 'GeoQuest Landing Page', msg: 'Welcome ' + user + '!'};
	    	self._templateVariables.showDialog = false;
	    	self._templateVariables.title = '';
	    	self._templateVariables.msgModal = '';
	    	
			response.render(self._template, self._templateVariables);
	    }
	    
	});
	
};

/**
 * Handles POST requests to upload games.
 * 
 * @param {Object} request
 */
YourGames.prototype._handleUpload = function(request) {
	// Check if a file has been provided
	if (!request.files || !request.files.game || !request.files.game.path || !request.files.game.name) {
		this._setMessage('Error! Please choose a file to upload.');
		this._raiseUploadError();
		return;
	}
	
	// Read file contents and try to parse it as JSON
	var content = fs.readFileSync(request.files.game.path, 'utf8');
	try {			
		content = JSON.parse(content);
		var valid = this._gameValidator.validateGame(content);
		if (valid == false){
			this._setMessage('Error! Not a proper game file.');
			this._raiseUploadError();
			return;
		}
		
	} catch(err) {
		this._setMessage('Error! Not a legal JSON file.');
		this._raiseUploadError();
		return;
	}
	
	// Upload successful
	var gameData = {
		'authors': [request.session.user.getId()],
		'content': content
	};
    var game = new Game.fromJSON(gameData);      
 
	this._gameRepository.insert(game);
	
	//TODO: here we just push the game into game list without actually query the database,
	// so we don't have the gameid there, which is neeeded
	this._templateVariables.games.push(game);
	this._setMessage('Your game has been uploaded successfully.');
	this._setHighlightGame(game);
};

YourGames.prototype._setMessage = function(message) {
	this._templateVariables.msg = message;
};

YourGames.prototype._raiseUploadError = function() {
	this._templateVariables.uploadError = true;
};

YourGames.prototype._setHighlightGame = function(game) {
	this._templateVariables.highlightGameId = game.getId();
};

exports.class = YourGames;
