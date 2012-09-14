/**
 * This module provides basic methods to query for resources.
 */

//var Game = require('./Game');

ResourceRepository = function(connection) {
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
ResourceRepository.prototype._notifyAboutError = function(error) {
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
//ResourceRepository.prototype.insert = function(game) {
//	var self = this;
//
//	if (!(game instanceof Game.class)) {
//		throw new Error('Object to be inserted must be an instance of Game');
//	}
//
//	var json = game.toJSON();
//	self._connection.games.insert(json, function(err) {
//		if (err) {
//			self._notifyAboutError(err);
//		}
//	});
//};

/**
 * Creates a callback that handles a MongoDB result.
 * 
 * Throws an exception if an error occurs. In case of
 * a successful result it will 
 * pass the result to the provided callback.
 * 
 * @param {function}
 * @return {function}
 * @throws Error If an internal error occurred.
 */
ResourceRepository.prototype._createResultHandler = function(callback) {
	// Store the current context as the scope changes in the callback.
	var self = this;
	return function(error, result) {
		if (error) {
			self._notifyAboutError(error);
			return;
		}
		callback(self._jsonToGame(result));
	};
};

/**
 * Creates a callback that handles a MongoDB result.
 * 
 * Resultset is expected to be projected to meta game information (authors, title, _id)
 * adds empty content field, so that transformation methods can be reused
 * 
 * Throws an exception if an error occurs. In case of
 * a successful result it will 
 * pass the result to the provided callback.
 * 
 * @param {function}
 * @return {function}
 * @throws Error If an internal error occurred.
 */
ResourceRepository.prototype._createResultHandlerForMetaInfo = function(callback) {
	// Store the current context as the scope changes in the callback.
	var self = this;
	return function(error, result) {
		if (error) {
			self._notifyAboutError(error);
			return;
		}
		for (var i = 0; i<result.length; i++){
			result[i]['content']={};
		}
		callback(self._jsonToGame(result));
	};
};


/**
 * Receives a MongoDB result set and converts it into a game object.
 * 
 * Converts the result set to null if it is empty.
 * 
 * @param {Object} result A JSON object that contains the result set.
 * @return {Game.class}|null
 */
ResourceRepository.prototype._jsonToGame = function(result) {
	if (result.length === 0) {
		// No user was found.
		return new Array();
	}
	var passResult = new Array();
	var i;
	for (i = 0; i<result.length; i++){
		passResult[i] = new Game.fromJSON(result[i]);
	}
	return passResult;

};


exports.class = ResourceRepository;
