/**
 * The mapping between the attributes of this object and the attributes of the JSON Representation.
 */
var mapping = {
    // Expected JSON property -> private GameState attributes 
    'state': 'state'
};

GameState = function(json){
	if(!((typeof json)=='object')){
		throw new Error("object not received");
	}
	this.state = json;	
};

GameState.prototype.getGameSessionId = function(){
	var sessionId = this.state.id;
	return sessionId;
};

GameState.prototype.getState = function() {
	return this.state;
};

GameState.prototype.toJSON = function() {
    var jsonObj = {};
    for (var property in mapping) {
        jsonObj[property] = this[mapping[property]];
    }
    return jsonObj;
};

/**
 * Uses the provided JSON data to create a new game state.
 * 
 * @param {Object} jsonObject
 * @return {GameState}
 */
var fromJSON = function(jsonObject) {
	if ((typeof jsonObject) !== 'object') {
		throw new Error('JSON object expected. Received: ' + (typeof jsonObject));
	}
	var gameState = new GameState({});
	for (var property in mapping) {
		if (!jsonObject.hasOwnProperty(property)) {
			// The JSON object does not contain
			// the required property.
			throw new Error('JSON object does not contain property ' + property);
		}
		// Find the private attribute that we have to map 
		// this property to.
		var attribute = mapping[property];
		gameState[attribute] = jsonObject[property];
	}
	return gameState;
};

exports.class = GameState;
exports.fromJSON = fromJSON;