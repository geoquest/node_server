var assert = require("assert");
var util = require("util");

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
			'fs.files': {
				// Simulates an empty result set per default.
				find: createFind(createResult(0))
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
    		resource.setGameId('game-lulu');	
    		resource.setUserId('user-lulu');
    		resource.setDate(new Date('2012-09-20 15:30:00'));
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
        		repository.insert({});
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
    			assert.equal(metadata.game_id, "game-lulu");
    			assert.equal(metadata.user_id, "user-lulu");
    			assert.equal(metadata.date.toString(), new Date('2012-09-20 15:30:00').toString());
    			done();
    		};
    		
    		repository.insert(resource);
    	});

    });
    
    describe('findById()', function() {
    	it('should throw an exception if provided id is undefined', function() {
    		assert.throws(function() {
    			repository.findById(undefined, function() {});
    		});
    	});
    	
    	it('should throw an exception if callback is omitted', function() {
    		assert.throws(function() {
    			repository.findById('12345');
    		});
    	});
    	
    	it('should return null if resource record was not found', function(done) {
    		var resultHandler = function(resource) {
    			assert.strictEqual(resource, null);
    			done();
    		};
    		repository.findById('12345', resultHandler);
    	});
    	
    	it('should return Resource object if record was found', function(done) {
    		connection['fs.files'].find = createFind(createResult(1));
    		var resultHandler = function(resource) {
    			assert.ok(resource instanceof Resource.class);
    			done();
    		};
    		repository.findById('12345', resultHandler);
    	});
    	
    	it('should populate the Resource object correctly', function(done) {
    		connection['fs.files'].find = createFind(createResult(1));
    		var resultHandler = function(resource) {
    			assert.equal(resource.getId(), 0);
    			assert.equal(resource.getFilename(), 'lulufile0.txt');
    			assert.equal(resource.getGameId(), 'game-lulu');
    			assert.equal(resource.getUserId(), 'user-huhu');
    			assert.equal(resource.getDate().toString(), new Date('2012-09-20 11:55:00').toString());
    			assert.equal(resource.getMimeType(), 'text/plain');
    			done();
    		};
    		repository.findById('12345', resultHandler);
    	});
    	
    	it('should inject GridFS connection into resource object', function(done) {
    		connection['fs.files'].find = createFind(createResult(1));
    		var resultHandler = function(resource) {
    			assert.strictEqual(resource._gridFSConnection, gridFS);
    			done();
    		};
    		repository.findById('12345', resultHandler);
    	});
    });
    
    describe('findAllByGame()', function() {
    	var game = null;
    	
    	beforeEach(function() {
    		game = new Game.class();
    		game.setId('12345');
    	});
    	
    	afterEach(function() {
    		game = null;
    	});
    	
    	it('should throw an exception if callback is omitted', function() {
    		assert.throws(function() {
    			repository.findAllByGame(game);
    		});
    	});
    	
    	it('should return an empty array if no resource was found', function(done) {
    		var resultHandler = function(resources) {
    			assert.ok(util.isArray(resources));
    			assert.equal(resources.length, 0);
    			done();
    		};
    		repository.findAllByGame(game, resultHandler);
    	});
    	
    	it('should return the correct number of resources', function(done) {
    		connection['fs.files'].find = createFind(createResult(5));
    		var resultHandler = function(resources) {
    			assert.ok(util.isArray(resources));
    			assert.equal(resources.length, 5);
    			done();
    		};
    		repository.findAllByGame(game, resultHandler);
    	});
    	
    	it('should return an array of Resource objects', function(done) {
    		connection['fs.files'].find = createFind(createResult(3));
    		var resultHandler = function(resources) {
    			for (var index in resources) {
    				assert.ok(resources[index] instanceof Resource.class);
    			}
    			done();
    		};
    		repository.findAllByGame(game, resultHandler);
    	});
    	
    	it('should populate the Resource objects correctly', function(done) {
    		connection['fs.files'].find = createFind(createResult(1));
    		var resultHandler = function(resources) {
    			assert.equal(resources.length, 1);
    			var resource = resources[0];
    			assert.equal(resource.getId(), 0);
    			assert.equal(resource.getFilename(), 'lulufile0.txt');
    			assert.equal(resource.getGameId(), 'game-lulu');
    			assert.equal(resource.getUserId(), 'user-huhu');
    			assert.equal(resource.getDate().toString(), new Date('2012-09-20 11:55:00').toString());
    			assert.equal(resource.getMimeType(), 'text/plain');
    			done();
    		};
    		repository.findAllByGame(game, resultHandler);
    	});
    	
    	it('should inject GridFS connection into all resource objects', function(done) {
    		connection['fs.files'].find = createFind(createResult(1));
    		var resultHandler = function(resources) {
    			assert.equal(resources.length, 1);
    			var resource = resources[0];
    			assert.strictEqual(resource._gridFSConnection, gridFS);
    			done();
    		};
    		repository.findAllByGame(game, resultHandler);
    	});
    });

});  
