

Home = function() {
	
};

Home.prototype.handleRequest = function(request, response)
{
	response.render('login.ejs');
};

exports.class = Home;