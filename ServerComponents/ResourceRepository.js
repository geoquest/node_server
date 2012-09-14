/**
 * This module provides basic methods to query for resources.
 */

var Resource = require('./Resource');

ResourceRepository = function(gridFSConnection) {
	if (gridFSConnection === undefined) {
		throw new Error("Connection parameter omitted!");
	}
	if (gridFSConnection === null) {
		throw new Error("Invalid gridFSConnection or gridFSConnection could not be established!");
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

ResourceRepository.prototype.insert = function(resource) {
	if (!(resource instanceof Resource.class)) {		
		throw new Error('Object to be inserted must be an instance of Resource');
	}
	
	this._gridFS.saveFile(resource.getFilename(), resource.getTempPath());
};

exports.class = ResourceRepository;
