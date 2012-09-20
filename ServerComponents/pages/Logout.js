/**
 * This module will handle the logout request for any user.
 * @returns {logout}
 */

Logout = function() {
	
};

Logout.prototype.handleRequest = function(request, response)
{
	request.session.destroy(function(e){
		console.log('User is logged out successfully');
	});
	
	
	response.redirect('/?showDialog=true');
};

exports.class = Logout;