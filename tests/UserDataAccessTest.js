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
	 * Creates a simulated find method.
	 * 
	 * If a string is provided then an error will be
	 * simulated. Otherwise the given result will be 
	 * returned.
	 * 
	 * @param {Object}|{String} Result or error message.
	 * @return {function}
	 */
	var createFind = function(result) {
		/**
		 * Simulates the find() function of MongoDB.
		 * 
		 * @param {Object} query JSON object that specifies the query criteria.
		 * @param {function} callback Callback that receives an error and the result.
		 */
		var find = function(query, callback) {
			if ((typeof result) === 'string') {
				// Simulate an error.
				callback(result, createResult(0));
			} else {
				// Simulate a returned collection.
				callback(null, result);
			}
		};
		return find;
	};
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		connectionMock = {
			users: {
				// Simulates an empty result set per default.
				find: createFind(createResult(0))
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
        it('returns a user if found', function(done) {
        	connectionMock.users.find = createFind(createResult(1));
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
        it('throws exception if an internal mongodb error occurred', function(done) {
        	connectionMock.users.find = createFind('Database not available.');
            assert.throws(function() {
            	repository.byGoogleIdentifier('identifier', function(result) {
            		// This callback should not be called, instead an exception
            		// should be thrown by the access layer in case of error.
            		done();
            	});
            });
        });
    });
    
    describe('byFacebookIdentifier', function() {
        it('returns a user if found', function(done) {
        	connectionMock.users.find = createFind(createResult(1));
        	repository.byFacebookIdentifier('identifier', function(result) {
        		assert.ok(result instanceof User.class);
        		done();
        	});
        });
        it('returns null if user was not found', function(done) {
        	repository.byFacebookIdentifier('identifier', function(result) {
        		assert.strictEqual(result, null);
        		done();
        	});
        });
        it('throws exception if an internal mongodb error occurred', function(done) {
        	connectionMock.users.find = createFind('Database not available.');
            assert.throws(function() {
            	repository.byFacebookIdentifier('identifier', function(result) {
            		// This callback should not be called, instead an exception
            		// should be thrown by the access layer in case of error.
            		done();
            	});
            });
        });
    });
    
    describe('byGeoQuestIdentifier', function() {
        it('returns a user if found', function(done) {
        	connectionMock.users.find = createFind(createResult(1));
        	repository.byGeoQuestIdentifier('identifier', function(result) {
        		assert.ok(result instanceof User.class);
        		done();
        	});
        });
        it('returns null if user was not found', function(done) {
        	repository.byGeoQuestIdentifier('identifier', function(result) {
        		assert.strictEqual(result, null);
        		done();
        	});
        });
        it('throws exception if an internal mongodb error occurred', function(done) {
            assert.throws(function() {
            	connectionMock.users.find = createFind('Database not available.');
                assert.throws(function() {
                	repository.byGeoQuestIdentifier('identifier', function(result) {
                		// This callback should not be called, instead an exception
                		// should be thrown by the access layer in case of error.
                		done();
                	});
                });
            });
        });
    });
    
});  