/**
 * The server code skeleton. 
 */



var databaseUrl = "localhost:27017/test"; // "username:password@example.com/mydb"
//use db.getName() to get the databse name. Here it is "test" (on pool-c-03)
var collections = ["REGISTERED"]; //array of table names
var db = require("mongojs").connect(databaseUrl, collections);

console.log("Connected to DB!");

function userAlreadyInDB(user){
    var result = false;
    db.REGISTERED.find(
            {user:user},
            function(err, userExistent){
                if (err || !userExistent){
                    console.log("DB Access problem occured...");
                } else {
                    if (userExistent.length == 0){
                        console.log("OK, this user may be added");
                    } else {
                        console.log("User already in DB...");
                        result = true;
                    }
                }
            }
    );
    return result;
}

/**
 * Authenticate GeoQuest User ... TODO: JavaDoc...
 * @param user
 * @param pass
 * @param callback
 */
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

/**
 * TODO: complete JavaDoc...
 * @param user
 * @param callback
 */
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
                            console.log("External Login User Recognized!");
                        } else {
                            console.log("External Login User never logged in before!");
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

/**
 * TODO: Complete JavaDoc...
 * @param user
 * @param pass
 * @param fName
 * @param lName
 * @param email
 * @param callback
 */
function insertGQUser(user, pass, fName, lName, email, callback){
    var result = false;
    if (user[0]=="_"){
        console.log("Bad or illegal register user attempt!!!!!!!!!!!!!");
        callback(err,result);
    } else {
        if (!userAlreadyInDB(user)){
            db.REGISTERED.insert(
                    {
                        firstName:fName,
                        lastName:lName,
                        email:email,
                        user:user, 
                        password:pass
                    },
                    function(err, GQUserRegister){
                        if ( err || !GQUserRegister ){
                            console.log("Error accesing database");
                        } else { 
                            console.log("GeoQuest User is now saved in the DB.");
                            return true;
                        }
                        callback(err, result);
                    }
            );
        }
    }
}
module.exports.insertGQUser = insertGQUser;


