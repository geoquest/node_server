var assert = require("assert");
var SaveState = require("../../../ServerComponents/pages/games/SaveState.js");
var req = require("../../../ServerComponents/util/test/Request.js");
var Response = require("../../../ServerComponents/util/test/Response");
var GameState = require("../../../ServerComponents/GameState");
var User = require("../../../ServerComponents/User");

describe('SaveState',function(){
	var saveState ;
	var request ;
	var response;
	var json ;
	var gameStateDataAccess = null;
	
	beforeEach (function(){
		// Simulate the game state persistence layer
		// that provides a save() method to store a game 
		// state for a specific user.
		gameStateDataAccess = {
			'save': function(state, user) {
			}
		};
		var user = new User.class();
		user.setLoginType('GeoQuest');
		user.setIdentifier('max.power');
		saveState = new SaveState.class();
		saveState.setGameStateRepository(gameStateDataAccess);
		request = new req.class();
		request.method = 'POST';
		json = {"id":"lalala"};
		request.body = json;
		request.session.user = user;
		response = new Response.class();
	});
	
	afterEach (function(){
		response = null;
		request = null;
		json = null;
		saveState = null;
	});
	
	describe('handleRequest()', function() {
		it('sends error code if no JSON was received', function() {
			request.body = null;
			saveState.handleRequest(request, response);
			assert.equal(response.statusCode, 500);
		});
		it('sends error code if request is not POST', function() {
			request.method = 'GET';
			saveState.handleRequest(request, response);
			assert.equal(response.statusCode, 500);
		});
		it('passes game state model to persistence layer', function(done) {
			gameStateDataAccess.save = function(state) {
				assert.ok(state instanceof GameState.class);
				done();
			};
			saveState.handleRequest(request, response);
		});
		it('uses provided JSON to create game state', function(done) {
			gameStateDataAccess.save = function(state) {
				assert.ok(state instanceof GameState.class);
				assert.deepEqual(state.getState(), json);
				done();
			};
			saveState.handleRequest(request, response);
		});
		it('terminates response correctly in case of success', function() {
			saveState.handleRequest(request, response);
			assert.strictEqual(response.ended, true);
		});
		it('terminates response correctly in case of error', function() {
			request.method = 'GET';
			saveState.handleRequest(request, response);
			assert.strictEqual(response.ended, true);
		});
		it('passes current user to persistence layer', function(done) {
			gameStateDataAccess.save = function(state, user) {
				assert.strictEqual(user, request.session.user);
				done();
			};
			saveState.handleRequest(request, response);
		});
	});
});