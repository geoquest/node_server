var assert = require("assert");

//var Resource = require("../ServerComponents/Game.js");
var ResourceRepository = require("../ServerComponents/ResourceRepository.js");
//var User = require("../ServerComponents/User.js");


/**
 * TODO: move connectionMock to separate (utility) class
 */

describe('ResourceRepository', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {ResourceRepository.class}
	 */
	var repository = null;

	/**
	 * Simple object that is used to simulate the mongodb connection.
	 * 
	 * @var {Object}
	 */
	var connectionMock = null;
	

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		connectionMock = {};
		repository = new ResourceRepository.class(connectionMock);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		connectionMock = null;
		repository = null;
	});

    describe('constructor', function() {
        it('should create a ResourceRepository instance', function() {
            assert.ok(repository instanceof ResourceRepository.class);
        });
        it('throws exception if connection is omitted', function() {
            assert.throws(function() {
            	new ResourceRepository.class();
            });
        });
        it('throws exception if connection is invalid or could not be established', function() {
            assert.throws(function() {
            	new ResourceRepository.class(null);
            });
        });
    });
    
//    describe('insertResource', function() {
//    	it('successfully inserts resource file into GridFS', function(done) {
////    		connectionMock.games.insert = function(game) {
////    			assert.ok((typeof game) === 'object');
////    			done();
////    		};
//    		//var tempResource = new Resource.class();
//    		repository.insert(tempResource);
//    	});
//
//    	it('fails if parameter to insert is not an instance of Game', function() {
//    		connectionMock.games.insert = function() {};
//
//    		assert.throws(function() {
//        		repository.insert();
//            });
//    		assert.throws(function() {
//        		repository.insert(null);
//            });
//    		assert.throws(function() {
//        		repository.insert("string");
//            });
//    		assert.throws(function() {
//        		repository.insert(true);
//            });
//    		assert.throws(function() {
//        		repository.insert(1);
//            });
//    	});
//    }); 

});  
