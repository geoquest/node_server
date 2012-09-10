

Home = function() {
	
};

Home.prototype.handleRequest = function(request, response)
{
	if(request.cookies.user == undefined || request.cookies.pass == undefined){
		console.log('user cookie not present');
		var params = { title: 'GeoQuest Author Management' , msg: 'login using your GeoQuest account'};
		response.render('login.ejs', params);
	}else{
		console.log('user cookie present');
		console.log(request.cookies.user);
		console.log(request.cookies.pass);
		var params = {title: 'GeoQuest Landing Page', msg: 'Welcome ' + request.cookies.user + '!'};
		response.render('home.ejs', params);
	}
};

exports.class = Home;