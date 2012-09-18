var assert = require("assert");

var Game = require("../ServerComponents/Game.js");
var GameRepository = require("../ServerComponents/GameRepository.js");
var User = require("../ServerComponents/User.js");


/**
 * TODO: move connectionMock to separate (utility) class
 */

describe('GameRepository', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {GameRepository.class}
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
	 * requested number of games.
	 * 
	 * @param {integer} number
	 * @return {Object}
	 */
	var createResult = function(number) {
		var result = {};
		// Simulate the requested number of game entries.
		for (var i = 0; i < number; i++) {
			result[i] = {
				"_id": i,
				"authors": [],
				"content": {
					"name": "Game " + i
				}
			};
		}
		// Simulate the length property that is available
		// on result collection.
		result.length = number;

	    return result;
	};
	
	
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
	
	var createObjectId = function(id){
		return {id:id}; 
	};
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		
		connectionMock = {
			games: {
				// Simulates an empty result set per default.
				find: createFind(createResult(0))
			},
			ObjectId: createObjectId
		};
		repository = new GameRepository.class(connectionMock);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		repository = null;
		connectionMock = null;
	});

    describe('constructor', function() {
        it('should create a GameRepository instance', function() {
            assert.ok(repository instanceof GameRepository.class);
        });
        it('throws exception if connection is omitted', function() {
            assert.throws(function() {
            	new GameRepository.class();
            });
        });
        it('throws exception if connection is invalid or could not be established', function() {
            assert.throws(function() {
            	new GameRepository.class(null);
            });
        });
    });
    
    describe('insertGame', function() {
    	it('successfully inserts Game object', function(done) {
    		connectionMock.games.insert = function(game) {
    			assert.ok((typeof game) === 'object');
    			done();
    		};
    		var tempGame = new Game.class();
    		repository.insert(tempGame);
    	});

    	it('fails if parameter to insert is not an instance of Game', function() {
    		connectionMock.games.insert = function() {};

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
    }); 
    
    describe('findGames', function(){
    	it('successfully finds all Game objects', function(done){
        	connectionMock.games.find = createFind(createResult(10));
    		repository.findAll(function(result){
    			assert.equal(result.length, 10);
    			done();
    		});
    	});
    	
    	it('should return empty list when 0 games contained in db', function(done){
        	connectionMock.games.find = createFind(createResult(0));
    		repository.findAll(function(result){
    			assert.equal(result.length, 0);
    			done();
    		});
    	});
    	
    	
    });

    describe('findAllByUser', function(){
    	it('should create a query object containing the user id', function(done){
    		var user = new User.class();
    		user.setId("12");
    		
        	connectionMock.games.find = function(query, callback) {
        		assert.deepEqual(query, {authors:"12"});
        		done();
    		};

    		repository.findAllByUser(user);
    	});
 
    });
    

    describe('findGameById', function(){
    	it('should create a query object containing the game id', function(done){
    		var game = new Game.class();
    		game.setId("12");
    		
        	connectionMock.games.find = function(query, callback) {
        		        		
        		assert.deepEqual(query, { _id: connectionMock.ObjectId("12") });
        		done();
    		};

    		repository.findGameById(game.getId());
    	});
    	
    	it('should return a game', function(done){
        	connectionMock.games.find = createFind(createResult(1));
        	repository.findGameById('game-id', function(result){
    			assert.ok(result instanceof Game.class);
    			done();
    		});
    	});
    	
    	it('returns game that contains correct content', function(done) {
    		connectionMock.games.find = createFind(createResult(1));
        	repository.findGameById('game-id', function(result){
    			assert.equal(result.getId(), 0);
    			assert.equal(result.getName(), "Game 0");
    			done();
    		});
    	});
    	
    	it('returns null if no game was found', function(done) {
    		connectionMock.games.find = createFind(createResult(0));
        	repository.findGameById('game-id', function(result){
    			assert.strictEqual(result, null);
    			done();
    		});
    	});
    	
    });
});  
