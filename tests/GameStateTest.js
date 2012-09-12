var BluePrint = require("../ServerComponents/GameState");
var assert = require("assert");

describe('GameState', function() {
   var gameState = null;
   
   var state = null;
   
   beforeEach (function(){
	   state = {"id":"buhuhu"};
	   gameState = new BluePrint.class(state);
	
	   
   });
   
   afterEach(function(){
	   gameState = null;
	   state = null ;
   });
   
    it('tests the constructor', function() {
        assert.ok(gameState instanceof BluePrint.class);
    });
    it('checks if state info is provided',function(){
	   assert.throws(function() {
	 	  new BluePrint.class();
	   }); 
    });
    it('tests the getId function',function(){
    	assert.equal("buhuhu",gameState.getGameSessionId())
    });
});

 