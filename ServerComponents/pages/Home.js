

Home = function() {
	
};

Home.prototype.handleRequest = function(request, response)
{
	response.write('hello!');
	response.end();
};

exports.class = Home;