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
		// Simulate the length property that is available
		// on result collection.
		result.length = numberOfUsers;

	    return result;
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
	 * Creates a simulated insert method.
	 * 
	 * When a string is provided instead of a JSON object an error will be simulated.
	 * Otherwise it will pretend the JSON Object was successfully added to the DB.
	 */
	var createInsert = function(jsonObj) {
	    /**
	     * Simulates the insert() function in MongoDB.
	     */
	    var insert = function(query, callback) {
	        if ((typeof jsonObj) === 'string') {
	            //simulate err
	            callback(jsonObj);
	        } else {
	            //simulate a successful insert
	            callback(null);
	        }
	    };
        return insert;
	};
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		connectionMock = {
			users: {
				// Simulates an empty result set per default.
				find: createFind(createResult(0)),
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
        it('calls error handler if an internal mongodb error occurred', function(done) {
        	connectionMock.users.find = createFind('Database not available.');
        	repository.addErrorHandler(function(error) {
        		done();
        	});
        	repository.byGoogleIdentifier('identifier', function(result) {
        		// This callback should not be called, instead the access 
        		// layer should call the error handler callback.
        		assert.fail('Result callback should not be called.');
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
        it('calls error handler if an internal mongodb error occurred', function(done) {
        	connectionMock.users.find = createFind('Database not available.');
        	repository.addErrorHandler(function(error) {
        		done();
        	});
        	repository.byFacebookIdentifier('identifier', function(result) {
        		// This callback should not be called, instead the access 
        		// layer should call the error handler callback.
        		assert.fail('Result callback should not be called.');
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
        it('calls error handler if an internal mongodb error occurred', function(done) {
        	connectionMock.users.find = createFind('Database not available.');
        	repository.addErrorHandler(function(error) {
        		done();
        	});
        	repository.byGeoQuestIdentifier('identifier', function(result) {
        		// This callback should not be called, instead the access 
        		// layer should call the error handler callback.
        		assert.fail('Result callback should not be called.');
        	});
        });
    });
    
    describe('insertUser', function() {
        it('works if the GQ user we try to insert is not already in the DB', function(done) {
            connectionMock.users.insert = function(userAsJson) {
                assert.ok((typeof userAsJson) === 'object');
                done();
            };
            var tempUser =  new User.class();
            tempUser.setLoginType("GeoQuest");
            tempUser.setIdentifier("Gigel");
            tempUser.setPassword("whatever");
            repository.insertUser(tempUser);
        });
        
        it('works if the FB user we try to insert is not already in the DB', function(done) {
            connectionMock.users.insert = function(userAsJson) {
                assert.ok((typeof userAsJson) === 'object');
                done();
            };
            var tempUser =  new User.class();
            tempUser.setLoginType("Facebook");
            tempUser.setIdentifier("Gigel");
            repository.insertUser(tempUser);
        });
        
        it('works if the G+ user we try to insert is not already in the DB', function(done) {
            connectionMock.users.insert = function(userAsJson) {
                assert.ok((typeof userAsJson) === 'object');
                done();
            };
            var tempUser =  new User.class();
            tempUser.setLoginType("Google");
            tempUser.setIdentifier("Gigel");
            repository.insertUser(tempUser);
        });
        
        it('fails because the GQ user is already in the DB', function(done) {
            connectionMock.users.insert = function(userAsJson) {
                assert.fail('Insert should not be called.');
            };
            repository.addErrorHandler(function(error) {
                done();
            });
            connectionMock.users.find = createFind(createResult(1));
            var tempUser =  new User.class();
            tempUser.setLoginType("GeoQuest");
            tempUser.setIdentifier("1");
            tempUser.setPassword("whatever");
            repository.insertUser(tempUser);
        });
        
        it('fails because the FB user is already in the DB', function(done) {
            connectionMock.users.insert = function(userAsJson) {
                assert.fail('Insert should not be called.');
            };
            repository.addErrorHandler(function(error) {
                done();
            });
            connectionMock.users.find = createFind(createResult(1));
            var tempUser =  new User.class();
            tempUser.setLoginType("GeoQuest");
            tempUser.setIdentifier("1");
            repository.insertUser(tempUser);
        });
        
        it('fails because the G+ user is already in the DB', function(done) {
            connectionMock.users.insert = function(userAsJson) {
                assert.fail('Insert should not be called.');
            };
            repository.addErrorHandler(function(error) {
                done();
            });
            connectionMock.users.find = createFind(createResult(1));
            var tempUser =  new User.class();
            tempUser.setLoginType("GeoQuest");
            tempUser.setIdentifier("1");
            repository.insertUser(tempUser);
        });
        
        it('fails to insert in the DB for unknown DB access error', function(done) {
            connectionMock.users.insert = createInsert('Error inserting to DB. You may not have rights.');
            repository.addErrorHandler(function(error) {
                done();
            });
            var tempUser = new User.class();
            tempUser.setLoginType("GeoQuest");
            tempUser.setIdentifier("Gigel");
            tempUser.setPassword("whatever");
            repository.insertUser(tempUser);
        });
        it('does not notify error handlers if insert succeeds', function(done) {
            connectionMock.users.insert = function(jsonObject, errorCallback) {
                errorCallback(null);
                done();
            };
            repository.addErrorHandler(function(error) {
                assert.fail('Error handlers should not be notified on success.');
            });
            var tempUser = new User.class();
            tempUser.setLoginType("GeoQuest");
            tempUser.setIdentifier("Gigel");
            tempUser.setPassword("whatever");
            repository.insertUser(tempUser);
        });
    });
    
});  
