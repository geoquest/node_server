var mapping = {
        // Expected JSON property -> private Game attributes 
        'authors': '_authors',
        'content': '_content'
    };

Game = function() {

	/**
	 * A list of authors.
	 * 
	 * Contains a list of authors
	 * 
	 * @var {[String]}
	 */
	this._authors = [];

	/**
	 * Content of the uploaded Game
	 * 
	 * 
	 * @var {JSON}
	 */
	this._content = null;
};


Game.prototype.getAuthors = function() {
	return this._authors;
};

/**
 * Append an author to the existing list of game authors.
 * 
 * @param {String}
 *            author identifier
 * @throws {Error}
 *             If null is passed.
 */
Game.prototype.addAuthor = function(author) {
	if(author !== null) {
		this._authors.push(author);
	} else {
		throw new Error("No user id passed. Please give your id.");
	}
};


Game.prototype.getContent = function() {
	return this._content;
};

Game.prototype.setContent = function(content) {
	
	if(! (content instanceof Object || content == null)  )
		throw new Error('Type must not be primitive (use object or null).');
	
	this._content = content;
};

/**
 * Creates a human-readable description of the game.
 * 
 * @return {String}
 */
Game.prototype.toString = function() {
	// TODO extract game description from JSON content
	return 'Game description';
};

/**
 * Creates a JSON Object describing this Game Object.
 * @returns a JSON Object
 */
Game.prototype.toJSON = function() {
    var jsonObj = {};
    for (var property in mapping) {
        jsonObj[property] = this[mapping[property]];
    }
    return jsonObj;
};

/**
 * Converts a JSON object with game data into a real Game object.
 * 
 * @param {Object} JSON object with game data.
 * @return {Game.class}
 * @throws Error If no JSON object is passed or a property is missing.
 */
var fromJSON = function(jsonObject) {
	if ((typeof jsonObject) !== 'object') {
		throw new Error('JSON object expected. Received: ' + (typeof jsonObject));
	}
	var game = new Game();
	for (var property in mapping) {
		if (!jsonObject.hasOwnProperty(property)) {
			// The JSON object does not contain
			// the required property.
			throw new Error('JSON object does not contain property ' + property);
		}
		// Find the private attribute that we have to map 
		// this property to.
		var attribute = mapping[property];
		game[attribute] = jsonObject[property];
	}
	return game;
};

exports.class = Game;
exports.fromJSON = fromJSON;
