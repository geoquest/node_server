var GameRepository = require('../../GameRepository');
var fs = require('fs');


DownloadResources = function() {
	this._gameRepository = null;
};

DownloadResources.prototype.handleRequest = function(request, response)
{
	var path = "ServerComponents/pages/games/gameResources/" + request.query["res"];
	var img = fs.readFileSync(path);

	
	response.setHeader("Content-Type", "image");
	response.end(img, 'binary');
	
};


exports.class = DownloadResources;