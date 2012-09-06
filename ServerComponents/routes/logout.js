module.exports.logout = logout;

function logout (req, res){
	console.log("before if" + req.session.user);
	if(req.session.user){
		console.log("if");
		//console.log('user_id = ' + req.session.user.user_id);
		//console.log('secret = ' + req.session.user.secret);
		delete req.session.user;
		res.redirect('/');
	}
}