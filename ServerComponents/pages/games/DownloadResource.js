DownloadResource = function() {
    
};

/**
 * Requires a resource id and returns its content encoded in base64 
 * (to avoid problems with interpretation as unicode).
 * 
 * @param {Object} request
 * @param {Object} response
 */
DownloadResource.prototype.handleRequest = function(request, response)
{
	var resourceId = request.query["id"];
};

exports.class = DownloadResource;