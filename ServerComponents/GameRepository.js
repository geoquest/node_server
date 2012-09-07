/**
 * This module provides basic methods to query for games.
 */

var Game = require('./Game');

GameRepository = function(connection) {
	if (connection === undefined) {
		throw new Error("Connection parameter omitted!");
	}
	if (connection === null) {
		throw new Error("Invalid connection or connection could not be established!");
	}

	/**
	 * The MongoDB database connection.
	 * 
	 * @var {Object}
	 */
	this._connection = connection;

	/**
	 * Function callbacks that are invoked whenever an internal error occurs.
	 * 
	 * @var {Array} An array of error handler callbacks.
	 */
	this._errorHandlers = [];
};

/**
 * Notifies all registered error callback about an error that occurred recently.
 * 
 * @param {String} error
 */
GameRepository.prototype._notifyAboutError = function(error) {
	for (var i = 0; i < this._errorHandlers.length; i++) {
		// Pass the error to each handler.
		this._errorHandlers[i](error);
	}
};

/**
 * 
 * @param game -
 *            Game Object
 */
GameRepository.prototype.insert = function(game) {
	var self = this;

	if (!(game instanceof Game.class)) {
		throw new Error('Object to be inserted must be an instance of Game');
	}

	var json = game.toJSON();
	self._connection.games.insert(json, function(err) {
		if (err) {
			self._notifyAboutError(err);
		}
	});
};
//
///**
// * Registers an additional error handler that is called whenever an internal
// * MongoDB error occurs.
// * 
// * Example: <code>
// * repository.addErrorHandler(function(error) {
// *     // Handle error here.
// * });
// * </code>
// * 
// * @param {function}
// *            callback
// */
//UserRepository.prototype.addErrorHandler = function(callback) {
//	this.errorHandlers.push(callback);
//};
//
///**
// * Creates a callback that handles a MongoDB result.
// * 
// * Throws an exception if an error occurs. In case of a successful result it
// * will convert the result set into a User object (or null if not found) and
// * pass it to the provided callback.
// * 
// * @param {function}
// * @return {function}
// * @throws Error
// *             If an internal error occurred.
// */
//UserRepository.prototype._createResultHandler = function(callback) {
//	// Store the current context as the scope changes in the callback.
//	var self = this;
//	return function(error, result) {
//		if (error) {
//			self._notifyAboutError(error);
//			return;
//		}
//		// Convert result to model.
//		callback(self._jsonToUser(result));
//	};
//};
//
///**
// * Notifies all registered error callback about an error that occurred recently.
// * 
// * @param {String}
// *            error
// */
//UserRepository.prototype._notifyAboutError = function(error) {
//	for ( var i = 0; i < this.errorHandlers.length; i++) {
//		// Pass the error to each handler.
//		this.errorHandlers[i](error);
//	}
//};
//
///**
// * Receives a MongoDB result set and converts it into a User object.
// * 
// * Converts the result set to null if it is empty.
// * 
// * @param {Object}
// *            result A JSON object that contains the result set.
// * @return {User.class}|null
// */
//UserRepository.prototype._jsonToUser = function(result) {
//	if (result.length === 0) {
//		// No user was found.
//		return null;
//	}
//	return new User.fromJSON(result[0]);
//};

exports.class = GameRepository;
