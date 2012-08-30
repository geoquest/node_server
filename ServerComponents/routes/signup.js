
var userDB = require('./../GQUserDB');

module.exports.handleSignupPost = handleSignupPost;
module.exports.signup = signup;

function signup(req, res){
    res.render('signup.ejs');    
}

function handleSignupPost(req, res){

    userDB.insertGQUser(
            req.param('username'),
            req.param('password'),
            req.param('fName'),
            req.param('lName'),
            req.param('email'),
            function(err, result){
                if(result){
                    console.log("SignUp for a new GQUser done");
                }
            }
    );
    
    console.log( "Data user:" + req.param('username') + "password" + req.param('password', null) + "email" + req.param('email', null));
}