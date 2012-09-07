

Upload = function() {
	
};



Upload.prototype.handleRequest = function(request, response){
	
	if (request.method === 'GET') {
		var params = { title: 'Game Upload' , msg: 'Please upload your game in JSON format.'};
		response.render('upload', params);
	}
	
	
	if (request.method === 'POST') {
		var params = { title: 'Game Upload Response'};
		response.render('upload-response', params);
	}
};

exports.class = Upload;