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
    	assert.equal("buhuhu",gameState.getGameSessionId());
    });
    it('tests the getState',function(){
	  assert.deepEqual(gameState.getState(), state);
    });
    
    describe('toJSON', function() {
    	it('returns object', function() {
    		var json = gameState.toJSON();
    		assert.equal(typeof json, 'object');
    	});
    	it('exports state information', function() {
    		var json = gameState.toJSON();
    		assert.deepEqual(json.state, state);
    	});
    });
    
    describe('fromJSON', function() {
    	it('returns GameState object', function() {
    		var json = {
				'state': state
    		};
    		var gameState = BluePrint.fromJSON(json);
    		assert.ok(gameState instanceof BluePrint.class);
    	});
    	it('throws exception if no JSON is provided', function() {
    		assert.throws(function() {
    			BluePrint.fromJSON();
    		});
    	});
    	it('throws exception if information in JSON object is missing', function() {
    		assert.throws(function() {
    			BluePrint.fromJSON({'name': 'Max'});
    		});
    	});
    });
    
    describe('internal id', function() {
    	it('is initially null', function() {
    		assert.strictEqual(gameState.getId(), null);
    	});
    });
    
    describe('setId()', function() {
    	it('changes id', function() {
    		gameState.setId(42);
    		assert.strictEqual(gameState.getId(), 42);
    	});
    });

});

 