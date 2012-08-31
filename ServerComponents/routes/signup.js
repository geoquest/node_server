
var userDB = require('./../GQUserDB');

module.exports.handleSignupPost = handleSignupPost;
module.exports.signup = signup;

function signup(req, res){
    res.render('signup.ejs');    
}

function handleSignupPost(req, res){
    if(req.param('password') == req.param('confirmPassword')){
        userDB.insertGQUser(
                req.param('username'),
                req.param('password'),
                req.param('fName'),
                req.param('lName'),
                req.param('email'),
                function(err, result){
                    console.log(result);
                    if(result){
                        console.log("SignUp for a new GQUser done");
                        res.render('signupResult.ejs', { title: 'SignUp Succeed.', result: 'Hi, ' +  req.param('fName') + '!'});
                    } else{
                        console.log("SignUp failed.");
                        res.render('signupResult.ejs', { title: 'SignUp Failed.', result: 'Please retry.'});                    
                    }
                }
        );
        console.log( "Data user:" + req.param('username') + "password" + req.param('password', null) + "email" + req.param('email', null));

    }
    else{
        
        res.render('signupResult.ejs', { title: 'Password not matched.', result: 'Please retry.'});
        
    }
    
}