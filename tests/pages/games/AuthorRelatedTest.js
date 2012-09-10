var assert = require("assert");

var AuthorRelated = require("../../../ServerComponents/pages/games/AuthorRelated.js");
var Request = require("../../../ServerComponents/util/test/Request");
var Response = require("../../../ServerComponents/util/test/Response");

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
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		request = new Request.class();
		response = new Response.class();
		gameRepository = {
				
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
			
		});
	});
	
	describe('handleRequest', function() {
		it('redirects to home if user is not logged', function() {
			
		});
		it('passes logged in user to game repository', function() {
			
		});
		it('renders games template', function() {
			
		});
		it('passes received games to template', function() {
			
		});
	});
	
});