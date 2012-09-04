/**
 * This module provides a basic user class that holds
 * all necessary data and provides some convenience methods.
 * 
 * Create a new User instance:
 * <code>
 * var type = require("User");
 * var newUser = new type.class();
 * </code>
 */

exports.class = function() 
{
	this.username = null;
	this.password = null;
	this.firstname = null;
	this.lastname = null;
	this.email = null;
	
};

exports.class.prototype.getUsername = function()
{
	return this.username;
};