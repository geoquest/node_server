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
        	console.log("#############################################################################");

            if (checkUserPresence){
                console.log("NOW LET THE " + tentativeFBUser[1] + tentativeFBUser[2] + " LOG IN...");
            } else {
                db.insertNewExternalUser(
                        tentativeFBUser,
                        tentativeFBFName,
                        tentativeFBLName,
                        tentativeFBLink,
                        function(err, insertExternalUser){
                            console.log("ADDED NEW EXTERNAL USER TO DB");
                        }
                );
            }
        }
);

//sample external login
var tentativeGPUser = "_G+_16787654454171873";
var tentativeGPFName = "Vasile";
var tentativeGPLName = "...escu";
var tentativeGPLink = "http://fatzaCarte.com/vvvvv";
db.externalAuth(
        tentativeGPUser,
        function(err, checkUserPresence){
            if (checkUserPresence){
                console.log("NOW LET THE " + tentativeGPUser[1] + tentativeGPUser[2] + " LOG IN...");
            } else {
                db.insertNewExternalUser(
                        tentativeGPUser,
                        tentativeGPFName,
                        tentativeGPLName,
                        tentativeGPLink,
                        function(err, insertExternalUser){
                            console.log("ADDED NEW EXTERNAL USER TO DB");
                        }
                );
            }
        }
);

//sample GeoQuestUser sign up
var tentativeUser = "newUsername";
var tentativeFName = "SomeFN";
var tentativeLName = "SomeLN";
var tentativeEmail = "gigel@example.com";
var tentativePass = "some password";
db.insertGQUser(
        tentativeUser,
        tentativePass,
        tentativeFName,
        tentativeLName,
        tentativeEmail,
        function(err, insertNewInternalUser){
            console.log("new user signed up: " + insertNewInternalUser);
        }
);
