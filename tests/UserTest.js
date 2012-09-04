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
    		user.setPassword('secret');
    		assert.equal('String', typeof user.getPassword());
        });
    	it('does not return the unencrypted password', function() {
    		var password = 'secret';
    		user.setPassword(password);
    		assert.notStrictEqual(password, user.getPassword());
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
    });
    
    describe('getFirstname', function() {
		it('returns correct value', function() {
    		user.setFirstname('Max');
    		assert.equal('Max', user.getFirstname());
        });
    });
    
    describe('getLastname', function() {
		it('returns correct value', function() {
			user.setLastname('Mustermann');
    		assert.equal('Mustermann', user.getLastname());
        });
    });
    
    describe('getEmail', function() {
		it('returns null if no address was provided', function() {
    		assert.ok(user.getEmail() === null);
        });
		it('returns correct value', function() {
    		user.setEmail('example@geoquest.com');
    		assert.equal('example@geoquest.com', user.getEmail());
        });
		it('throws exception if invalid address is provided', function() {
    		assert.throws(function() {
    			user.setEmail('invalid');
    		});
        });
    });
});
