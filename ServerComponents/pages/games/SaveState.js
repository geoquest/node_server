/**
 * Page that accepts a game state in JSON format and stores it.
 * 
 * The JSON data must be included in the body. It must be send
 * with the content type "application/json".
 * It is although required, that the user whose game state
 * is uploaded is logged in.
 */

var GameState = require('../../GameState');

/**
 * Constructor function that creates the page object.
 * 
 * @returns {SaveState}
 */
SaveState = function() {
	this.gameStateRepository = null;
};

/**
 * Receives the game state repository via dependency injection.
 * 
 * @param {Object} stateRepository
 */
SaveState.prototype.setGameStateRepository = function(stateRepository) {
	this.gameStateRepository = stateRepository;
};

/**
 * Stores the game state that is included in the received request.
 * 
 * @param {Object} request
 * @param {Object} response
 */
SaveState.prototype.handleRequest = function(request, response)
{
	if (request.method !== 'POST') {
		// Game state must be send via POST.
        response.status(500);
        response.end();
        return;
	}
	if (request.body === null || (typeof request.body) !== 'object') {
		// No valid JSON found in the body.
		response.status(500);
        response.end();
        return;
	}
	var stateData = request.body;
	var state = new GameState.class(stateData);
	this.gameStateRepository.save(state, request.session.user);
	response.end();
};

exports.class = SaveState;