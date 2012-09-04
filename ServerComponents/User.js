/**
 * This module provides a basic user class that holds
 * all necessary data and provides some convenience methods.
 * 
 * Create a new User instance:
 * <code>
 * var User = require("User");
 * var newUser = new User.class();
 * </code>
 */

User = function() 
{
	this._username = null;
	this._password = null;
	this._firstname = null;
	this._lastname = null;
	this._email = null;
	
};

User.prototype.getUsername = function()
{
	return this.username;
};

exports.class = User;
