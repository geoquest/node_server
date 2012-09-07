var assert = require('assert');
var fs = require('fs');
var Upload = require("../../ServerComponents/pages/Upload.js");

describe('Upload Page', function() {
	var page = null;
	var request = null;
	var response = null;
	
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
	});
	
	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof Upload.class);
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
			beforeEach(function() {
				request.method = "POST";
			});
			
			it('should load the upload-response view',	function() {
				page.handleRequest(request,response);
				assert.equal(response.filename, 'upload-response');
			});
			
			it('should have the correct title',	function() {
				page.handleRequest(request,response);
				assert.equal(response.params.title, 'Game Upload Response');
			
			});
			
//			it('should have the correct message',	function() {
//				page.handleRequest(request,response);
//			    assert.equal(response.params.msg, 'Please upload your game in JSON format.');
//			});
		});
		
	});
	
	
});