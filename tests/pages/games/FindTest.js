var assert = require("assert");

var Find = require("../../../ServerComponents/pages/games/Find.js");

describe('games/Find page', function() {
	
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
				"authors": [], 
				"content": {}
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
		var findAll = function(callback) {
			if ((typeof result) === 'string') {
				// Simulate an error.
				callback(createResult(0));
			} else {
				// Simulate a returned collection.
				callback(result);
			}
		};
		return findAll;
	};

	/**
	 * System under test.
	 * 
	 * @var {Find.class}
	 */
	var page = null;
	
	/**
	 * A simulated User repository.
	 * 
	 * @var {Object}
	 */
	var gameRepository = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		var result = createResult(10);
		gameRepository = {
			result : result,
			findAll: createFind(result)
		};
		page = new Find.class();
		page.setGameRepository(gameRepository);
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
		gameRepository = null;
	});
	
	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof Find.class);
		});
	});
	
	describe('find', function(){
		it("should display a JSON, that contains all uploaded games", function(){
			var req = {}, 
				res = {
					responseText : "",
					header : "",
					write: function(text){this.responseText+=text;},
					setHeader: function(name, value){this.header = name+"/"+value;},
					end : function(text){} 
			};
			page.handleRequest(req,res);
			assert.equal(res.responseText, "jsonCallback({\"games\":  " + JSON.stringify(gameRepository.result) +"})");
			assert.equal(res.header, "Content-Type/application/json;charset=UTF-8");
		});
	});
	
});