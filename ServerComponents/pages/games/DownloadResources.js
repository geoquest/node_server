var GameRepository = require('../../ResourceRepository');
var fs = require('fs');


DownloadResources = function() {
    this._resourceRepository = null;
};



DownloadResources.prototype.handleRequest = function(request, response)
{
    var path = __dirname + "/gameResources/" + request.query["res"];
    var img = fs.readFileSync(path);

    
    response.setHeader("Content-Type", "text/plain");
    response.end(new Buffer(img).toString('base64'));
    
};


DownloadResources.prototype.setResourceRepository = function(resourceRepository){
	this._resourceRepository = resourceRepository;
};

exports.class = DownloadResources;