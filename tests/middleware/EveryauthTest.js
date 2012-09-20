var assert = require("assert");
var everyauth = require("../../ServerComponents/middleware/Everyauth");

describe('Everyauth middleware', function() {

	it('provides middleware function', function() {
		assert.equal(typeof everyauth.middleware, 'function');
	});

});