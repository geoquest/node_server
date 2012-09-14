var mongodb = require("mongodb");
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbconf = require('./conf/dbconf');
var GridStore = mongodb.GridStore;


var STATE_CLOSED = 0;
var STATE_OPENING = 1;
var STATE_OPEN = 2;

GridFSConnection = function() {

	this._state = STATE_CLOSED;
	this._db = null;
	this._eventBuffer = new Array();

};

GridFSConnection.prototype._openConnection = function(callback) {
	if (this._state == STATE_CLOSED) {
		this._state = STATE_OPENING;
		
		var self = this;
		var tempDb = new Db(dbconf.dbname, new Server(dbconf.host, dbconf.port));
		tempDb.open(function(error, db) {
			if (error) {
				self._state = STATE_CLOSED;
				console.log(error);
			} else {
				self._state = STATE_OPEN;
				
				for (var i in self._eventBuffer) {
					self._eventBuffer[i](db);
				};
			}
			if (callback) {
				callback(error, db);
			}
		});
	};
};

GridFSConnection.prototype.saveFile = function(newFilename, fileToWrite, callback) {

	var event = function(db) {
		var gs = GridStore(db, newFilename, "w");
		gs.writeFile(fileToWrite, callback);
	};

	if (this._state == STATE_OPEN) {
		event(this._db);
	} else {
		this._eventBuffer.push(event);
		this._openConnection();
	};
};


exports.class = GridFSConnection;
