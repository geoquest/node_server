var assert = require("assert")

var type = require("../ServerComponents/User.js");

describe('User', function() {
  describe('constructor', function() {
    it('should create a User instance', function() {
        var user = new type.class();
        assert.ok(user instanceof type.class);
    })
  })
})
