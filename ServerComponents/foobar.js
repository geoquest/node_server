var mongodb = require("mongodb");
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbconf = require('./conf/dbconf');
var GridStore = mongodb.GridStore;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');

console.log("begin...");

var server = new Server('localhost', 27017, {auto_reconnect: true});

var db = new Db(dbconf.dbname, new Server(dbconf.host, dbconf.port));



var gridStore = new GridStore(db,"newFile","r");

// Establish connection to db  
db.open(function(err, db) {
	
	
	var id = ObjectID.createFromHexString("50586c39ea2ac3d00e000001");
	
	
	db.collection('fs.files', function(err, collection) {
		collection.find({"metadata.game_id" : id}, function(err, cursor){
	        cursor.toArray(function(err, docs){
	        	items = docs;        	
	        	
	        	
	        	console.log("===================GETTING QUERY RESULTS =======================================");
	        	
	        	console.log(items);
	        	
	        	console.log("================================================================================");
	        	
	        	for (i in items){
	        		console.log(items[i]._id);	        		
	        	}
	        	db.close();
	        });
		});
	});
	
	
	
//	// Open the gridStore for reading and pipe to a file
//	var gridStore = new GridStore(db, id,"r");
//	
//	
//	
//	gridStore.open(function(err,gridStore){
//		console.log(err);
//		console.log("opening gridstore");
//		
//		
//		
//		
////		gridStore.read(function(err, data) {
////            // Compare the file content against the orgiinal
////			
////			console.log(data.toString('base64'));
////            db.close();
////        });
//		
//		var fileStream = fs.createWriteStream("./5059c7bb7e7de4300e000004_WTF2.txt");
//		var stream = gridStore.stream(true);
////
//		stream.on("data", function(chunk) {
//            
//			console.log("chunk length : " + chunk.length);
//			console.log("=========================== CHUNK =================================");
//			console.log(chunk.toString('base64'));
//			fileStream.write(chunk);
//        });
//		
//		
//		stream.on("end", function(err) {
//			
//			
//					    
//		    			
//			console.log(err);
//			
//	});
		
		
		
		
		
		
			
});
	
	


    
      
    

