/**
 * This module provides basic methods to query for users.
 * 
 * Example:
 * <code>
 * var UserRepository = require("UserDataAccess");
 * var repository = new UserRepository.class(mongoDBConnection);
 * var user = repository.byGoogleIdentifier("1513235656");
 * </code>
 */

UserRepository = function(connection) 
{
	if (connection === undefined) {
		throw new Error("Connection parameter omitted!");
	}
	if(connection === null) {
		throw new Error("Invalid connection or connection could not be established!");
	}
};

/**
 * Searches for a user with the given Google identifier.
 * 
 * The result of the lookup will be passed to the provided callback.
 * 
 * Example callback:
 * <code>
 * var callback = function(userOrNull) {
 *     // Work with user data here.
 * }
 * </code>
 * The callback will receive the {User.class} that was found or null
 * if the user does not exist in the database.
 * 
 * @param {String} identifier
 * @param {function} callback A callback that will receive the lookup result. 
 */
UserRepository.prototype.byGoogleIdentifier = function(identifier, callback)
{
	
};

/**
 * Searches for a user with the given Facebook identifier.
 * 
 * @param {String} identifier
 * @param {function} callback A callback that will receive the lookup result. 
 */
UserRepository.prototype.byFacebookIdentifier = function(identifier, callback)
{
	
};

/**
 * Searches for a user with the given GeoQuest identifier (also
 * called GeoQuest username).
 * 
 * @param {String} identifier
 * @param {function} callback A callback that will receive the lookup result. 
 */
UserRepository.prototype.byGeoQuestIdentifier = function(identifier, callback)
{
	
};

exports.class = UserRepository;