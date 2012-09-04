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
    
    describe('getPassword', function() {
    	it('returns a value if password was provided', function() {
    		
        });
    	it('does not return the unencrypted password', function() {
    		
        });
    });
    
    describe('hasPassword', function() {
		it('returns false if an invalid password is given', function() {
    		
        });
		it('returns true if the correct password is passed', function() {
    		
        });
    });
    
    describe('getFirstname', function() {
		it('returns correct value', function() {
    		
        });
    });
    
    describe('getLastname', function() {
		it('returns correct value', function() {
    		
        });
    });
    
    describe('getEmail', function() {
		it('returns null if no address was provided', function() {
    		
        });
		it('returns correct value', function() {
    		
        });
		it('throws exception if invalid address is provided', function() {
    		
        });
    });
});
