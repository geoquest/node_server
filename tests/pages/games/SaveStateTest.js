var assert = require("assert");
var SaveState = require("../../../ServerComponents/pages/games/SaveState.js");
var req = require("../../../ServerComponents/util/test/request.js")
var Response = require("../../../ServerComponents/util/test/Response");

describe('SaveState',function(){
	var saveState ;
	var request ;
	var response;
	var json ;
	beforeEach (function(){
		saveState = new SaveState.class();
		request = new req.class();
		json = {"id":"lalala"};
		request.body = json;
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
			
		});
		it('sends error code if request is not POST', function() {
			
		});
		it('passes game state model to persistence layer', function() {
			
		});
		it('uses provided JSON to create game state', function() {
			
		});
		it('terminates response correctly in case of success', function() {
			
		});
		it('terminates response correctly in case of error', function() {
			
		});
	});
});