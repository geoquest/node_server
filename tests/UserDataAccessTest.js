var assert = require("assert");

var User = require("../ServerComponents/User.js");
var Repository = require("../ServerComponents/UserDataAccess.js");

describe('UserDataAccess', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {UserDataAccess.class}
	 */
	var repository = null;
	
	/**
	 * Simple object that is used to simulate the mongodb connection.
	 * 
	 * @var {Object}
	 */
	var connectionMock = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		connectionMock = {
			users: {
				/**
				 * Simulates the find() function of MongoDB.
				 * 
				 * @param {Object} query JSON object that specifies the query criteria.
				 * @param {function} callback Callback that receives an error and the result.
				 */
				find: function(query, callback) {
					// Simulate an empty result per default.
					var result = {
					    'count': function() {
					    	return 0;
					    }
					};
					callback(null, result);
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
    
    describe('byGoogleIdentifier', function() {
        it('returns a user if found', function() {
            
        });
        it('returns null if user was not found', function() {
            assert.throws(function() {
            	
            });
        });
        it('throws exception if an internal mongodb error occurred', function() {
            assert.throws(function() {
            	
            });
        });
    });
    
    describe('byFacebookIdentifier', function() {
        it('returns a user if found', function() {
            
        });
        it('returns null if user was not found', function() {
            assert.throws(function() {
            	
            });
        });
        it('throws exception if an internal mongodb error occurred', function() {
            assert.throws(function() {
            	
            });
        });
    });
    
    describe('byGeoQuestIdentifier', function() {
        it('returns a user if found', function() {
            
        });
        it('returns null if user was not found', function() {
            assert.throws(function() {
            	
            });
        });
        it('throws exception if an internal mongodb error occurred', function() {
            assert.throws(function() {
            	
            });
        });
    });
    
});  