var assert = require("assert");

var Resource = require("../ServerComponents/Resource.js");
var ResourceRepository = require("../ServerComponents/ResourceRepository.js");
var User = require("../ServerComponents/User.js");
var Game = require("../ServerComponents/Game.js");


/**
 * TODO: move connectionMock to separate (utility) class
 */

describe('ResourceRepository', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {ResourceRepository.class}
	 */
	var repository = null;

	/**
	 * Simple object that is used to simulate the GridFS connection.
	 * 
	 * @var {Object}
	 */
	var gridFS = null;
	
	/**
	 * Simple object that is used to simulate the MongoDB connection.
	 * 
	 * @var {Object}
	 */
	var connection = null;

	/**
	 * Simulates a MongoDB result set that contains the
	 * requested number of files.
	 * 
	 * @param {integer} numberOfFiles
	 * @return {Object}
	 */
	var createResult = function(numberOfFiles) {
		var result = {};
		// Simulate the requested number of file meta data entries.
		for (var i = 0; i < numberOfFiles; i++) {
			result[i] = {
				"_id": i,
				"filename": "lulufile" + i + ".txt",
				"contentType": "text/plain",
				"metadata": {
					"game_id": "game-lulu",
					"user_id": "user-huhu",
					"date": new Date('2012-09-20 11:55:00')
				}
			};
		}
		// Simulate the length property that is available
		// on result collection.
		result.length = numberOfFiles;

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
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		gridFS = {
			saveFile: function() {
			}
		};
		connection = {
			fs: {
				files: {
					// Simulates an empty result set per default.
					find: createFind(createResult(0))
				}
			}
		};
		repository = new ResourceRepository.class(gridFS, connection);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		gridFS = null;
		repository = null;
		connection = null;
	});

    describe('constructor', function() {
        it('should create a ResourceRepository instance', function() {
            assert.ok(repository instanceof ResourceRepository.class);
        });
        it('throws exception if gridFSConnection is omitted', function() {
            assert.throws(function() {
            	new ResourceRepository.class();
            });
        });
        it('throws exception if connection is invalid or could not be established', function() {
            assert.throws(function() {
            	new ResourceRepository.class(null);
            });
        });
    });

    describe('insert', function() {
    	var resource = null;

    	beforeEach(function() {
    		resource = new Resource.class();
    		resource._filename = "file";
    		resource._tempPath = "C:\some\path\to\file";
    		resource._game = new Game.class();		
    		resource._user = new User.class();
    	});

    	it('fails if parameter to insert is not an instance of Resource', function() {
    		assert.throws(function() {
        		repository.insert();
            });
    		assert.throws(function() {
        		repository.insert(null);
            });
    		assert.throws(function() {
        		repository.insert("string");
            });
    		assert.throws(function() {
        		repository.insert(true);
            });
    		assert.throws(function() {
        		repository.insert(1);
            });
    	});

    	it('fails if the passed resource is invalid', function() {
        	assert.throws(function() {
        		repository.insert(new Resource.class());
        	});
    	});

    	it('calls the saveFile function of the GridFSConnection object', function(done){    		
    		gridFS.saveFile = function() {
    			done();
    		};
    		repository.insert(resource);
    	});

    	it('calls the saveFile function with the appropriate filename and filepath',function(done){
    		
    		gridFS.saveFile = function(fileName, filePath) {
    			assert.equal(fileName, "abc");
    			assert.equal(filePath, "def");
    			done();
    		};
    		
    		resource._filename = "abc";    		
    		resource._tempPath = "def";
    		
    		repository.insert(resource);
    	});
    	
    	it('calls the saveFile function with the appropriate metadata', function(done){
    		
    		gridFS.saveFile = function(fileName, filePath, metadata) {
    			assert.equal(metadata.game_id, "123456789");
    			assert.equal(metadata.user_id, "09875");
    			assert.equal(metadata.date, "1234");
    			done();
    		};
    		
    		resource._game.__id = "123456789";
    		resource._user._id = "09875";
    		resource._date = "1234";
    		
    		repository.insert(resource);
    	});

    }); 

});  
