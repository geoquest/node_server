var assert = require("assert");

var Download = require("../../../ServerComponents/pages/games/Download.js");
var Game = require("../../../ServerComponents/Game.js");

describe('games/Download controller', function() {
	
	/**
	 * Simulates a game result of the findGameById() function.
	 * 
	 * @return {Game}
	 */
	var createResult = function() {
		var game = new Game.class();
		game.setId('504f05b13893d3a41f000002');
		game.addAuthor('author1');
		game.addAuthor('author2');
		game.setContent({"title":"Fancy title"});
	    return game;
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
				callback(createResult());
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
	var controller = null;
	
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
		var result = createResult();
		gameRepository = {
			result : result,
			findAll: createFind(result)
		};
		controller = new Download.class();
		controller.setGameRepository(gameRepository);
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		controller = null;
		gameRepository = null;
	});
	
	describe('constructor', function() {
		it('should create a controller instance', function() {
			assert.ok(controller instanceof Download.class);
		});
	});
	
	describe('download', function(){
		it("should display a JSON, that contains one game with full content, when game available", function(){
			gameRepository.findGameById = function (id, callback){
				callback(createResult());
			};
			var req = {
					query: {
						id: '504f05b13893d3a41f000002'
					}
			}, 
				res = {
					responseText : "",
					header : "",
					write: function(text){this.responseText+=text;},
					setHeader: function(name, value){this.header = name+"/"+value;},
					end : function(text){} 
			};
			controller.handleRequest(req,res);
			assert.equal(res.responseText, "jsonCallback({game: " + JSON.stringify(gameRepository.result) +"})");
			assert.equal(res.header, "Content-Type/application/json;charset=UTF-8");
		});
	});
	
});