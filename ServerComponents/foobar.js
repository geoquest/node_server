var mongodb = require("mongodb");
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbconf = require('./conf/dbconf');
var GridStore = mongodb.GridStore;
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var GridFSConnection = require('./GridFSConnection');





connection = new GridFSConnection.class();
connection.readFile("5059c7477e7de4300e000001", function(fileContents){
	console.log("LENGTH : "+fileContents.length);
	console.log(fileContents);
});