var assert = require("assert");
var db = require("../ServerComponents/GQUserDB");

describe('Testing user insertions: GQUserDB', function(){
  describe('#insertGQUser()', function(){
    it('Adding a new user to the DB. Should return true!', function(done){
        var tentativeUser = "UserName00";
        var tentativePass = "whatever password";
        var tentativeFName = "First Name";
        var tentativeLName = "Last Name";
        var tentativeEmail = "someone@example.com";

        //before we test the authentication, we have to insert that user manually
        //\question not sure if that follows the correct paradigm

        db.dropCollection();
        db.createCollection();
        db.addTestingUserEntry(tentativeFName, tentativeLName, tentativeEmail, tentativeUser, tentativePass);

        //define the new user to be added
        var newUser = "NewUser";
        var newPass = "password";
        var newFName = "newFirst";
        var newLName = "newLast";
        var newEmail = "new@example.com";
        
        //now the test starts
        //expect insertNewUserToDB == true;
        db.insertGQUser(
                newUser,
                newPass,
                newFName,
                newLName,
                newEmail,
                function(err, insertNewUserToDB){
                    assert.equal(true, insertNewUserToDB);
                    done();
                }
        );
    });
    
    it('Adding an existing user to the DB. Should return false!', function(done){
        var tentativeUser = "UserName00";
        var tentativePass = "whatever password";
        var tentativeFName = "First Name";
        var tentativeLName = "Last Name";
        var tentativeEmail = "someone@example.com";

        //before we test the authentication, we have to insert that user manually
        //\question not sure if that follows the correct paradigm

        db.dropCollection();
        db.createCollection();
        db.addTestingUserEntry(tentativeFName, tentativeLName, tentativeEmail, tentativeUser, tentativePass);

        //now the test starts
        //expect insertNewUserToDB == true;
        db.insertGQUser(
                tentativeUser,
                tentativePass,
                tentativeFName,
                tentativeLName,
                tentativeEmail,
                function(err, inserttentativeUserToDB){
                    assert.equal(true, inserttentativeUserToDB);
                   done();
                }
        );
    });
  });
});
