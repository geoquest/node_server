var assert = require("assert");

var pages = require("../../ServerComponents/conf/pages");

describe('Page configuration', function() {
	it('returns an object', function() {
		assert.ok((typeof pages) === 'object');
	});
	it('contains at least one page', function() {
		assert.ok(Object.keys(pages).length > 0);
	});
	it('contains required attributes per page', function() {
		for (var route in pages) {
			var pageConfig = pages[route];
			var message = 'Attribute "module" for route "' + route + '" is not defined.';
			assert.ok((typeof pageConfig.module) === 'string', message);
		}
	});
	it('contains valid restrictedTo configuration', function() {
		for (var route in pages) {
			var pageConfig = pages[route];
			if (pageConfig.restrictedTo === undefined) {
				// Restriction configuration is optional.
				continue;
			}
			var message = 'Invalid "restrictedTo" ("' + pageConfig.restrictedTo + '") attribute for route "' + route + '".';
			assert.ok(['guest', 'user'].indexOf(pageConfig.restrictedTo) !== -1, message);
		}
	});
});
	