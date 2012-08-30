/**
 * The app to run ONLY once when defining the "DB Schema"...
 */


var databaseUrl = "localhost:27017/test"; // "username:password@example.com/mydb"
//use db.getName() to get the databse name. Here it is "test" (on pool-c-03)
var collections = ["REGISTERED"]; //array of table names
var db = require("mongojs").connect(databaseUrl, collections);

console.log("Connected to DB!");

//set up the DB "Schema"...
// this should run ONLY ONCE, when server is set up for the first time
// (done in order to have a first entry in order to define a data format)
var noOfCurrentEntriesInDB=0;
db.REGISTERED.find({}, function(err, countEntries){
    if (err || !countEntries){
        console.log("Error accessing DB...");
    } else {
        noOfCurrentEntriesInDB=countEntries.length;
        addSchemaToDB();
    }
});


function addSchemaToDB(){
    if (noOfCurrentEntriesInDB > 0){
        console.log("The database is not empty! Schema definition is designed only for empty databases!");
    } else {
        db.REGISTERED.insert(
            {
                firstName:"First Name", 
                lastName:"Last Name", 
                email:"someone@example.com", 
                user:"UserName00", 
                password:"whatever password"
            }, 
            function(err, schemaDefine){
                if (err || !schemaDefine || (schemaDefine.length==0) ){
                    console.log("Could not complete request!");
                } else {
                    console.log("\"Schema\" defined!");
                }
            }
        );
    }

}
