

module.exports.loginWithFbGp = loginWithFbGp;
module.exports.loginWithGQDB = loginWithGQDB;


function loginWithFbGp(req, res) {
    
    var supplies = new Array("name");
    if(!req.user){
        res.render('index.ejs', { title: 'Login' , msg: 'login using your GeoQuest account or through FB/Google'});
    }
    else{
        console.log(req.user);
        if(req.user.facebook){
        res.render('index.ejs', { title: 'Login' , msg: 'logged in through facebook'});
      }
      if(req.user.google){
        res.render('index.ejs', { title: 'Login' , msg: 'logged in through google'});
      }
    }
    
}


function loginWithGQDB(req, res) {
    
    var supplies = new Array("name");
    res.render('index.ejs', { title: 'Login' , msg: 'logged in as GeoQuest user'});
    
}