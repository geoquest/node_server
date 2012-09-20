var assert = require("assert");

var Resource = require("../ServerComponents/Resource");
var Game = require("../ServerComponents/Game");
var User = require("../ServerComponents/User");

describe('Resource', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {Resource.class}
	 */
	var object = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		object = new Resource.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		object = null;
	});
	
    describe('constructor', function() {
        it('should create a Resource instance', function() {
            assert.ok(object instanceof Resource.class);
        });
    });
    
    describe('setFilename/getFilename', function() {
    	it('set the resource filename', function() {
    		object.setFilename('fakeimage');

            assert.equal(object.getFilename(), 'fakeimage');
        });
    	    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.setFilename(null);
    		});
    	});
    });
    
    describe('setTempPath/getTempPath', function() {
    	it('set the resource temp path', function() {
    		object.setTempPath('/var');

            assert.equal(object.getTempPath(), '/var');
        });
    	    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.setTempPath(null);
    		});
    	});
    });

    describe('setMimeType/getMimeType', function() {
    	it('set the resource mime type', function() {
    		object.setMimeType('image/jpeg');

            assert.equal(object.getMimeType(), 'image/jpeg');
        });
    	    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.setMimeType(null);
    		});
    	});
    });
    
    describe('setGame/getGame', function() {
    	it('set the game object for the resource', function() {
    		
    		var game = new Game.class();
			game.addAuthor("whatever");
			game.setContent({foo:"bar", nested:{bar:"foo"}});
    		
			object.setGame(game);

            assert.deepEqual(object.getGame(), game);
        });

    	it('throws an exception if the passed game is not of object Game', function() {
    		assert.throws(function() {
    			object.setGame('A string');
    		});
    	});
    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.setGame(null);
    		});
    	});
    });
    
    describe('setUser/getUser', function() {
    	it('set the user object for the resource', function() {
    		
			var jsonuser = {
					"identifier": "42", 
					"password": "this_should_be_an_encrypted_password",
					"firstname": "Max",
					"lastname": "Mustermann",
					"loginType": "Facebook",
					"email": "lulu@yahoo.com"
				};
    		
    		var user = User.fromJSON(jsonuser);
    		
			object.setUser(user);

            assert.deepEqual(object.getUser(), user);
        });

    	it('throws an exception if the passed user is not of object User', function() {
    		assert.throws(function() {
    			object.setUser('A string');
    		});
    	});
    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.setUser(null);
    		}, function(err){
    			var errMsg = "No user passed. Please provide the user.";
    			if(err.message == errMsg) 
    				return true;
    			});
    	});
    });
    
    
    describe('setDate/getDate', function() {
    	it('set the date object for the resource', function() {
    		
			var date = new Date("October 13, 1975 11:13:00");
    		
			object.setDate(date);

            assert.deepEqual(object.getDate(), date);
        });

    	it('throws an exception if the passed user is not of object User', function() {
    		assert.throws(function() {
    			object.setDate('A string');
    		});
    	});
    	
    	it('throws an exception if null is passed', function() {
    		assert.throws(function() {
    			object.setDate(null);
    		});
    	});
    });
    
    describe('getId', function() {
    	it('returns correct value', function() {
    		object.setId('lulu');
    		assert.equal(object.getId(), 'lulu');
    	});
    });
    
    describe('getGameId', function() {
    	it('returns correct value', function() {
    		object.setGameId('lulu');
    		assert.equal(object.getGameId(), 'lulu');
    	});
    });
    
    describe('getUserId', function() {
    	it('returns correct value', function() {
    		object.setUserId('lulu');
    		assert.equal(object.getUserId(), 'lulu');
    	});
    });
    
    describe('setGridFSConnection injects connection', function() {
    	it('returns correct value', function() {
    		var connection = {};
    		object.setGridFSConnection(connection);
    		assert.equal(object._gridFSConnection, connection);
    	});
    });
    
});