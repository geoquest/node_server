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
	/**
	 * Holds the type of the user.
	 * 
	 * Valid values are (case-sensitive):
	 * # GeoQuest
	 * # Google
	 * # Facebook
	 * 
	 * @var {String}
	 */
	this.loginType = null;
	
	/**
	 * Identifier for this user that is unique among this loginType.
	 * 
	 * Contains 1 of the following id types:
	 * # chosen username for GeoQuest users
	 * # number provided by Google
	 * # number provided by Facebook
	 * 
	 * @var {String}
	 */
	this._identifier = null;
	
	/**
	 * Encrypted password of the user.
	 * 
	 * The password is only available for GeoQuest users.
	 * 
	 * @var {String}|null
	 */
	this._password = null;
	
	/**
	 * The firstname of the user.
	 * 
	 * @var {String}
	 */
	this._firstname = null;
	
	/**
	 * The lastname of the user.
	 * 
	 * @var {String}
	 */
	this._lastname = null;
	
	/**
	 * Email address if it was provided (only by GeoQuest users).
	 * 
	 * @var {String}|null
	 */
	this._email = null;
	
};

User.prototype.setLoginType = function(type)
{
	
};

User.prototype.getLoginType = function()
{
	
};

User.prototype.setIdentifier = function(identifier)
{
	
};

User.prototype.getIdentifier = function()
{
	
};

User.prototype.setPassword = function(rawPassword)
{
	
};

User.prototype.getPassword = function()
{
	
};

User.prototype.setFirstname = function(firstname)
{
	
};

User.prototype.getFirstname = function()
{
	
};

User.prototype.setLastname = function(lastname)
{
	
};

User.prototype.getLastname = function()
{
	
};

User.prototype.setEmail = function(email)
{
	
};

User.prototype.getEmail = function()
{
	
};

exports.class = User;
