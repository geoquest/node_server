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