var assert = require("assert");

var AuthorRelated = require("../../../ServerComponents/pages/games/AuthorRelated.js");
var Request = require("../../../ServerComponents/util/test/Request");
var Response = require("../../../ServerComponents/util/test/Response");
var User = require("../../../ServerComponents/User");
var Game = require("../../../ServerComponents/Game");

describe('AuthorRelated games page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {AuthorRelated.class}
	 */
	var page = null;
	
	/**
	 * The simulated request.
	 * 
	 * @var {Request.class}
	 */
	var request = null;
	
	/**
	 * The simulated response.
	 * 
	 * @var {Response.class}
	 */
	var response = null;
	
	/**
	 * The simulated game repository.
	 * 
	 * @var {Object}
	 */
	var gameRepository = null;
	
	/**
	 * Creates a user for testing.
	 * 
	 * @return {User.class}
	 */
	var createUser = function() {
		var user = new User.class();
		user.setLoginType('GeoQuest');
		user.setIdentifier('max.mustermann');
		user.setPassword('secret');
		return user;
	};
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		request = new Request.class();
		// Simulate a logged-in user per default.
		request.session.user = createUser();
		response = new Response.class();
		gameRepository = {
			findAllByUser: function(user, callback) {
				// Simulate empty list of games
				callback([]);
			}
		};
		page = new AuthorRelated.class();
		page.setGameRepository(gameRepository);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
		gameRepository = null;
		response = null;
		request = null;
	});
	
	describe('constructor', function() {
		it('creates page object', function() {
			assert.ok(page instanceof AuthorRelated.class);
		});
	});
	
	describe('handleRequest', function() {
		it('passes logged in user to game repository', function(done) {
			gameRepository.findAllByUser = function(user, callback) {
				assert.equal(user.getIdentifier(), request.session.user.getIdentifier());
				callback([]);
				done();
			};
			page.handleRequest(request, response);
		});
		it('renders games template', function() {
			page.handleRequest(request, response);
			assert.equal(response.template, 'games/list.ejs');
		});
		it('passes received games to template', function() {
			var games = [new Game.class(), new Game.class()];
			gameRepository.findAllByUser = function(user, callback) {
				// Simulate list of games.
				callback(games);
			};
			page.handleRequest(request, response);
			assert.deepEqual(response.templateVars['games'], games);
		});
	});
	
});