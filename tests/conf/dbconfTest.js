var assert = require("assert");

var dbconf = require("../../ServerComponents/conf/dbconf");

describe('Database configuration', function() {
	it('returns an object', function() {
		assert.ok((typeof dbconf) === 'object');
	});
	it('contains dbname', function() {
		assert.ok(dbconf.dbname);
	});
	it('contains host', function() {
		assert.ok(dbconf.host);
	});
	it('contains port and port is an integer', function() {
		assert.ok(dbconf.port);
		assert.equal(typeof dbconf.port, 'number');
	});
	it('contains url', function() {
		assert.ok(dbconf.url);
	});
	it('contains collections and collections is an array', function() {
		assert.ok(dbconf.collections);
		assert.ok(dbconf.collections instanceof Array);
	});
	it('contains salt', function() {
		assert.ok(dbconf.salt);
	});

});
	