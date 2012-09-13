var gameState = require('./GameState');

GameStateRepository = function(connection) 
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
	
	/**
	 * Function callbacks that are invoked whenever an internal error occurs.
	 * 
	 * @var {Array} An array of error handler callbacks.
	 */
	this.errorHandlers = [];
};
GameStateRepository.prototype.insertGame = function(gameState){
    var self = this;
    var insertCallback = function(queryResult){
        if (queryResult == null){
            var json = user.toJSON();
            self.connection.gameState.insert(json, function(err){
                if (err) {
                    self._notifyAboutError(err);
                }
            });
        } else {
            self._notifyAboutError('GameState is already in the DB.');
        }
    };
}
GameStateRepository.prototype.byGameSessionId = function(identifier,user, callback)
{
	var query = {
		'userId': user.getId(), 
		'state': {
			'id': identifier
		}
	};
	this.connection.users.find(query, this._createResultHandler(callback));
};
GameStateRepository.prototype._jsonToGameState = function(result) {
	if (result.length === 0) {
		// No user was found.
		return null;
	}
	return GameState.fromJSON(result[0]);
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
GameStateRepository.prototype._createResultHandler = function(callback) {
	// Store the current context as the scope changes in the callback.
	var self = this;
	return function(error, result) {
		if (error) {
			self._notifyAboutError(error);
			return;
		}
		// Convert result to model.
		callback(self._jsonToUser(result));
	};
};
