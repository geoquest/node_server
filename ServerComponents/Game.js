var mapping = {
    // Expected JSON property -> private Game attributes 
    'authors': '_authors',
    'content': '_content',
    '_id': '__id',
    'version': '_version'
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
	
	/**
	 * Version of the uploaded Game
	 * has two underscores, since id is prefixed with underscore in db already
	 * 
	 * @var {String}
	 */
	this.__id = null;
	
	/**
	 * Version of the uploaded Game
	 * 
	 * @var {int}
	 */
	this._version = null;
	
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

Game.prototype.setId = function(id) {
	if(id !== null) {
		this.__id = id;
	} else {
		throw new Error("No game id passed. Please give your id.");
	}
};

Game.prototype.getId = function() {
	return this.__id;
};

Game.prototype.setVersion = function(version) {
	if(version !== null) {
		this._version = version;
	} else {
		throw new Error("No game version passed. Please give your version.");
	}
};

Game.prototype.getVersion = function() {
	return this._version;
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
 * Determines the name of the game.
 * 
 * @returns {String}
 */
Game.prototype.getName = function() {
	if (this._content === null) {
		throw new Error('No content available: Cannot determine game name.');
	}
	return this._content.name;
};

/**
 * Creates a human-readable description of the game.
 * 
 * @return {String}
 */
Game.prototype.toString = function() {
	if (this._content === null){
		return 'No Description Available';
	}
	return this.getName() + " v" + this._version;

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
			if ((property == '_id') || (property == 'version')) {
				// in this case the game hasn't been inserted into the database yet
				continue;
			}
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
