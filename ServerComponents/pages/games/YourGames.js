var Game = require("../../Game.js");
var fs = require('fs');

YourGames = function() {
	this._gameRepository = null;
	this._gameValidator = null;
	this._template = null;
	this._templateVariables = {};
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
YourGames.prototype.setGameRepository = function(repository) {
	this._gameRepository = repository;
};

/**
 * Receives the GameValidator via dependency injection.
 * 
 * @param {GameValidator} validator
 */
YourGames.prototype.setGameValidator = function(validator) {
	this._gameValidator = validator;
};

YourGames.prototype.handleRequest = function(request, response) {
	
};

exports.class = YourGames;