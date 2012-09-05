/**
 * Helper class that is able to push dependencies into
 * given JavaScript objects if desired.
 *
 * A object with dependencies is required to create 
 * a new DependencyInjector:
 * <code>
 * var DependencyInujector = require('DependencyInjector');
 * var dependencies = {
 *     'setDatabaseConnection': function() {
 *        return require('mongojs').connect('localhost:27017/dbname');
 *     },
 *     'setEveryAuth': function() {
 *         return require('everyauth');
 *     }
 * }
 * var injector = new DependencyInujector.class(dependencies);
 * </code>
 * The dependencies object uses the name of the function that
 * receives a dependency as key. The value is a function that
 * creates the dependency if required.
 * 
 * To inject dependencies into an object the inject() function
 * is used:
 * <code>
 * var object = {
 *     setDatabaseConnection: function(connection) {
 *         // Start using the connection here
 *     }
 * }
 * injector.inject(object);
 * </code>
 * Assuming we are using the injector from the previous example,
 * it will pass the database connection to the setDatabaseConnection()
 * function here.
 * The everyauth dependency will be omitted as the object does not
 * define a function named 'setEveryAuth'.
 */

Injector = function(dependencies) 
{
	
}

/**
 * Injects dependencies into the provided object.
 * 
 * For convenience this method returns the object that
 * was passed as argument. This allows chaining of method
 * calls.
 * 
 * @param {Object} object The object that receives dependencies.
 * @return {Object} The object that was passed.
 */
Injector.prototype.inject = function(object) 
{
	
};

exports.class = Injector;