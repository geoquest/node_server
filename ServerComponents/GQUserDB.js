/**
 * The server code skeleton. 
 */



var databaseUrl = "localhost:27017/test"; // "username:password@example.com/mydb"
//use db.getName() to get the databse name. Here it is "test" (on pool-c-03)
var collections = ["REGISTERED"]; //array of table names
var db = require("mongojs").connect(databaseUrl, collections);

console.log("Connected to DB!");

function authGQUser(user, pass, callback){
    var result = false;
    if (user[0]=="_"){
        console.log("Possible illegal IntAccess attempt!!!!!!!!!!!!!");
        callback(err,result);
    } else {
        db.REGISTERED.find(
                { user:user, password:pass }, 
                function( err, loginGQUser ){
                    if ( err || !loginGQUser ){
                        console.log("Error accesing database");
                    } else { 
                        if ( loginGQUser.length > 0 ){
                            result = true;
                            console.log("User Authenticated!");
                        } else {
                            console.log("User auth REJECTED!");
                        }
                    }
                    callback(err, result);
                }
        );
    }
}
module.exports.authGQUser = authGQUser;

function externalAuth(user, callback){
    var result = false;
    if (user[0]=="_" && user[0] === user[3]){
        db.REGISTERED.find(
                {user:user, password:""},
                function(err, extAuth){
                    if ( err || !extAuth ){
                        console.log("Error accesing database");
                    } else { 
                        if ( extAuth.length > 0 ){
                            result = true;
                            console.log("ExternalLoginUser Recognized!");
                        } else {
                            console.log("ExternalLoginUser never logged in before!");
                        }
                    }
                    callback(err, result);
                }
        );
    } else {
        console.log("Possible illegal ExtAccess attempt!!!!!!!!!!!!!");
        callback(err,result);
    }
}
module.exports.externalAuth = externalAuth;

function insertExternalUser(user, fName, lName, email, callback){
    var result = false;
    if (user[0]=="_" && user[0] === user[3]){
        db.REGISTERED.insert(
                {
                    firstName:fName,
                    lastName:lName,
                    email:email,
                    user:user, 
                    password:""
                },
                function(err, extRegister){
                    if ( err || !extRegister ){
                        console.log("Error accesing database");
                    } else { 
                        console.log("ExternalLoginUser is now saved in the DB.");
                        
                    }
                    callback(err, result);
                }
        );
    } else {
        console.log("Bad or illegal register user attempt!!!!!!!!!!!!!");
        callback(err,result);
    }
}
module.exports.insertExternalUser = insertExternalUser;