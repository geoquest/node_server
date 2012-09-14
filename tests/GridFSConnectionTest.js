var assert = require("assert");
var fs = require('fs');

var GridFSConnection = require("../ServerComponents/GridFSConnection.js");

describe('GridFSConnection', function() {
	var connection = null;
	
	beforeEach(function() {
		connection = new GridFSConnection.class();
	});

	describe('constructor', function() {
    	it('successfully creates object', function() {
    		assert.ok(connection instanceof Object);
    	});
    	it('sets the connection state to CLOSED (0)', function() {
    		assert.equal(connection._state, 0);
    	});
    });
	
	
	describe('_openConnection', function() {
    	it('successfully opens connection and changes the state to OPEN (2)', function(done) {
    		assert.doesNotThrow(function(){
    			connection._openConnection(function(error, db) {
    				assert.ok(!error);
    				assert.equal(connection._state, 2);
        			done();
    			});
    		});
    	});
    });
	
	describe('writeFile',function() {
		var fileToSave = 'fileToSave.file';
		var fileContents = 'ABCDEFG';
		beforeEach(function() {
			// create file
			fs.writeFileSync(fileToSave, fileContents);
		});

		afterEach(function() {
			// delete file
			fs.unlinkSync(fileToSave);
		});

		it('successfully writes a file to the database',function(done){
			connection.saveFile("newFile", fileToSave, function(error, result) {
				assert.ok(!error);
				assert.equal(result.length, fileContents.length);
				done();
			});
		});
	});
	
});