/**
 * The app to run ONLY once when defining the "DB Schema"...
 */

//cset up the DB "Schema"...
// this should run ONLY ONCE, when server is set up for the first time
// (done in order to have a first entry in order to define a data format)
db.REGISTERED.insert(
    {
        firstName:"First Name", 
        lastName:"Last Name", 
        email:"someone@example.com", 
        user:"UserName00", 
        password:"whatever password"
    }, 
    function(schemaErr, schemaDefine){
        if (echemaErr || !schemaDefine || (schemaDefine.length==0) ){
            console.log("Could not complete request!");
        } else {
            console.log("\"Schema\" defined!");
        }
    }
);