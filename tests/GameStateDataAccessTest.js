var GameStateDataAccess = require('../ServerComponents/GameStateDataAccess');
var GameState = require('../ServerComponents/GameState');
var User = require('../ServerComponents/User');

var assert = require("assert");


describe('GameStateDataAccess layer', function() {

	/**
	 * System under test.
	 * 
	 * @var {}
	 */
	var repository = null;

	/**
	 * The simulated MongoDB connection.
	 * 
	 * @var {Object}
	 */
	var connection = null;
	
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
	 * Creates a non-empty game state result.
	 * 
	 * @return {Object}
	 */
	var createResult = function() {
		var results = {};
		results[0] = {
			'_id': 'mongo-db-id',
			'userId': 'uid',
			'state': {
				'id': 'gsid'
			}
		};
		results.length = 1;
		return results;
	};
	
	/**
	 * Creates a user object for testing.
	 * 
	 * @return {User.class}
	 */
	var createUser = function() {
		var user = new User.class();
		user.setId('uid-in-database');
		user.setLoginType('GeoQuest');
		user.setIdentifier('max.power');
		return user;
	};
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		var result = {};
		result.length = 0;
		connection = {
			gameStates: {
				// Simulates an empty result set per default.
				find: createFind(result),
				save: function(obj) {
				}
			}
		};
		repository = new GameStateDataAccess.class(connection);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		repository = null;
		connection = null;
	});

	describe('constructor', function() {
		it('creates instance', function() {
			assert.ok(repository instanceof GameStateDataAccess.class);
		});
		it('throws exception if connection is omitted', function() {
			assert.throws(function() {
				new GameStateDataAccess.class();
			});
		});
	});
	
	describe('save', function() {
		it('creates new record if the state did not exist', function(done) {
			// Per default an empty result set is simulated.
			connection.gameStates.save = function(object) {
				assert.strictEqual(object._id, undefined);
				done();
			};
			var state = new GameState.class({'id': 'another-state-id'});
			repository.save(state);
		});
		it('updates the old record if the state already existed', function(done) {
			connection.gameStates.find = createFind(createResult());
			connection.gameStates.save = function(object) {
				assert.notStrictEqual(object._id, undefined);
				assert.equal(object._id, 'mongo-db-id');
				done();
			};
			var state = new GameState.class({'id': 'gsid'});
			repository.save(state);
		});
	});
	
	describe('byGameSessionId', function() {
		it('returns null if state does not exist', function(done) {
			var callback = function(state) {
				assert.strictEqual(state, null);
				done();
			};
			repository.byGameSessionId('any-id', createUser(), callback);
		});
		it('returns GameState object if record was found', function(done) {
			connection.gameStates.find = createFind(createResult());
			var callback = function(state) {
				assert.ok(state instanceof GameState.class);
				done();
			};
			repository.byGameSessionId('any-id', createUser(), callback);
		});
		it('filters by user id', function(done) {
			var originalFind = connection.gameStates.find;
			connection.gameStates.find = function(query, callback) {
				assert.equal(query.userId, 'uid-in-database');
				originalFind(query, callback);
				done();
			};
			repository.byGameSessionId('any-id', createUser(), function(){});
		});
		it('filters by game state session id', function(done) {
			var originalFind = connection.gameStates.find;
			connection.gameStates.find = function(query, callback) {
				assert.equal(query.state.id, 'any-id');
				originalFind(query, callback);
				done();
			};
			repository.byGameSessionId('any-id', createUser(), function(){});
		});
	});

});
