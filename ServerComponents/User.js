/**
 * This module provides a basic user class that holds
 * all necessary data and provides some convenience methods.
 * 
 * Create a new User instance:
 * <code>
 * var User = require("User");
 * var newUser = new User.class();
 * </code>
 * 
 * The user contains several convenience methods. 
 * For example it is possible to set a password via
 * setPassword():
 * <code>
 * user.setPassword('new secret password');
 * </code>
 * The user class automatically cares about hashing and salting
 * the password.
 * 
 * To check if a password is correct, the hasPassword() function
 * is used:
 * <code>
 * user.hasPassword('raw password');
 * </code>
 * The method returns true if the password is correct and false otherwise.
 * Like setPassword() it handles the hashing and salting.
 */

var check = require('validator').check;
var crypto = require('crypto');

/**
 * The mapping between the attributes of this object and the attributes of the JSON Representation.
 */
var mapping = {
    // Expected JSON property -> private User attributes 
    'loginType': '_loginType',
    'identifier': '_identifier',
    'firstname': '_firstname',
    'lastname': '_lastname',
    'password': '_password',
    'email': '_email'
};

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
	 * Unique user ID as observed in the DB [managed by the DB].
	 * 
	 * @var {String}|null
	 */
	this._id = null;
	
	/**
	 * List of valid Login Types
	 * 
	 * @var {String[]}
	 */
	this._validLoginTypes = ["Facebook", "Google", "GeoQuest"];	
};

User.prototype.getValidLoginTypes = function()
{
    return this._validLoginTypes;
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
	this._identifier = identifier;
};

/**
 * Returns user identifier.
 * 
 * return {String}
 */
User.prototype.getIdentifier = function()
{
	return this._identifier;
};

/**
 * Sets a new password.
 * 
 * @param {String} rawPassword The not encrypted password.
 */
User.prototype.setPassword = function(rawPassword)
{
	this._password = this._hashPassword(rawPassword, null);
};

/**
 * Hashes the provided password.
 * 
 * If a salt is provided it will be used for hashing.
 * The salt must have a length of exactly 32 bytes.
 * 
 * Provide null as salt to trigger automatic generation of
 * a new salt.
 * 
 * @param {String} rawPassword The not hashed password.
 * @param {String}|null salt The salt to use (optional)
 * @returns {String} The hashed password, preceded by the salt.
 */
User.prototype._hashPassword = function(rawPassword, salt)
{
	if (salt === null) {
		// No salt was provided, we have to generate a new one.
		// On password change we generate a new salt for this user.
		salt = (new Date()).toUTCString();
		// We use md5 hashing to ensure that our salt is 32 characters long.
		// A fixed application salt is used in this step.
		salt = crypto.createHmac('md5', "3hfjkgasfg%$jh%").update(salt).digest('hex');
	}
	// Hash the password multiple times.
	// That increases the time that is needed to create the hash and slows
	// down bruteforce attacks against the user database, but it does not really 
	// affect a single user on login.
	var hashedPassword = rawPassword;
	for (var i = 0; i < 1000; i++) {
		hashedPassword = crypto.createHmac('sha512', salt).update(hashedPassword).digest('hex');
	}
	return salt + hashedPassword;
};

/**
 * Returns the encrypted password of the user.
 * 
 * return {String} The encrypted password.
 */
User.prototype.getPassword = function()
{
	return this._password;
};

/**
 * Checks if the user has the provided password.
 * 
 * @param {String} rawPassword
 * @return {boolean} True if the password is correct, false otherwise.
 */
User.prototype.hasPassword = function(rawPassword)
{
	if (this._password === null) {
		// No password is defined for this user.
		return false;
	}
	var salt = this._password.substr(0, 32);
	var hashedPassword = this._hashPassword(rawPassword, salt);
	return hashedPassword === this._password;
};

/**
 * Sets the firstname.
 * 
 * @param {String} firstname
 */
User.prototype.setFirstname = function(firstname)
{
	this._firstname = firstname;
};

/**
 * Returns the firstname.
 * 
 * return {String}
 */
User.prototype.getFirstname = function()
{
	return this._firstname;
};

/**
 * Sets the lastname.
 * 
 * @param {String} lastname
 */
User.prototype.setLastname = function(lastname)
{
	this._lastname = lastname;
};

/**
 * Returns the lastname.
 * 
 * @return {String}
 */
User.prototype.getLastname = function()
{
	return this._lastname;
};

/**
 * Sets the email address.
 * 
 * @param {String} email
 * @throws {Error} If the address is not valid.
 */
User.prototype.setEmail = function(email)
{
	check(email).isEmail();
	this._email = email;
};

/**
 * Returns the email address if available.
 * 
 * @return {String}|null
 */
User.prototype.getEmail = function()
{
	return this._email;
};


User.prototype.setId = function(id){
	this._id = id;
};


User.prototype.getId = function(){
	return this._id;
};

/**
 * Creates a JSON Object describing this User Object.
 * @returns a JSON Object
 * @throws Error if: required fields are wrong or not properly set
 */
User.prototype.toJSON = function() {
    if (this._validLoginTypes.indexOf(this._loginType) === -1) {
        throw new Error('Invalid login type');
    }
    if (null == this._identifier) {
        throw new Error('identifier must not be null');
    }
    if ((this._loginType === this._validLoginTypes[2]) && (this._password == null)) {
        throw new Error('GeoQuest users MUST have a password');
    }
    var jsonObj = {};
    for (var property in mapping) {
        jsonObj[property] = this[mapping[property]];
    }
    return jsonObj;
};

/**
 * Returns a string representation of the user.
 * 
 * @return {String}
 */
User.prototype.toString = function() {
	if (this._firstname !== null) {
		return this._firstname;
	}
	return this._identifier;
};

/**
 * Converts a JSON object with user data into a real User object.
 * 
 * @param {Object} JSON object with user data.
 * @return {User.class}
 * @throws Error If no JSON object is passed or a property is missing.
 */
var fromJSON = function(jsonObject) {
	if ((typeof jsonObject) !== 'object') {
		throw new Error('JSON object expected. Received: ' + (typeof jsonObject));
	}
	var user = new User();
	for (var property in mapping) {
		if (!jsonObject.hasOwnProperty(property)) {
			// The JSON object does not contain
			// the required property.
			throw new Error('JSON object does not contain property ' + property);
		}
		// Find the private attribute that we have to map 
		// this property to.
		var attribute = mapping[property];
		user[attribute] = jsonObject[property];
	}
	return user;
};

exports.class = User;
exports.fromJSON = fromJSON;
