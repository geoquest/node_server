node_server
===========

The shiny fast server running with node.js


# Install & Run #

Install all required dependencies by executing this command in the 
project root:

    npm install
    
Use this to run all unit tests:

    npm test
    
Run this command to start the server that listens on port 3000 per default:

    npm run-script start-server

# Dependencies #

The following dependencies are used by the server.

## express ##

Web framework that this server is based upon.

[Project page](http://expressjs.com/)

[Project on Github](https://github.com/visionmedia/express)

## ejs ##

EJS template engine for express.

[Project on Github](https://github.com/visionmedia/ejs)

## express-ejs-layouts ##

Module that addes layout functionality to EJS.

[Project on Github](https://github.com/Soarez/express-ejs-layouts)

## everyauth ##

Library that is used to perform Facebook and Google+ authentication.

[Project on Github](https://github.com/bnoguchi/everyauth)

## mongojs ##

MongoDB driver that is used to access the database.

[Project on Github](https://github.com/gett/mongojs)

## GridFS ##

GridFS is used to store files in MongoDB.

[Tutorial to get started](http://mongodb.github.com/node-mongodb-native/api-articles/nodekoarticle2.html)

[Documentation on Github](https://github.com/mongodb/node-mongodb-native/blob/master/docs/gridfs.md)

[GridStore API](http://mongodb.github.com/node-mongodb-native/api-generated/gridstore.html)

## validator ##

Provides functions for several validation tasks (for example checking email addresses).

[Project on Github](https://github.com/chriso/node-validator)

## express-validator ##

Middleware that integrates validation capabilities into the request object.

[Project on Github](https://github.com/ctavan/express-validator)

## JSV ##

A JSON schema validator.

[Project on Github](https://github.com/garycourt/JSV)

## mocha ##

Framework that is used for unit testing.

[Project page](http://mochajs.org/)

[Project on Github](https://github.com/mochajs/mocha)

## rimraf ##

Provides a function that deletes a directory with all of it contents.

[Project on Github](https://github.com/isaacs/rimraf)
