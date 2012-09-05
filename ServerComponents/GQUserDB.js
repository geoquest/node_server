var dbconf = require('./dbconf');
var crypto = require('crypto');

var db = require("mongojs").connect(dbconf.url, dbconf.collections);

// for local use only (therefore PRIVATE)
// author: RB
function userAlreadyInDB(user, callback){
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
                callback(err, result);
            }
    );
}

/**
 * Authenticate GeoQuest User ... TODO: JavaDoc...
 * author: RB
 * @param user
 * @param pass
 * @param callback
 */
function authGQUser(user, pass, callback){
    var result = false;
    var fName = "";
    if ((user[0]=="_") || (pass.length<6)){
        console.log("Possible illegal IntAccess attempt!!!!!!!!!!!!!");
        callback(false,result);
    } else {
        
        var encryptedPW = crypto.createHmac('sha512', dbconf.salt).update(pass).digest('hex');
        db.REGISTERED.find(
                { user:user, password:encryptedPW }, 
                function( err, loginGQUser ){
                    if ( err || !loginGQUser ){
                        console.log("Error accesing database");
                        callback(err, false, "");
                    } else { 
                        if ( loginGQUser.length > 0 ){
                            result = true;
                            fName = loginGQUser[0]["firstName"];
                            //console.log(fName);
                            console.log("User Authenticated!");
                        } else {
                        	result = false;
                            console.log("User auth REJECTED!");
                        }
                    }
                    callback(err, result, fName);
                }
        );
    }
}
module.exports.authGQUser = authGQUser;

/**
 * TODO: complete JavaDoc...
 * author: RB
 * @param user
 * @param callback
 */
function externalAuth(user, callback){
    var result = false;
    if (user[0]=="_" && user[0] === user[3]){
        db.REGISTERED.find(
                {user:user, password:""},
                function(err, res){
                    if ( err || !res ){
                        console.log("Error accessing database");  
                    } else { 
                        if ( res.length > 0 ){
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
 * TODO: JavaDoc
 * 
 * author: RB
 * @param user
 * @param fName
 * @param lName
 * @param link
 * @param callback
 */
function insertNewExternalUser(user, fName, lName, link, callback){
    var result = false;
    if (user[0]=="_" && user[0] === user[3]){

    	userAlreadyInDB(user, function(err, alreadyInDBresult){
    		
    		if(!alreadyInDBresult){
		        db.REGISTERED.insert(
		                {
		                    firstName:fName,
		                    lastName:lName,
		                    email:link,
		                    user:user, 
		                    password:""
		                },
		                function(err, extUserRegister){
		                    if ( err || !extUserRegister ){
		                        //console.log("Error accesing database");
		                    } else { 
		                        //console.log("EXTERNAL User is now saved in the DB.");
		                        return true;
		                    }
		                    callback(err, result);
		                }
		        );
	        } else {
	        	//ExtUser already in DB
	        	callback(err, result);
	        }
    	});
    	

    } else {
        console.log("Bad or illegal register user attempt!!!!!!!!!!!!!");
        callback(null,result);
    }
}
module.exports.insertNewExternalUser = insertNewExternalUser;

/**
 * TODO: Complete JavaDoc...
 * author: RB
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
        callback(null,result);
    } else {
        
        userAlreadyInDB(user, function(err, alreadyInDBresult){
            
            var encryptedPW = crypto.createHmac('sha512', dbconf.salt).update(pass).digest('hex');
            
            if(!alreadyInDBresult){
                db.REGISTERED.insert(
                        {
                            firstName:fName,
                            lastName:lName,
                            email:email,
                            user:user, 
                            password:encryptedPW
                        },
                        function(err, GQUserRegister){
                            if ( err || !GQUserRegister ){
                                console.log("Error accesing database");
                                //err = "Error accessing database";
                            } else { 
                                console.log("GeoQuest User is now saved in the DB.");
                                result = true;
                            }
                            callback(err, result);
                        }
                );
            }
            else {
                //returns false (because the user was already found in the database)
                callback(err, result);
            }
        });

    }
    
}
module.exports.insertGQUser = insertGQUser;

/**
 * Author: Song
 */
function dropCollection(){
	db.REGISTERED.drop(function(err){
		if(err){
			console.log("Drop collection \"REGISTERED\" error ");
		}
		else{
			console.log("Drop collection \"REGISTERED\" succeeds ");
		}
	});
}
module.exports.dropCollection = dropCollection;

/**
 * Author: Song
 */
function createCollection(){
	db.createCollection("REGISTERED", function(err){
		if(err){
			console.log("Create collection \"REGISTERED\" error ");
		}
		else{
			console.log("Create collection \"REGISTERED\" succeeds ");
		}
	});
	
}
module.exports.createCollection = createCollection;


/**
 * Author: Song
 * @param fName
 * @param lName
 * @param email
 * @param user
 * @param password
 */
function addTestingUserEntry(fName, lName, email, user, password ){
	var encryptedPW = crypto.createHmac('sha512', dbconf.salt).update(password).digest('hex');
    db.REGISTERED.insert(
        {
            firstName:fName, 
            lastName:lName, 
            email:email, 
            user:user, 
            password:encryptedPW
        }, 
        function(err, schemaDefine){
            if (err || !schemaDefine || (schemaDefine.length==0) ){
                console.log("Could not complete request!");
            } else {
                console.log("User entry added!");
            }
        }
    );
}
module.exports.addTestingUserEntry = addTestingUserEntry;
