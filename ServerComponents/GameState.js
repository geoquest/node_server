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
exports.class = GameState;
