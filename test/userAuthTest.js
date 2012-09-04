var assert = require("assert")
var db = require("../ServerComponents/GQUserDB");

describe('Test Authentication', function(){
	
  describe('Testing authGQUser(user, pass, callback())', function(){
    it('Feed in corrrect password: should return true!', function(done){

    	var tentativeUser = "UserName00";
    	var tentativePass = "whatever password";

    	//before we test the authentication, we have to insert that user manually
    	//\question not sure if that follows the correct paradigm
    	
    	db.dropCollection();
    	db.createCollection();
    	db.addTestingUserEntry("First Name","Last Name","someone@example.com",tentativeUser, tentativePass);
    	
    	//now the test starts
    	//expect authSuccessful == true
    	db.authGQUser(
    	        tentativeUser, 
    	        tentativePass, 
    	        function(err, authSuccessful, plm){
    	            console.log(authSuccessful);
    	            console.log(err);
    	            
    	            // if(err) throw err
    	            assert.equal(true, authSuccessful);
    	            //if(!authSuccessful) throw "Not authenticated!";
                    done();    	
    	        }
    	 )
    });

    it('Feed in wrong password: should return false!', function(done){

    	var tentativeUser = "UserName00";
    	var tentativePass = "whatever password";
    	var wrongPass = "whatever password1";

    	//before we test the authentication, we have to insert that user manually
    	//\question not sure if that follows the correct paradigm
    	
    	db.dropCollection();
    	db.createCollection();
    	db.addTestingUserEntry("First Name","Last Name","someone@example.com",tentativeUser, tentativePass);
    	
    	//now the test starts
    	//expect authSuccessful == true
    	db.authGQUser(
    	        tentativeUser, 
    	        wrongPass, 
    	        function(err, authSuccessful, plm){
    	            console.log(authSuccessful);
    	            console.log(err);
    	            
    	            // if(err) throw err
    	            assert.equal(false, authSuccessful);
    	            //if(!authSuccessful) throw "Not authenticated!";
                    done();    	
    	        }
    	 )	 
    });


    
    
  });
});