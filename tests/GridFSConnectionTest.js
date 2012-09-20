var assert = require("assert");
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;



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
	
	describe('saveFile',function() {
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

		it('successfully writes a file to the database when no metadata is given',function(done){
			connection.saveFile("newFile", fileToSave, null, function(error, result) {
				assert.ok(!error);
				assert.equal(result.length, fileContents.length);
				done();
			});
		});
		
		it('successfully writes a file to the database with added metadata', function(done){
			var metadata = {
				foo:"bar",
				foo2:"bar2"
			};			
			
			connection.saveFile("newFile", fileToSave, metadata, function(error, result) {
				assert.ok(!error);
				assert.equal(result.length, fileContents.length);
				assert.deepEqual(result.metadata, metadata);
				done();
			});
			
		});
		
		it('throws exception if callback is omitted', function() {
			var metadata = {
				foo:"bar",
				foo2:"bar2"
			};
			assert.throws(function() {
				connection.saveFile("newFile", fileToSave, metadata);
			});
		});
	});
	
	describe('loadResourcesList',function(){
		var gameIDString = '50586c39ea2ac3d00e000001';
		var gameID = ObjectID.createFromHexString(gameIDString);
		
		beforeEach(function() {
			
		});

		afterEach(function() {
			
		});
		
		it('fails if an invalid game id is given', function(){
			gameID = "sadfuiy2378";
			
			
			assert.doesNotThrow(
					connection.loadResourcesList(gameID, function(){
						
					}
			));
			
			
		});
		
		
		it('fails if the id is valid but does not exist', function(){
			
			
		});
		
		it('returns an empty list if the game has no resources',function(){
			
			
		});
		
		it('successfully retrieves a list of resource IDs, provided a Game ID',function(){
			
			
		});
		
		
		
		
	});
	
	
	
	
	
	
	
});