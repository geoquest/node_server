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
	
	describe('readFile',function(){
		
		var fileIDString = '12345';
				
		beforeEach(function() {
			
		});

		afterEach(function() {
			
		});
		
		
		it('throws an error if there is no callback',function(){
			
			assert.throws(function(){
				connection.readFile(fileIDString);
			});
			
		});
		
		it('throws an error if it does not receive a valid id string', function(){
			
			assert.throws(function(){
				connection.readFile(12345);
			});
			assert.throws(function(){
				connection.readFile(null);
			});
			assert.throws(function(){
				connection.readFile(true);
			});
		});		
				
		it('throws an error if the id is valid but does not exist', function(){
			assert.throws(function(){
				connection.readFile(fileIdString,function(){});
			});
			
		});
		
		it('throws an error if the length of the data buffer is different than the length of the file in the FS',function(){			
			connection.readFile("5059c7477e7de4300e000001", function(fileContents){				
				assert.ok(fileContents.length==3580);
			});
		})
	});
	
	
	
	
	
	
	
});