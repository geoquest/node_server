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
		user =  new User.class();
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
            assert.equal('Facebook', user.getLoginType());
        });
    	it('throws an exception if value is not valid', function() {
    		assert.throws(function() {
    			user.setLoginType('Invalid');
    		});
    	});
    	
    });
});
