var assert = require('assert');
var fs = require('fs');
var UploadResources = require("../../ServerComponents/pages/games/UploadResources.js");
var User = require("../../ServerComponents/User");
var GameRepository = require("../../ServerComponents/GameRepository.js");

describe('UploadResources Page', function() {
	var page = null;
	var request = null;
	var response = null;
	var gameRepo = null;
	
	beforeEach(function() {
		page = new UploadResources.class();
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
			assert.ok(page instanceof UploadResources.class);
		});
	});
	
	describe('setGameRepository', function() {
		it('should correctly set the Game Repository',	function() {
			gameRepo = new GameRepository.class({});
			page.setGameRepository(gameRepo);
			assert.deepEqual(page._gameRepository, gameRepo);
			
		});
	});
	
	
	describe('UploadResources view', function() {
		it('should exist',	function() {
			assert.ok(fs.existsSync('ServerComponents/views/uploadResources.ejs'));
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
				request.query = {};
				request.query.gameid = "gameid";
			});
			
			it('should load the upload view',	function() {
				page.handleRequest(request,response);
				assert.equal(response.filename, 'uploadResources');
			});
			
			it('should have the correct title',	function() {
				page.handleRequest(request,response);
				assert.equal(response.params.title, 'Game Resources Upload');
			
			});
			
			it('should have the correct message',	function() {
				page.handleRequest(request,response);
			    assert.equal(response.params.msg, 'Please upload your game resources.');
			});

	    });		

		describe('POST', function() {
			var uploadedFileName = 'uploadedTestFile.json';

			beforeEach(function() {
				// create file
				fs.writeFileSync(uploadedFileName, 'This is to test image/audio/video');
				//create user with some session data
				var userObj = new User.class();
				
				request = {
						method: "POST",
						files: {
							game: {
								path: uploadedFileName,
								name: uploadedFileName
							}
						},
						session : {
							user : userObj,
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
				assert.equal(response.filename, 'uploadResources');
			});
			
		
			it('should load the upload form if game input field not set', function() {
				request = {
						method: "POST",
						files: {
						}
					};
				page.handleRequest(request,response);
				assert.equal(response.filename, 'uploadResources');
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
				assert.equal(response.filename, 'uploadResources');
			});
			
			it('should load the upload form if no file is uploaded', function() {
				request.files.game.name = "";
				
				page.handleRequest(request,response);
				assert.equal(response.filename, 'uploadResources');
			});


		});
		
	});
	
	
});