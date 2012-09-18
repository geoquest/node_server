var Game = require("../../Game.js");
var Resource= require("../../Resource.js");
var fs = require('fs');

UploadResources = function() {
	this._gameRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
UploadResources.prototype.setGameRepository = function(repository) {
	this._gameRepository = repository;
};


UploadResources.prototype.handleRequest = function(request, response) {
	
	if (request.method === 'GET') {
		
		if(request.query.gameid == "null"){
			//No gameid provided
			//TODO: The yourGame page just push the new uploaded game directly into list without actually query DB
			//So there's no gameID for the just uploaded game
			this.renderUploadForm(response, 'Wrong. No GameID.');
		} else {
			this.renderUploadForm(response, 'Please upload your game resources.');			
		}

	}
	
	if (request.method === 'POST') {

		//console.log(JSON.stringify(request.files));
		
		// Check if a file has been provided
		if (!request.files || !request.files.game || !request.files.game.path || !request.files.game.name) {
			this.renderUploadForm(response, 'Error! Please choose a file to upload.');
			return;
		}
		
		
		//Add resource data into Model
		var resource = new Resource.class();
		resource.setFilename(request.files.game.name);
		resource.setTempPath(request.files.game.path);
		resource.setMineType(request.files.game.mime);
		resource.setUser(request.session.user);
		resource.setDate( new Date());
		//TODO Here we have to set setGame also. In order to know for which game we are uploading resources.
		
		
		try{
			fs.renameSync(request.files.game.path, "./public/images/" + request.files.game.name);
			var params = { title: 'Game Upload Response', msg: 'Resource Uploaded Successfully.'};
			response.render('upload-response', params);
		}catch(error){
			var params = { title: 'Game Upload Response', msg: 'Oooooppppssss Error : While uploading resource.'};
			response.render('upload-response', params);
		}
		
	}
};

UploadResources.prototype.renderUploadForm = function(response, msgParam) {
	var params = { title: 'Game Resources Upload' , msg: msgParam };
	response.render('uploadResources', params);
};

exports.class = UploadResources;