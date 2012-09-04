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
	 * Simulates a MongoDB result set that contains the
	 * requested number of users.
	 * 
	 * @param {integer} numberOfUsers
	 * @return {Object}
	 */
	var createResult = function(numberOfUsers) {
		var result = {};
		// Simulate the requested number of user entries.
		for (var i = 0; i < numberOfUsers; i++) {
			result[i] = {
				"identifier": i, 
				"password": "werwew",
				"firstname": "bfbv",
				"lastname": "fdfdf",
				"loginType": "Facebook",
				"email": "lulu@yahoo.com"
			};
		}
		// Simulate the count() operation that is available
		// on result collection.
		result.count = function() {
	    	return numberOfUsers;
	    };
	};
	
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
					var result = createResult(0);
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
        	// TODO: simulate user
        	repository.byGoogleIdentifier('identifier', function(result) {
        		assert.ok(result instanceof User.class);
        		done();
        	});
        });
        it('returns null if user was not found', function(done) {
        	repository.byGoogleIdentifier('identifier', function(result) {
        		assert.strictEqual(result, null);
        		done();
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
    		
        });
        it('throws exception if an internal mongodb error occurred', function() {
            assert.throws(function() {
            	
            });
        });
    });
    
});  