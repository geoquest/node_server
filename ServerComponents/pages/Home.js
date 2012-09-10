


Home = function() {
	
};

Home.prototype.handleRequest = function(request, response)
{
	
	if(!request.session.user){
		var params = { title: 'GeoQuest Author Management' , msg: 'login using your GeoQuest account'};
		response.render('login.ejs', params);
	}else{
		
		var params = {title: 'GeoQuest Landing Page', msg: 'Welcome ' + request.session.user.identifier + '!'};
		response.render('home.ejs', params);
	}
};

exports.class = Home;