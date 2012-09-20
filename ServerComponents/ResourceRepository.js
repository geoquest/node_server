/**
 * This module provides basic methods to query for resources.
 */

var Resource = require('./Resource');

ResourceRepository = function(gridFSConnection, connection) {
	if (gridFSConnection === undefined) {
		throw new Error("Connection parameter omitted!");
	}
	if (gridFSConnection === null) {
		throw new Error(
				"Invalid gridFSConnection or gridFSConnection could not be established!");
	}

	/**
	 * The MongoDB database connection.
	 * 
	 * @var {Object}
	 */
	this._gridFS = gridFSConnection;

	/**
	 * Function callbacks that are invoked whenever an internal error occurs.
	 * 
	 * @var {Array} An array of error handler callbacks.
	 */
	this._errorHandlers = [];
};

/**
 * Persists a given resource to the database. The file represented by the
 * resource is saved using GridFS (@see{GridFSConnection}).
 * 
 * Additionally saves the resource's metadata (user_id, game_id, etc.)
 * 
 * @param resource
 *            must be a valid instance of Resource
 * @throws Error if no Resource is given or the Resource is invalid
 */
ResourceRepository.prototype.insert = function(resource) {
	if (!(resource instanceof Resource.class)) {
		throw new Error('Object to be inserted must be an instance of Resource');
	}

	if (!resource.validate) {
		throw new Error('Resource to be inserted is not valid.');
	}

	var metadata = {
		game_id : resource.getGame().getId(),
		user_id : resource.getUser().getId(),
		date : resource.getDate()
	};

	this._gridFS.saveFile(resource.getFilename(), resource.getTempPath(), metadata, function(error, fileInfo) {
		if (error) {
			console.log(error);
		}
	});
};

/**
 * Searches for all resources that are connected to the given game.
 * 
 * Passes the Resource objects that were found to the provided
 * callback:
 * <code>
 * var callback = function(resources) {
 *     // Work with resources here.
 * };
 * </code>
 * 
 * @param {Game} game
 * @param {function} callback
 */
ResourceRepository.prototype.findAllByGame = function(game, callback) {
	
};

/**
 * Searches for the resource with the provided id.
 * 
 * Passes the resource that was found to the callback.
 * Passes null if no resource was found.
 * 
 * @param {String} id
 * @param {function} callback
 */
ResourceRepository.prototype.findById = function(id, callback) {
	
};

/**
 * Notifies all registered error callback about an error that occurred recently.
 * 
 * @param {String}
 *            error
 */
ResourceRepository.prototype._notifyAboutError = function(error) {
	for ( var i = 0; i < this._errorHandlers.length; i++) {
		// Pass the error to each handler.
		this._errorHandlers[i](error);
	}
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
ResourceRepository.prototype.addErrorHandler = function(callback)
{
	this.errorHandlers.push(callback);
};

/**
 * Creates a callback that handles a MongoDB result.
 * 
 * In case of a successful result it will convert the result 
 * set and pass it to the provided callback.
 * 
 * @param {function}
 * @param {function} The function that is used to convert the result set.
 * @return {function}
 */
ResourceRepository.prototype._createResultHandler = function(callback, conversionFunction) {
	// Store the current context as the scope changes in the callback.
	var self = this;
	return function(error, result) {
		if (error) {
			self._notifyAboutError(error);
			return;
		}
		// Convert result to model.
		callback(conversionFunction(result));
	};
};

exports.class = ResourceRepository;
