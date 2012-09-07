

Home = function() {
	
};

Home.prototype.handleRequest = function(request, response)
{
	response.render('login.ejs', { title: 'Log In' , msg: 'login using your GeoQuest account'});
};

exports.class = Home;