var mongodb = require("mongodb");
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbconf = require('./conf/dbconf');
var GridStore = mongodb.GridStore;

var STATE_CLOSED = 0;
var STATE_OPENING = 1;
var STATE_OPEN = 2;

/**
 * Provides a basic connection to mongo's GridFS storage system. The mongo
 * connection is created on demand, all access to the connection is buffered
 * until the connection is opened successfully.
 * 
 * For this three internal states are used (CLOSED, OPENING, OPEN).
 * 
 * @returns {GridFSConnection}
 */
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

				for ( var i in self._eventBuffer) {
					self._eventBuffer[i](db);
				}
				;
			}
			if (callback) {
				callback(error, db);
			}
		});
	}
	;
};

/**
 * Save a given file to GridFS. Additional information describing the file can
 * be passed using the metadata parameter.
 * 
 * @param newFilename
 * @param fileToWrite
 * @param metadata
 * @param callback
 *            should have the form <code>function(error, result) {...}</code>
 *            and will be called after saving of the file succeeded or failed
 */



GridFSConnection.prototype.executeDBEvent(event){		
	if (this._state == STATE_OPEN) {
		event(this._db);
	} else {
		this._eventBuffer.push(event);
		this._openConnection();
	}
};

GridFSConnection.prototype.saveFile = function(newFilename, fileToWrite,
		metadata, callback) {

	if (callback === undefined) {
		throw new Error('Callback function is required.');
	};
	
	var event = function(db) {
		var gs = GridStore(db, newFilename, "w");

		if (metadata != null) {
			gs.options.metadata = metadata;
		}

		gs.writeFile(fileToWrite, callback);
	};
	this.executeDBEvent(event);	
};

GridFSConnection.prototype.loadGamesList = function(userId, callback){
	
	//THIS IS NOT REALLY NEEDED... DELETE IT IF IT REALLY PROVES WORTHLESS :| 
	
	var gamesList = [];
	
	db.open(function(err, db) {
		
		//getting the games list for the given author (search is done by ID)
		db.collection('games', function(err, collection) {
			collection.find({'authors': userId}, function(err, cursor){
		        cursor.toArray(function(err, docs){		        	
		        	for (i in items){
		        		gamesList.add(docs[i]._id);	        		
		        	}		        	
		        	callback(gamesList);
		        });
			});
		});
	});
};


GridFSConnection.prototype.loadResourcesList = function(gameId, callback){
	
	var resourcesIDs = [];
	//TODO: construct the Resource objects for each resource and pass an array of those objects
	//just passing the IDs may be insufficient
	
	
	//TODO: (alternative) instead of constructing the Resource objects, let that task for the ResourceRepository and just pass a json with the necessary data
	
	var id = ObjectID.createFromHexString(gameId);
	
	db.open(function(err, db) {
		
		//getting the resources list for the given author (search is done by ID)
		db.collection('fs.files', function(err, collection) {
			collection.find({"metadata.game_id" : id}, function(err, cursor){				
		        cursor.toArray(function(err, docs){		        	
		        	for (i in items){
		        		gamesList.add(docs[i]._id);	        		
		        	}		        	
		        	callback(resourceIDs);
		        });
			});
		});
	});	
};


GridFSConnection.prototype.getResource = function(resourceID,callback){
	
	filePath = null;	
	//validate the file path
	
	
	
	event = function(db,callback) {	
		var id = ObjectID.createFromHexString(resourecID);	
		var gridStore = new GridStore(db, id,"r");
		var fileName = gridStore.filename;
		
		
		//TODO: construct Resource object here and pass it on to the callback  
		
		
		
		gridStore.open(function(err,gridStore){		
			
			//TODO: add the file path instead of the "./" -> the file path should be taken from a config file or smthg ... 
			
			var fileStream = fs.createWriteStream("./"+resourceID); //do not pass the file name, but the resourceID - that one's unique and does not cause problems
			var stream = gridStore.stream(true);
			stream.on("data", function(chunk) {
				fileStream.write(chunk);
	        });			
			stream.on("end", function(err) {
				console.log(err);
				var filePath = fileStream.
				callback();
				
			});
		});		
	};
	
	this.executeDBEvent(event);
};



		
		
		

exports.class = GridFSConnection;
