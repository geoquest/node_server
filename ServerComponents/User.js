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

var check = require('validator').check;

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
	this._loginType = null;
	
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
	
	/**
	 * List of valid Login Types
	 * 
	 * @var {String[]}
	 */
	this._validLoginTypes = ["Facebook", "Google", "GeoQuest"];	
};

/**
 * Sets the login type.
 * 
 * @param {String} type
 * @throws {Error} If invalid type is passed.
 */
User.prototype.setLoginType = function(type)
{
	if(this._validLoginTypes.indexOf(type) === -1) {
		throw new Error(type + " is an invalid Login Type.");
	}		
	this._loginType = type;
};

/**
 * Returns the login type.
 * 
 * @return {String}
 */
User.prototype.getLoginType = function()
{
	return this._loginType;
};

/**
 * Sets the identifier.
 * 
 * @param {String} identifier
 */
User.prototype.setIdentifier = function(identifier)
{
	
};

/**
 * Returns user identifier.
 * 
 * return {String}
 */
User.prototype.getIdentifier = function()
{
	
};

/**
 * Sets a new password.
 * 
 * @param {String} rawPassword The not encrypted password.
 */
User.prototype.setPassword = function(rawPassword)
{
	
};

/**
 * Returns the encrypted password of the user.
 * 
 * return {String} The encrypted password.
 */
User.prototype.getPassword = function()
{
	
};

/**
 * Checks if the user has the provided password.
 * 
 * @param {String} rawPassword
 * @return {boolean} True if the password is correct, false otherwise.
 */
User.prototype.hasPassword = function(rawPassword)
{
	
};

/**
 * Sets the firstname.
 * 
 * @param {String} firstname
 */
User.prototype.setFirstname = function(firstname)
{
	
};

/**
 * Returns the firstname.
 * 
 * return {String}
 */
User.prototype.getFirstname = function()
{
	
};

/**
 * Sets the lastname.
 * 
 * @param {String} lastname
 */
User.prototype.setLastname = function(lastname)
{
	
};

/**
 * Returns the lastname.
 * 
 * @return {String}
 */
User.prototype.getLastname = function()
{
	
};

/**
 * Sets the email address.
 * 
 * @param {String} email
 * @throws {Error} If the address is not valid.
 */
User.prototype.setEmail = function(email)
{
	if (!check(email).isEmail()) {
		throw new Error(email + " is not a valid email address.");
	}
};

/**
 * Returns the email address if available.
 * 
 * @return {String}|null
 */
User.prototype.getEmail = function()
{
	
};

exports.class = User;
