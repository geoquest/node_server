var assert = require('assert');
var fs = require('fs');
var Upload = require("../../ServerComponents/pages/Upload.js");
var GameRepository = require("../../ServerComponents/GameRepository.js");

describe('Upload Page', function() {
	var page = null;
	var request = null;
	var response = null;
	var gameRepo = null;
	
	beforeEach(function() {
		page = new Upload.class();
		request = {};
	
		response = {
				filename: '',
				params: '',
				render: function(filename,params) {
					this.filename = filename;
					this.params = params;
				}
		};
		
		gameRepo = {
			insert: function(game) {
			}
		};
		page.setGameRepository(gameRepo);
	});

	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof Upload.class);
		});
	});
	
	describe('setGameRepository', function() {
		it('should correctly set the Game Repository',	function() {
			gameRepo = new GameRepository.class({});
			page.setGameRepository(gameRepo);
			assert.deepEqual(page._gameRepository, gameRepo);
			
		});
	});
	
	
	describe('upload view', function() {
		it('should exist',	function() {
			assert.ok(fs.existsSync('ServerComponents/views/upload.ejs'));
		});
	});

	describe('upload-response view', function() {
		it('should exist',	function() {
			assert.ok(fs.existsSync('ServerComponents/views/upload-response.ejs'));
		});
	});
	
	describe('handleRequest', function() {
	
		describe('GET', function(){
			beforeEach(function() {
				request.method = "GET";
			});
			
			it('should load the upload view',	function() {
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload');
			});
			
			it('should have the correct title',	function() {
				page.handleRequest(request,response);
				assert.equal(response.params.title, 'Game Upload');
			
			});
			
			it('should have the correct message',	function() {
				page.handleRequest(request,response);
			    assert.equal(response.params.msg, 'Please upload your game in JSON format.');
			});

	    });		

		describe('POST', function() {
			var uploadedFileName = 'uploadedTestFile.json';

			beforeEach(function() {
				// create file
				fs.writeFileSync(uploadedFileName, '{"foo":"bär"}');
				
				request = {
						method: "POST",
						files: {
							game: {
								path: uploadedFileName,
								name: uploadedFileName
							}
						}
					};
				
			});
			
			afterEach(function() {
				// delete file
				fs.unlinkSync(uploadedFileName);
			});
			
			it('should load the upload-response view if file is uploaded', function() {
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload-response');
			});
			
			it('should have the correct title',	function() {
				page.handleRequest(request,response);
				assert.equal(response.params.title, 'Game Upload Response');
			
			});
			
			it('calls write file on server tmp',	function() {
				page.handleRequest(request,response);
				assert.equal(response.params.title, 'Game Upload Response');
			
			});
			
			it('should load the upload form if no files property exists ', function() {
				request = {
						method: "POST"
					};
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload');
			});
			
		
			it('should load the upload form if game input field not set', function() {
				request = {
						method: "POST",
						files: {
						}
					};
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload');
			});

			it('should load the upload form if game input is empty', function() {
				request = {
						method: "POST",
						files: {
							game: {
							}
						}
					};
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload');
			});
			
			it('should load the upload form if no file is uploaded', function() {
				request.files.game.name = "";
				
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload');
			});

			
			it('should load the upload form if file is not a legal JSON file', function() {
				
				fs.writeFileSync(uploadedFileName, 'Hello Pookie!');
				
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload');
				assert.equal(response.params.msg, 'Error! Not a legal JSON file.');
			});
//			it('should have the correct message',	function() {
//				page.handleRequest(request,response);
//			    assert.equal(response.params.msg, 'Please upload your game in JSON format.');
//			});
			
			
			it('should access uploaded file from request and save to GameRepository', function(done) {

				gameRepo = {
						insert: function(game){
							assert.deepEqual(game.getContent(),{foo: "bär"});
							done();
						}
				};
				page.setGameRepository(gameRepo);
				
				page.handleRequest(request,response);

			});
			

		});
		
	});
	
	
});