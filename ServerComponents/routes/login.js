
var userDB = require('./../GQUserDB');

module.exports.login = login;
module.exports.loginWithGQDB = loginWithGQDB;
module.exports.handleLoginPost = handleLoginPost;



function login(req, res) {
    
    //var supplies = new Array("name");

        res.render('login.ejs', { title: 'Log In' , msg: 'login using your GeoQuest account or through FB/Google'});
        
        
//        if(req.user.facebook && req.user.google){
//            res.render('login.ejs', { title: 'Log In' , msg: 'logged in.'});
//        }
//        if(req.user.facebook){
//            res.render('login.ejs', { title: 'Log In' , msg: 'logged in through facebook'});
//        }
//        if(req.user.google){
//            res.render('login.ejs', { title: 'Log In' , msg: 'logged in through google'});
//        }
    
}


function loginWithGQDB(req, res) {
    
    var supplies = new Array("name");
    res.render('login.ejs', { title: 'Login' , msg: 'logged in as GeoQuest user'});
    
}


function handleLoginPost (req, res){
    
    userDB.authGQUser(
            req.param('username'),
            req.param('password'),
            function(err, result, firstName){
                console.log(result);
                if(result){
                    console.log("You're logged in.");
                    //Store session
                    //ToDo: DB API to get UserID, should store UserID in session
                    //Bug: there's no firstName returned
                    req.session.user = "SomeUserID";
                    
                    res.redirect('/home');
                    //res.render('login.ejs', { title: 'Log in Succeed.', msg: 'Hi, ' +  firstName + '!'});
                } else{
                    console.log("Login failed.");
                    res.render('login.ejs', { title: 'Log in Failed.', msg: 'Please retry.'});                    
                }
            }
    );
    
}