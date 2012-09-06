var assert = require("assert");

var serverConfig = require("../../ServerComponents/conf/serverConf");

describe('Server configuration', function() {
	it('returns an object', function() {
		assert.ok((typeof serverConfig) === 'object');
	});
	it('contains at least one option', function() {
		assert.ok(Object.keys(serverConfig).length > 0);
	});
});
	