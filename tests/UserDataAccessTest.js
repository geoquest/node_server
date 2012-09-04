var assert = require("assert");

var Repository = require("../ServerComponents/UserDataAccess.js");

describe('UserDataAccess', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {UserDataAccess.class}
	 */
	var repository = null;
	
	var connectionMock = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		connectionMock = {};
		repository =  new Repository.class(connectionMock);
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		repository = null;
		connectionMock = null;
	});
	
    describe('constructor', function() {
        it('should create a UserDataAccess instance', function() {
            assert.ok(repository instanceof Repository.class);
        });
        it('throws exception if connection is omitted', function() {
            assert.throws(function() {
            	new Repository.class();
            });
        });
        it('throws exception if invalid connection is provided', function() {
            assert.throws(function() {
            	new Repository.class(null);
            });
        });
    });
    
});  