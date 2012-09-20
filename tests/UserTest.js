var assert = require("assert");

var User = require("../ServerComponents/User.js");

describe('User', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {User.class}
	 */
	var user = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		user = new User.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		user = null;
	});
	
    describe('constructor', function() {
        it('should create a User instance', function() {
            assert.ok(user instanceof User.class);
        });
    });
    
    describe('getLoginType', function() {
    	it('returns correct value', function() {
    		user.setLoginType('Facebook');
            assert.equal(user.getLoginType(), 'Facebook');
        });
    	it('throws an exception if value is not valid', function() {
    		assert.throws(function() {
    			user.setLoginType('Invalid');
    		});
    	});
    });
    
    describe('getPassword', function() {
    	it('returns a value if password was provided', function() {
    		user.setPassword('secret');
    		assert.equal(typeof user.getPassword(), 'string');
        });
    	it('does not return the unencrypted password', function() {
    		var password = 'secret';
    		user.setPassword(password);
    		assert.notStrictEqual(user.getPassword(), password);
        });
    });
    
    describe('hasPassword', function() {
		it('returns false if an invalid password is given', function() {
    		user.setPassword('secret');
    		assert.ok(user.hasPassword('invalid') === false);
        });
		it('returns true if the correct password is passed', function() {
			user.setPassword('secret');
    		assert.ok(user.hasPassword('secret') === true);
        });
		it('returns false if no password is available', function() {
			assert.ok(user.hasPassword('any') === false);
		});
    });
    
    describe('getFirstname', function() {
		it('returns correct value', function() {
    		user.setFirstname('Max');
    		assert.equal(user.getFirstname(), 'Max');
        });
    });
    
    describe('getLastname', function() {
		it('returns correct value', function() {
			user.setLastname('Mustermann');
    		assert.equal(user.getLastname(), 'Mustermann');
        });
    });
    
    describe('setEmail', function() {
    	it('throws exception if invalid address is provided', function() {
    		assert.throws(function() {
    			user.setEmail('invalid');
    		});
        });
    });
    
    describe('getEmail', function() {
		it('returns null if no address was provided', function() {
    		assert.ok(user.getEmail() === null);
        });
		it('returns correct value', function() {
    		user.setEmail('example@geoquest.com');
    		assert.equal(user.getEmail(), 'example@geoquest.com');
        });
    });
    
    describe('getIdentifier', function() {
		it('returns expected value', function() {
			user.setIdentifier("12243435436345235");
    		assert.equal(user.getIdentifier(), "12243435436345235");
        });
    }); 
    
    describe('getId', function() {
		it('returns correct value', function() {
    		user.setId('123');
    		assert.equal(user.getId(), '123');
        });
    });
    
    describe('fromJSON', function() {
		it('returns a User object', function() {
			var json = {
				"identifier": "42", 
				"password": "this_should_be_an_encrypted_password",
				"firstname": "Max",
				"lastname": "Mustermann",
				"loginType": "Facebook",
				"email": "lulu@yahoo.com"
			};
			assert.ok(User.fromJSON(json) instanceof User.class);
        });
		it('throws exception if property is missing', function() {
			var json = {
				"identifier": "42", 
				"firstname": "Max",
				"lastname": "Mustermann",
				"loginType": "Facebook",
				"email": "lulu@yahoo.com"
			};
			assert.throws(function() {
				User.fromJSON(json);
			});
        });
		it('maps properties correctly', function() {
			var json = {
				"identifier": "42", 
				"password": "this_should_be_an_encrypted_password",
				"firstname": "Max",
				"lastname": "Mustermann",
				"loginType": "Facebook",
				"email": "lulu@yahoo.com"
			};
			var user = User.fromJSON(json);
			assert.ok(user instanceof User.class);
			assert.equal(user.getIdentifier(), '42');
			assert.equal(user.getPassword(), 'this_should_be_an_encrypted_password');
			assert.equal(user.getFirstname(), 'Max');
			assert.equal(user.getLastname(), 'Mustermann');
			assert.equal(user.getLoginType(), 'Facebook');
			assert.equal(user.getEmail(), 'lulu@yahoo.com');
        });
		it('works with empty password', function() {
			var json = {
				"identifier": "42", 
				"password": null,
				"firstname": "Max",
				"lastname": "Mustermann",
				"loginType": "Facebook",
				"email": "lulu@yahoo.com"
			};
			assert.ok(User.fromJSON(json) instanceof User.class);
        });
		it('works with empty email', function() {
			var json = {
				"identifier": "42", 
				"password": "this_should_be_an_encrypted_password",
				"firstname": "Max",
				"lastname": "Mustermann",
				"loginType": "Facebook",
				"email": null
			};
			assert.ok(User.fromJSON(json) instanceof User.class);
        });
		it('adds global id if available', function() {
			var json = {
				"_id": "mongodb-id",
				"identifier": "42", 
				"password": "this_should_be_an_encrypted_password",
				"firstname": "Max",
				"lastname": "Mustermann",
				"loginType": "Facebook",
				"email": null
			};
			var user = User.fromJSON(json);
			assert.equal(user.getId(), 'mongodb-id');
		});
		it('throws exception if no object is provided', function() {
			assert.throws(function() {
				User.fromJSON('This is not valid');
			});
		});
    });
    
    describe('toJSON', function() {
        it('maps properties correctly (check if conversion is performed correctly)', function() {
            user.setLoginType("GeoQuest");
            user.setIdentifier("asdf");
            user.setFirstname("IHate");
            user.setLastname("LULU!");
            user.setPassword("whatever");
            user.setEmail("and@lsoBu.bu");
            var newJSONObj = user.toJSON();
            assert.equal("GeoQuest",newJSONObj["loginType"]);
            assert.equal("asdf",newJSONObj["identifier"]);
            assert.equal("IHate",newJSONObj["firstname"]);
            assert.equal("LULU!",newJSONObj["lastname"]);
            assert.equal("and@lsoBu.bu",newJSONObj["email"]);
        });

        it('returns a JSON object (compare with inconsistent data) (should be "!=")', function() {
            user.setLoginType("GeoQuest");
            user.setIdentifier("asdf");
            user.setFirstname("IHate");
            user.setLastname("LULU!");
            user.setPassword("whatever");
            user.setEmail("and@lsoBu.bu");
            var newJSONObj = user.toJSON();
            assert.notEqual("GeoQuestpliuhnj",newJSONObj["loginType"]);
        });
        
        it('throw error if invalid login type is provided', function(){
            assert.throws(function() {
                user.setLoginType("Twitter");
                user.setIdentifier("asdf");
                user.setFirstname("IHate");
                user.setLastname("LULU!");
                user.setPassword("whatever");
                user.setEmail("and@lsoBu.bu");
                user.toJSON();
            });
        });
        
        it('throw error if no login type is provided', function(){
            assert.throws(function() {
                user.setIdentifier("asdf");
                user.setFirstname("IHate");
                user.setLastname("LULU!");
                user.setPassword("whatever");
                user.setEmail("and@lsoBu.bu");
                user.toJSON();
            });
        });
        
        it('throw error if no identifier is provided', function(){
            assert.throws(function() {
                user.setLoginType("GeoQuest");
                user.setFirstname("IHate");
                user.setLastname("LULU!");
                user.setPassword("whatever");
                user.setEmail("and@lsoBu.bu");
                user.toJSON();
            });
        });

        it('throw error if password is not provided for GQ User', function(){
            assert.throws(function() {
                user.setLoginType("GeoQuest");
                user.setIdentifier("asdf");
                user.setFirstname("IHate");
                user.setLastname("LULU!");
                user.setEmail("and@lsoBu.bu");
                user.toJSON();
            });
        });
        
        it('works if password is not provided for other than GQ User', function(){
            assert.doesNotThrow(function() {
                user.setLoginType("Facebook");
                user.setIdentifier("asdf");
                user.setFirstname("IHate");
                user.setLastname("LULU!");
                user.setEmail("and@lsoBu.bu");
                user.toJSON();
            });
        });
        
        it('adds database id to JSON object', function() {
        	user.setId("mongodb-id");
        	user.setLoginType("GeoQuest");
            user.setIdentifier("asdf");
            user.setFirstname("IHate");
            user.setLastname("LULU!");
            user.setPassword("whatever");
            user.setEmail("and@lsoBu.bu");
            var newJSONObj = user.toJSON();
            assert.equal(newJSONObj._id, "mongodb-id");
        });
    });
    
    describe('toString', function() {
    	it('returns string', function() {
    		user.setLoginType('GeoQuest');
    		user.setIdentifier('max.mustermann');
    		user.setFirstname('Max');
    		user.setLastname('Mustermann');
    		assert.equal(typeof user.toString(), 'string');
    	});
    	it('returns firstname if available', function() {
    		user.setLoginType('GeoQuest');
    		user.setIdentifier('max.mustermann');
    		user.setFirstname('Max');
    		user.setLastname('Mustermann');
    		assert.equal(user.toString(), 'Max');
    	});
    	it('returns username if firstname is not available', function() {
    		user.setLoginType('GeoQuest');
    		user.setIdentifier('max.mustermann');
    		assert.equal(user.toString(), 'max.mustermann');
    	});
    });
    
});
