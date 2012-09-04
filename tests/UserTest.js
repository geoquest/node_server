var assert = require("assert");

var User = require("../ServerComponents/User.js");

describe('User', function() {
	var user = null;
	
	beforeEach(function() {
		user =  new User.class();
	});
	
	afterEach(function() {
		user = null;
	});
	
    describe('constructor', function() {
        it('should create a User instance', function() {
            assert.ok(user instanceof User.class);
        });
    });
    
    describe('set', function() {
    	
    });
});
