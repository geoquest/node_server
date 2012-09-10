/**
 * This module will handle the logout request for any user.
 * @returns {logout}
 */

Logout = function() {
	
};

Logout.prototype.handleRequest = function(request, response)
{
	console.log('Inside log out function');
	request.session.destroy(function(e){
		console.log('User is logged out successfully');
	});
	response.render('logout.ejs');
};

exports.class = Logout;