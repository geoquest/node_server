var assert = require("assert");
var db = require("../ServerComponents/GQUserDB");

describe('Testing user insertions: GQUserDB', function(){
  describe('#insertGQUser()', function(){
    it('Adding a new GQ user to the DB. Should return true!', function(done){
        var tentativeUser = "UserName00";
        var tentativePass = "whatever password";
        var tentativeFName = "First Name";
        var tentativeLName = "Last Name";
        var tentativeEmail = "someone@example.com";

        //before we test the authentication, we insert a user manually
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
    
    it('Adding an existing GQ user to the DB. Should return false!', function(done){
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
        //expect insertTentativeUserToDB == false;
        db.insertGQUser(
                tentativeUser,
                tentativePass,
                tentativeFName,
                tentativeLName,
                tentativeEmail,
                function(err, insertTentativeUserToDB){
                    assert.equal(false, insertTentativeUserToDB);
                    done();
                }
        );
    });
    
    it('Adding some GQ user name that starts with "_". Should return false!', function(done){
        var tentativeUser = "_UserName00";
        var tentativePass = "whatever password";
        var tentativeFName = "First Name";
        var tentativeLName = "Last Name";
        var tentativeEmail = "someone@example.com";

        //before we test the authentication, make sure we have a constant testing environment
        //\question not sure if that follows the correct paradigm

        db.dropCollection();
        db.createCollection();

        //now the test starts
        //expect insertUnderscoreUser == true;
        db.insertGQUser(
                tentativeUser,
                tentativePass,
                tentativeFName,
                tentativeLName,
                tentativeEmail,
                function(err, insertUnderscoreUser){
                    assert.equal(false, insertUnderscoreUser);
                    done();
                }
        );
    });

    it('Test successful DB connection. err should be null!', function(done){
        var tentativeUser = "_UserName00";
        var tentativePass = "whatever password";
        var tentativeFName = "First Name";
        var tentativeLName = "Last Name";
        var tentativeEmail = "someone@example.com";

        //now the test starts
        assert.doesNotThrow(function(){
            db.dropCollection();
        });
        
        assert.doesNotThrow(function(){
            db.createCollection();
        });

        assert.doesNotThrow(function(){
                db.insertGQUser(
                    tentativeUser,
                    tentativePass,
                    tentativeFName,
                    tentativeLName,
                    tentativeEmail,
                    function(err, testDBConnection){
                        assert.equal(null, err);
                        done();
                    }
                );
        });
    });

  });
  
  describe('#insertNewExternalUser()', function(){
    it('Adding some EXTERNAL user that respects the "_**_" pattern. Should return true!', function(){
    var tentativeUser = "_FB_123";
    var tentativeFName = "First Name";
    var tentativeLName = "Last Name";
    var tentativeLink = "http://www.facebook.com/123";

    //before we test the authentication, make sure we have a constant testing environment
    //\question not sure if that follows the correct paradigm

    db.dropCollection();
    console.log("###############################################");
    db.createCollection();
    console.log("?????????????????????????????????????????????????");
    //now the test starts
    //expect insertNewExternalUser == true;
    db.insertNewExternalUser(
            tentativeUser,
            tentativeFName,
            tentativeLName,
            tentativeLink,
            function(err, insertExternalCorrectUser){
                console.log("********************************************");
                assert.equal(null,err);
                assert.equal(true, insertExternalCorrectUser);
                done();
            }
    );
    });
  });
});