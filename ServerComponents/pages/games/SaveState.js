var GameState = require('../../GameState');

SaveState = function() {
	this.gameStateRepository = null;
};

SaveState.prototype.setGameStateRepository = function(stateRepository) {
	this.gameStateRepository = stateRepository;
};

SaveState.prototype.handleRequest = function(request, response)
{
	if (request.method !== 'POST') {
        response.status(500);
        response.end();
        return;
	}
	if (request.body === null || (typeof request.body) !== 'object') {
		response.status(500);
        response.end();
        return;
	}
	var stateData = request.body;
	var state = new GameState.class(stateData);
	this.gameStateRepository.save(state);
	response.end();
};

exports.class = SaveState;