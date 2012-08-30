var db = require("./GQUserDB");



//sample successful login
var tentativeUser = "UserName00";
var tentativePass = "whatever password";
db.authGQUser(
        tentativeUser, 
        tentativePass, 
        function(err, authSuccessful){
            console.log(authSuccessful);
        }
);

//sample UNsuccessful login
var tentativeUser = "UserName00";
var tentativePass = "whateverpassword";
db.authGQUser(
        tentativeUser, 
        tentativePass, 
        function(err, authUNSuccessful){
            console.log(authUNSuccessful);
        }
);

//sample UNsuccessful login
var tentativeUser = "UserName0 0";
var tentativePass = "whatever password";
db.authGQUser(
        tentativeUser, 
        tentativePass, 
        function(err, authUNSuccessful){
            console.log(authUNSuccessful);
        }
);

//sample external login
var tentativeFBUser = "_FB_1678765445415453457171873";
var tentativeFBFName = "Gigel";
var tentativeFBLName = "...escu";
var tentativeFBLink = "http://fatzaCarte.com/gigel";
db.externalAuth(
        tentativeFBUser,
        function(err, checkUserPresence){
            if (checkUserPresence){
                console.log("NOW LET THE " + tentativeUser[1] + tentativeUser[2] + " LOG IN...");
            } else {
                db.insertExternalUser(
                        tentativeFBUser,
                        tentativeFBFName,
                        tentativeFBLName,
                        tentativeFBLink,
                        function(err, insertNewExternalUser){
                            console.log("ADDED NEW EXTERNAL USER TO DB");
                        }
                );
            }
        }
);
