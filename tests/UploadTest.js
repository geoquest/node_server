var assert = require('assert');
var fs = require('fs');
var upload = require("../ServerComponents/routes/upload");

describe('Upload Module', function() {
	describe('upload controller', function() {
		it('should load the correct view',	function() {
			var responseMock = {
					rendered: '',
					render: function(filename) {
						this.rendered = filename;
					}
			};
			upload.uploadGameForm({},responseMock);
			assert.equal(responseMock.rendered, 'upload.ejs');
		});
	});

	describe('upload view', function() {
		it('should exist',	function() {
			assert.ok(fs.existsSync('ServerComponents/views/upload.ejs'));
		});
	});
});