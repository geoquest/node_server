var Game = require('./Game');
var User = require('./User');


Resource = function() {

	/**
	 * Injected connection that is used to load the 
	 * content of the resource.
	 * 
	 * @var {Object}
	 */
	this._gridFSConnection = null;
	
	/**
	 * The internal id of the resource.
	 * 
	 * @var {String}
	 */
	this._id = null;
	
	/**
	 * The id of the game this resource belongs to.
	 * 
	 * @var {String}
	 */
	this._gameId = null;
	
	/**
	 * The id of the user that created the resource.
	 * 
	 * @var {String}
	 */
	this._userId = null;
	
	/**
	 * @var {String}
	 */
	this._filename = null;

	/**
	 * that's the temporary path that we store the resource one the file is uploaded to the server
	 * @var {String}
	 */
	this._tempPath = null;

	/**
	 * like image, video, audio...(to be defined...)
	 * @var {String}
	 */
	this._mimeType = null;

	/**
	 * The id of the game this resource belongs to.
	 * 
	 * @var {String}
	 */
	this._game = null;

	
	/**
	 * The id of the user that created this resource.
	 * 
	 * @var {String}
	 */
	this._user = null;
	
	/**
	 * @var {Date}
	 */
	this._date = null;
	
};

/**
 * Injects the GridFS connection.
 * 
 * The connection is used to load the content of this resource.
 * 
 * @param {String}
 */
Resource.prototype.setGridFSConnection = function(connection) {
	this._gridFSConnection = connection;
};

/**
 * Sets the resource id.
 * 
 * @param {String}
 */
Resource.prototype.setId = function(id) {
	this._id = id;
};

/**
 * The id of this resource.
 * 
 * @return {String}
 */
Resource.prototype.getId = function() {
	return this._id;
};

/**
 * Sets the game id.
 * 
 * @param {String}
 */
Resource.prototype.setGameId = function(id) {
	this._gameId = id;
};

/**
 * The id of the game that this resource belongs to.
 * 
 * @return {String}
 */
Resource.prototype.getGameId = function() {
	return this._gameId;
};

/**
 * Sets the user id.
 * 
 * @param {String}
 */
Resource.prototype.setUserId = function(id) {
	this._userId = id;
};

/**
 * The id of the user that created this resource.
 * 
 * @return {String}
 */
Resource.prototype.getUserId = function() {
	return this._userId;
};

Resource.prototype.getFilename = function() {
	return this._filename;
};

Resource.prototype.setFilename = function(filename) {
	if(filename !== null) {
		this._filename = filename;
	} else {
		throw new Error("No resource filename passed. Please give provide the filename.");
	}
};


Resource.prototype.getTempPath = function() {
	return this._tempPath;
};


Resource.prototype.setTempPath = function(tempPath) {
	if(tempPath !== null) {
		this._tempPath = tempPath;
	} else {
		throw new Error("No resource temp path passed. Please provide the temp path.");
	}
};


Resource.prototype.getMimeType = function() {
	return this._mimeType;
};

Resource.prototype.setMimeType = function(mimeType) {
	if(mimeType !== null) {
		this._mimeType = mimeType;
	} else {
		throw new Error("No resource mime type passed. Please provide the type.");
	}
};

/**
 * Returns the id of the game that this resource belongs to.
 * 
 * @return {String}
 */
Resource.prototype.getGame = function() {
	return this._game;
};

/**
 * Sets the game or game id.
 * 
 * @param {Game}|{String} game
 */
Resource.prototype.setGame = function(game) {
	if(game !== null && (game instanceof Game.class)) {
		this._game = game;
	} else {
		throw new Error("No game passed. Please provide the game.");
	}
};

/**
 * Returns the id of the user that created this resource.
 * 
 * @return {String}
 */
Resource.prototype.getUser = function() {
	return this._user;
};

/**
 * Sets the user or user id.
 * 
 * @param {User}|{String} game
 */
Resource.prototype.setUser = function(user) {
	if(user !== null && (user instanceof User.class)) {
		this._user = user;
	} else {
		throw new Error("No user passed. Please provide the user.");
	}
};


Resource.prototype.getDate = function() {
	return this._date;
};

Resource.prototype.setDate = function(date) {
	if(date !== null && (date instanceof Date )) {
		this._date = date;
	} else {
		throw new Error("No date obj passed. Please provide the date.");
	}
};

/**
 * Returns the content of this resource.
 * 
 * The content is passed to the provided callback:
 * <code>
 * var callback = function(wholeContent) {
 * 
 * };
 * </code>
 * 
 * @param {function} callback
 */
Resource.prototype.getContent = function(callback) {
	
};

/**
 * Validates if the resource has all fields required for being persisted to the database.
 * 
 * @returns {Boolean} true if the resource is valid, else false
 * @deprecated Is this used anywhere?
 */
Resource.prototype.validate = function(){
	var valid = true;
	
	//Resource.prototype.checkFileName()
	valid &= (this._filename != null && this._filename.length > 0);
		
	//Resource.prototype.checkTempPath()
	// TODO: check if file given by tempPath exists and is a valid file?
	valid &= (this._tempPath != null && this._tempPath.length > 0);
	
	//Resource.prototype.checkGame()
	valid &= (this._game != null);
	
	//Resource.prototype.checkUser()
	valid &= (this._user != null);
		
	return valid;
};


Resource.prototype.toString = function() {
	if (this._filename === null){
		return 'empty file name';
	}
	return this._filename;

};

exports.class = Resource;