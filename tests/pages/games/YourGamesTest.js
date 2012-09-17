var assert = require("assert");
var fs = require("fs");

var YourGames = require("../../../ServerComponents/pages/games/YourGames");
var Request = require("../../../ServerComponents/util/test/Request");
var Response = require("../../../ServerComponents/util/test/Response");
var User = require("../../../ServerComponents/User");
var Game = require("../../../ServerComponents/Game");

describe('Your games page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {YourGames}
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
		user.setId('mongodb-id');
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
		response.filename = '';
		gameRepository = {
			findAllByUser: function(user, callback) {
				// Simulate empty list of games
				callback([]);
			},
			insert: function(game) {
			}
		};
		page = new YourGames.class();
		page.setGameRepository(gameRepository);
		// Simulate successful validation per default.
		page.setGameValidator({
			validateGame: function() {
				return true;
			}
		});
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
			assert.ok(page instanceof YourGames.class);
		});
	});
	
	describe('setGameRepository', function() {
		it('should correctly set the Game Repository',	function() {
			assert.strictEqual(page._gameRepository, gameRepository);
		});
	});
	
	describe('view', function() {
		// TODO check if required or view changes
		it('"upload" should exist',	function() {
			assert.ok(fs.existsSync('ServerComponents/views/upload.ejs'));
		});
		it('"upload-response" should exist',	function() {
			assert.ok(fs.existsSync('ServerComponents/views/upload-response.ejs'));
		});
	});
	
	describe('GET request', function() {
		it('passes logged in user to game repository', function(done) {
			gameRepository.findAllByUser = function(user, callback) {
				assert.equal(user.getIdentifier(), request.session.user.getIdentifier());
				callback([]);
				done();
			};
			page.handleRequest(request, response);
		});
		it('renders games template', function() {
			// TODO: check
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
			assert.equal(response.templateVars.games.length, 2);
		});
		it('should load the upload view',	function() {
			page.handleRequest(request,response);
			assert.equal(response.template, 'upload');
		});
		it('should have the correct title',	function() {
			page.handleRequest(request,response);
			assert.equal(response.templateVars.title, 'Game Upload');
		
		});
		it('should have the correct message',	function() {
			page.handleRequest(request,response);
		    assert.equal(response.templateVars.msg, 'Please upload your game in JSON format.');
		});
	});
	
	describe('POST request', function() {
		var uploadedFileName = 'uploadedTestFile.json';
		var content = null;
		
		beforeEach(function() {
			// create file
			content = {"name": "bubus game", "lala":"lulu"};
			fs.writeFileSync(uploadedFileName, JSON.stringify(content));
			request.method = 'POST';
			request.files = {
				game: {
					path: uploadedFileName,
					name: uploadedFileName
				}
			};
			
		});
		
		afterEach(function() {
			// delete file
			fs.unlinkSync(uploadedFileName);
			content = null;
		});
		
		it('should load the upload-response view if file is uploaded', function() {
			page.handleRequest(request, response);
			assert.equal(response.template, 'upload-response');
		});
		
		it('should have the correct title',	function() {
			page.handleRequest(request, response);
			assert.equal(response.templateVars.title, 'Game Upload Response');
		
		});
		
		it('should load the upload form if no files property exists ', function() {
			request.files = null;
			page.handleRequest(request, response);
			assert.equal(response.template, 'upload');
		});
		
	
		it('should load the upload form if game input field not set', function() {
			request.files = {};
			page.handleRequest(request, response);
			assert.equal(response.template, 'upload');
		});

		it('should load the upload form if game input is empty', function() {
			request.files = {
				game: {
				}
			};
			page.handleRequest(request,response);
			assert.equal(response.template, 'upload');
		});
		
		it('should load the upload form if no file is uploaded', function() {
			request.files.game.name = "";
			
			page.handleRequest(request,response);
			assert.equal(response.template, 'upload');
		});

		it('should load the upload form if file is not a legal JSON file', function() {
			
			fs.writeFileSync(uploadedFileName, 'Hello Pookie!');
			
			page.handleRequest(request,response);
			assert.equal(response.template, 'upload');
			assert.equal(response.templateVars.msg, 'Error! Not a legal JSON file.');
		});
		
		it('should access uploaded file from request and save to GameRepository', function(done) {

			gameRepo = {
					insert: function(game){
						assert.deepEqual(game.getContent(), {"name": "bubus game", "lala":"lulu"});
						done();
					}
			};
			page.setGameRepository(gameRepo);
			
			page.handleRequest(request, response);

		});

		it('should add logged in user as author', function(done) {
			gameRepo.insert = function(game) {
				assert.deepEqual(game.getAuthors(), [request.session.user.getId()]);
				done();
			};
			page.handleRequest(request, response);
		});
		
		it('should pass the received JSON to the validator', function(done) {
			page.setGameValidator({
				validateGame: function(gameData) {
					assert.deepEqual(content, gameData);
					done();
					return true;
				}
			});
			page.handleRequest(request, response);
		});
		
		it('should reject the game if the validation fails', function() {
			page.setGameValidator({
				validateGame: function() {
					return false;
				}
			});
			page.handleRequest(request, response);
			assert.equal(response.template, 'upload');
			assert.equal(response.templateVars.msg, 'Error! Not a proper game file.');
		});
		
		it('should display the uploaded game', function() {
			page.handleRequest(request, response);
			assert.equal(response.templateVars.games.length, 1);
		});
		
		it('should not overwrite the other loaded games', function() {
			gameRepository.findAllByUser = function(user, callback) {
				// Simulate 1 game in the list.
				var game = new Game.class();
				callback([game]);
			};
			page.handleRequest(request, response);
			assert.equal(response.templateVars.games.length, 2);
		});

	});
	
});