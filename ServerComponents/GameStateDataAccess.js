var GameState = require('./GameState');

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

GameStateRepository.prototype.byGameSessionId = function(identifier, user, callback)
{
	var query = {
		'userId': user.getId(), 
		'state': {
			'id': identifier
		}
	};
	this.connection.gameStates.find(query, this._createResultHandler(callback));
};

GameStateRepository.prototype.save = function(state, user) {
	var self = this;
	this.byGameSessionId(state.getGameSessionId(), user, function(existingState) {
		if (existingState !== null) {
			state.setId(existingState.getId());
		}
		var json = self._gameStateToJson(state, user);
		self.connection.gameStates.save(json);
	});
};

/**
 * Creates a callback that handles a MongoDB result.
 * 
 * Notifies error handlers if an error occurs. In case of
 * a successful result it will convert the result set 
 * into a GameState object (or null if not found) and 
 * pass it to the provided callback.
 * 
 * @param {function}
 * @return {function}
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
		callback(self._jsonToGameState(result));
	};
};

GameStateRepository.prototype._jsonToGameState = function(result) {
	if (result.length === 0) {
		// No game state was found.
		return null;
	}
	var state = GameState.fromJSON(result[0].gameState);
	state.setId(result[0]._id);
	return state;
};

GameStateRepository.prototype._gameStateToJson = function(state, user) {
	var stateAsJson = state.toJSON();
	var json = {
		'userId': user.getId(),
		'gameState': stateAsJson
	};
	if (state.getId() != null) {
		json._id = state.getId();
	}
	return json;
};

exports.class = GameStateRepository;