var url = require('url')


Home = function() {
	
};

Home.prototype.handleRequest = function(request, response)
{
	
	if (!request.session.user) {
		
		var url_parts = url.parse(request.url, true);
	    var query = url_parts.query;
	    
	    if(query.showDialog){	 
	    	var params = {showDialog : true, msgModal : 'you are successfully logged out !' ,titleModel : 'GeoQuest' ,title: 'GeoQuest Author Management' , msg: 'login using your GeoQuest account'};
			response.render('login.ejs', params); 
	    }
	    else{
	    	var params = {showDialog : false,  msgModal : '', titleModel : '', title: 'GeoQuest Author Management' , msg: 'login using your GeoQuest account'};
			response.render('login.ejs', params);
	    }
		
		
	} else {
		var params = {title: 'GeoQuest Landing Page', msg: 'Welcome ' + request.session.user + '!'};
		response.render('home.ejs', params);
	}
};

exports.class = Home;