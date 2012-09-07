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
 * Creates a JSON Object describing this Game Object.
 * @returns a JSON Object
 */
Game.prototype.toJSON = function(){
    var jsonObj = {};
    for (var property in mapping){
        jsonObj[property] = this[mapping[property]];
    }
    return jsonObj;
};

exports.class = Game;