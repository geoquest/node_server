
var userDB = require('./../GQUserDB');

module.exports.loginWithFbGp = loginWithFbGp;
module.exports.loginWithGQDB = loginWithGQDB;
module.exports.handleLoginPost = handleLoginPost;



function loginWithFbGp(req, res) {
    
    var supplies = new Array("name");
    if(!req.user){
        res.render('index.ejs', { title: 'Log In' , msg: 'login using your GeoQuest account or through FB/Google'});
    }
    else{
        console.log(req.user);
        if(req.user.facebook){
        res.render('index.ejs', { title: 'Log In' , msg: 'logged in through facebook'});
      }
      if(req.user.google){
        res.render('index.ejs', { title: 'Log In' , msg: 'logged in through google'});
      }
    }
    
}


function loginWithGQDB(req, res) {
    
    var supplies = new Array("name");
    res.render('index.ejs', { title: 'Login' , msg: 'logged in as GeoQuest user'});
    
}


function handleLoginPost (req, res){
    
    userDB.authGQUser(
            req.param('username'),
            req.param('password'),
            function(err, result, firstName){
                console.log(result);
                if(result){
                    console.log("You're logged in.");
                    res.render('index.ejs', { title: 'Log in Succeed.', msg: 'Hi, ' +  firstName + '!'});
                } else{
                    console.log("Login failed.");
                    res.render('index.ejs', { title: 'Log in Failed.', msg: 'Please retry.'});                    
                }
            }
    );
    
}