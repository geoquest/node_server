var assert = require("assert");

var Game = require("../ServerComponents/Game");

describe('Game', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {Game.class}
	 */
	var object = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		object = new Game.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		object = null;
	});
	
    describe('constructor', function() {
        it('should create a Game instance', function() {
            assert.ok(object instanceof Game.class);
        });
    });
    
    describe('addAuthor/getAuthors', function() {
    	it('adds one author to the existing list', function() {
    		object.addAuthor('me');

            assert.equal(object.getAuthors().length, 1);
            assert.equal(object.getAuthors()[0], 'me');
        });
    	
    	it('adds 2 authors to the existing list', function() {
    		object.addAuthor('me');
    		object.addAuthor('and Me');

            assert.equal(object.getAuthors().length, 2);
            assert.deepEqual(object.getAuthors(), ['me', 'and Me']);
        });
    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.addAuthor(null);
    		});
    	});
    });
    
    describe('setContent/getContent', function() {
    	it('should accept an object as content', function() {
    		object.setContent({foo : "bar"});
            assert.deepEqual(object.getContent(), {foo : "bar"});
        });
    	
    	it('should accept null as content', function() {
    		assert.doesNotThrow(function(){
    			object.setContent(null);
    		});
        });
    	
    	it('should not accept primitive types', function() {
    		assert.throws(function(){
    			object.setContent(1);
    		});
    		
    		assert.throws(function(){
    			object.setContent(true);
    		});
    		
    		assert.throws(function(){
    			object.setContent("Bubu");
    		});
        });
    	
    });

    describe('setId/getId', function() {
    	it('should set the Id', function() {
    		object.setId("123xdqree4aaxc");
            assert.deepEqual(object.getId(), "123xdqree4aaxc");
        });

    	it('should accept not null as id', function() {
    		assert.throws(function(){
    			object.setId(null);
    		});
        });
    });

    describe('setVersion/getVersion', function() {
    	it('should set the Version', function() {
    		object.setVersion(10);
            assert.deepEqual(object.getVersion(), 10);
        });

    	it('should not accept null as version', function() {
    		assert.throws(function(){
    			object.setVersion(null);
    		});
        });
    });

	describe('toJSON', function() {
		it('maps properties correctly (check if conversion is performed correctly)', function() {
			object.addAuthor("whatever");
			object.setContent({foo:"bar", nested:{bar:"foo"}});
			
			var newJSONObj = object.toJSON();
			assert.deepEqual(["whatever"], newJSONObj["authors"]);
			assert.deepEqual({foo:"bar", nested:{bar:"foo"}}, newJSONObj["content"]);
		});
	});
	
    describe('fromJSON', function() {
		it('returns a Game object', function() {
			var json = {
				"authors" : ["author 1", "author 2"],
				"version": 10,
				"content": {"mission" : "best mission ever", "mission" : "best mission 2 ever"}
			};
			assert.ok(Game.fromJSON(json) instanceof Game.class);
        });
		it('throws exception if property is missing', function() {
			var json = {
					"authors" : ["author 1", "author 2"],
				};
			assert.throws(function() {
				Game.fromJSON(json);
			});
        });
		it('maps properties correctly', function() {
			var json = {
					"authors" : ["author 1", "author 2"],
					"version": 5,
					"content": {"mission" : "best mission ever", "mission" : "best mission 2 ever"}
				};
			var game = Game.fromJSON(json);
			assert.ok(game instanceof Game.class);
			assert.deepEqual(game.getContent(), {"mission" : "best mission ever", "mission" : "best mission 2 ever"});
			assert.deepEqual(game.getVersion(), 5);
        });
		
		it('works with empty content', function() {
			var json = {
					"authors" : ["author 1", "author 2"],
					"version": 7,
					"content": {}
				};
			assert.ok(Game.fromJSON(json) instanceof Game.class);
        });
		it('throws exception if no object is provided', function() {
			assert.throws(function() {
				Game.fromJSON('This is not valid');
			});
		});
    });
	
	
	describe('toString', function() {
		it('returns non-empty string', function() {
			assert.equal(typeof object.toString(), 'string');
			assert.ok(object.toString().length > 0);
		});
		it('is automatically used in string context', function() {
			var description = '' + object;
			assert.ok(description.length > 0);
		});
	});
	
	describe('getName', function() {
		it('determines name from content', function() {
			object.setContent({'name': 'Demo Game'});
			assert.equal(object.getName(), 'Demo Game');
		});
		it('throws exception if content is not available', function() {
			object.setContent(null);
			assert.throws(function() {
				object.getName();
			});
		});
	});
	
});