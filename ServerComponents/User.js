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

User.prototype.getUsername = function()
{
	return this.username;
};

exports.class = User;
