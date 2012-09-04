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
	
	var connection = require("mongojs").connect(dbconf.url, dbconf.collections);
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		connectionMock = {
			users: {
				/**
				 * 
				 * @param {Object} query JSON object that specifies the query criteria.
				 * @param {function} callback Callback that receives an error and the result.
				 */
				find: function(query, callback) {
					// Simulate an empty result per default.
					callback(null, {});
				}
			}
		};
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
        it('throws exception if connection is invalid or could not be established', function() {
            assert.throws(function() {
            	new Repository.class(null);
            });
        });
    });
    
});  