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

var User = require('./User');

UserRepository = function(connection) 
{
	if (connection === undefined) {
		throw new Error("Connection parameter omitted!");
	}
	if(connection === null) {
		throw new Error("Invalid connection or connection could not be established!");
	}
	
	/**
	 * The MongoDB database connection.
	 * 
	 * @var {Object}
	 */
	this.connection = connection;
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
	var query = {'loginType': 'Google', 'identifier': identifier};
	this.connection.users.find(query, this._createResultHandler(callback));
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

/**
 * Registers an additional error handler that is called whenever an
 * internal MongoDB error occurs.
 * 
 * Example:
 * <code>
 * repository.addErrorHandler(function(error) {
 *     // Handle error here.
 * });
 * </code>
 * 
 * @param {function} callback
 */
UserRepository.prototype.addErrorHandler = function(callback)
{
	
};

/**
 * Creates a callback that handles a MongoDB result.
 * 
 * Throws an exception if an error occurs. In case of
 * a successful result it will convert the result set 
 * into a User object (or null if not found) and 
 * pass it to the provided callback.
 * 
 * @param {function}
 * @return {function}
 * @throws Error If an internal error occurred.
 */
UserRepository.prototype._createResultHandler = function(callback) {
	// Store the current context as the scope changes in the callback.
	var self = this;
	return function(error, result) {
		if (error) {
			throw new Error(error);
		}
		// Convert result to model.
		callback(self._jsonToUser(result));
	};
};

/**
 * Receives a MongoDB result set and converts it into a User object.
 * 
 * Converts the result set to null if it is empty.
 * 
 * @param {Object} result A JSON object that contains the result set.
 * @return {User.class}|null
 */
UserRepository.prototype._jsonToUser = function(result) {
	if (result.count() === 0) {
		// No user was found.
		return null;
	}
	return new User.fromJSON(result[0]);
};

exports.class = UserRepository;