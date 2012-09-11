var assert = require("assert");

var Game = require("../ServerComponents/Game.js");

describe('Game', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {Game.class}
	 */
	var object = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		object = new Game.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		object = null;
	});
	
    describe('constructor', function() {
        it('should create a Game instance', function() {
            assert.ok(object instanceof Game.class);
        });
    });
    
    describe('addAuthor/getAuthors', function() {
    	it('adds one author to the existing list', function() {
    		object.addAuthor('me');

            assert.equal(object.getAuthors().length, 1);
            assert.equal(object.getAuthors()[0], 'me');
        });
    	
    	it('adds 2 authors to the existing list', function() {
    		object.addAuthor('me');
    		object.addAuthor('and Me');

            assert.equal(object.getAuthors().length, 2);
            assert.deepEqual(object.getAuthors(), ['me', 'and Me']);
        });
    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.addAuthor(null);
    		});
    	});
    });
    
    describe('setContent/getContent', function() {
    	it('should accept an object as content', function() {
    		object.setContent({foo : "bar"});
            assert.deepEqual(object.getContent(), {foo : "bar"});
        });
    	
    	it('should accept null as content', function() {
    		assert.doesNotThrow(function(){
    			object.setContent(null);
    		});
        });
    	
    	it('should not accept primitive types', function() {
    		assert.throws(function(){
    			object.setContent(1);
    		});
    		
    		assert.throws(function(){
    			object.setContent(true);
    		});
    		
    		assert.throws(function(){
    			object.setContent("Bubu");
    		});
        });
    	
    });
    
    describe('setId/getId', function() {
    	it('should set the Id', function() {
    		object.setId("123xdqree4aaxc");
            assert.deepEqual(object.getId(), "123xdqree4aaxc");
        });
    	
    	it('should accept not null as id', function() {
    		assert.throws(function(){
    			object.setId(null);
    		});
        });
    	
    });
    
    
	describe('toJSON', function() {
		it('maps properties correctly (check if conversion is performed correctly)', function() {
			object.addAuthor("whatever");
			object.setContent({foo:"bar", nested:{bar:"foo"}});
			
			var newJSONObj = object.toJSON();
			assert.deepEqual(["whatever"], newJSONObj["authors"]);
			assert.deepEqual({foo:"bar", nested:{bar:"foo"}}, newJSONObj["content"]);
		});
	});
	
	describe('toString', function() {
		it('returns non-empty string', function() {
			assert.equal(typeof object.toString(), 'string');
			assert.ok(object.toString().length > 0);
		});
		it('is automatically used in string context', function() {
			var description = '' + object;
			assert.ok(description.length > 0);
		});
	});
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    describe('getPassword', function() {
//    	it('returns a value if password was provided', function() {
//    		user.setPassword('secret');
//    		assert.equal(typeof user.getPassword(), 'string');
//        });
//    	it('does not return the unencrypted password', function() {
//    		var password = 'secret';
//    		user.setPassword(password);
//    		assert.notStrictEqual(user.getPassword(), password);
//        });
//    });
//    
//    describe('hasPassword', function() {
//		it('returns false if an invalid password is given', function() {
//    		user.setPassword('secret');
//    		assert.ok(user.hasPassword('invalid') === false);
//        });
//		it('returns true if the correct password is passed', function() {
//			user.setPassword('secret');
//    		assert.ok(user.hasPassword('secret') === true);
//        });
//		it('returns false if no password is available', function() {
//			assert.ok(user.hasPassword('any') === false);
//		});
//    });
//    
//    describe('getFirstname', function() {
//		it('returns correct value', function() {
//    		user.setFirstname('Max');
//    		assert.equal(user.getFirstname(), 'Max');
//        });
//    });
//    
//    describe('getLastname', function() {
//		it('returns correct value', function() {
//			user.setLastname('Mustermann');
//    		assert.equal(user.getLastname(), 'Mustermann');
//        });
//    });
//    
//    describe('getEmail', function() {
//		it('returns null if no address was provided', function() {
//    		assert.ok(user.getEmail() === null);
//        });
//		it('returns correct value', function() {
//    		user.setEmail('example@geoquest.com');
//    		assert.equal(user.getEmail(), 'example@geoquest.com');
//        });
//		it('throws exception if invalid address is provided', function() {
//    		assert.throws(function() {
//    			user.setEmail('invalid');
//    		});
//        });
//    });
//    
//    describe('getIdentifier', function() {
//		it('returns expected value', function() {
//			user.setIdentifier("12243435436345235");
//    		assert.equal(user.getIdentifier(), "12243435436345235");
//        });
//    }); 
//    
//    describe('fromJSON', function() {
//		it('returns a User object', function() {
//			var json = {
//				"identifier": "42", 
//				"password": "this_should_be_an_encrypted_password",
//				"firstname": "Max",
//				"lastname": "Mustermann",
//				"loginType": "Facebook",
//				"email": "lulu@yahoo.com"
//			};
//			assert.ok(User.fromJSON(json) instanceof User.class);
//        });
//		it('throws exception if property is missing', function() {
//			var json = {
//				"identifier": "42", 
//				"firstname": "Max",
//				"lastname": "Mustermann",
//				"loginType": "Facebook",
//				"email": "lulu@yahoo.com"
//			};
//			assert.throws(function() {
//				User.fromJSON(json);
//			});
//        });
//		it('maps properties correctly', function() {
//			var json = {
//				"identifier": "42", 
//				"password": "this_should_be_an_encrypted_password",
//				"firstname": "Max",
//				"lastname": "Mustermann",
//				"loginType": "Facebook",
//				"email": "lulu@yahoo.com"
//			};
//			var user = User.fromJSON(json);
//			assert.ok(user instanceof User.class);
//			assert.equal(user.getIdentifier(), '42');
//			assert.equal(user.getPassword(), 'this_should_be_an_encrypted_password');
//			assert.equal(user.getFirstname(), 'Max');
//			assert.equal(user.getLastname(), 'Mustermann');
//			assert.equal(user.getLoginType(), 'Facebook');
//			assert.equal(user.getEmail(), 'lulu@yahoo.com');
//        });
//		it('works with empty password', function() {
//			var json = {
//				"identifier": "42", 
//				"password": null,
//				"firstname": "Max",
//				"lastname": "Mustermann",
//				"loginType": "Facebook",
//				"email": "lulu@yahoo.com"
//			};
//			assert.ok(User.fromJSON(json) instanceof User.class);
//        });
//		it('works with empty email', function() {
//			var json = {
//				"identifier": "42", 
//				"password": "this_should_be_an_encrypted_password",
//				"firstname": "Max",
//				"lastname": "Mustermann",
//				"loginType": "Facebook",
//				"email": null
//			};
//			assert.ok(User.fromJSON(json) instanceof User.class);
//        });
//		it('throws exception if no object is provided', function() {
//			assert.throws(function() {
//				User.fromJSON('This is not valid');
//			});
//		});
//    });
//    


