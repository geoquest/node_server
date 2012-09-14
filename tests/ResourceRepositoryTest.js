var assert = require("assert");

var Resource = require("../ServerComponents/Resource.js");
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
	var gridFS = null;
	

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		gridFS = {
			saveFile: function() {
			}
		};
		repository = new ResourceRepository.class(gridFS);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		gridFS = null;
		repository = null;
	});

    describe('constructor', function() {
        it('should create a ResourceRepository instance', function() {
            assert.ok(repository instanceof ResourceRepository.class);
        });
        it('throws exception if gridFSConnection is omitted', function() {
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

    describe('insert', function() {
    	it('fails if parameter to insert is not an instance of Resource', function() {
    		assert.throws(function() {
        		repository.insert();
            });
    		assert.throws(function() {
        		repository.insert(null);
            });
    		assert.throws(function() {
        		repository.insert("string");
            });
    		assert.throws(function() {
        		repository.insert(true);
            });
    		assert.throws(function() {
        		repository.insert(1);
            });
    	});
    	
    	it('calls the saveFile function of the GridFSConnection object', function(done){    		
    		gridFS.saveFile = function() {
    			done();
    		};
    		repository.insert(new Resource.class());
    	});
    	
    	it('calls the saveFile function with the appropriate parameters',function(done){
    		
    		gridFS.saveFile = function(fileName, filePath) {
    			assert.equal(fileName, "abc");
    			assert.equal(filePath, "def");
    			done();
    		};
    		
    		var resource = new Resource.class();
    		
    		resource._filename = "abc";    		
    		resource._tempPath = "def";
    		
    		repository.insert(resource);
    	});
    	
    	
    	
    }); 

});  
