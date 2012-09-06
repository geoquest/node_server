module.exports.home = home;

function home (req, res){
	if(req.session.user){
		res.render('home.ejs', { name: req.session.user });
	}
	else {
		res.redirect('/');
	}
	
}