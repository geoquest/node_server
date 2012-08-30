/**
 * The server code skeleton. 
 */

var databaseUrl = "localhost:27017/test"; // "username:password@example.com/mydb"
//use db.getName() to get the databse name. Here it is "test" (on pool-c-03)
var collections = ["REGISTERED"]; //array of table names
var db = require("mongojs").connect(databaseUrl, collections);

console.log("Connected to DB!");