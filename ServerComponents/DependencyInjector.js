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
	if ((typeof dependencies) !== 'object') {
		throw new Error('Object with dependencies expected, but received: ' + (typeof dependencies));
	}
	this._dependencies = dependencies;
};

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
	if ((typeof object) !== 'object') {
		throw new Error('Expected object to inject into, but received ' + (typeof object[hook]));
	}
	for (var hook in this._dependencies) {
		if ((typeof object[hook]) === 'undefined') {
			// This dependency is not needed, therefore proceed.
			continue;
		}
		if ((typeof object[hook]) !== 'function') {
			throw new Error('Cannot inject via hook. Expected function, but property is of type ' + typeof object[hook]);
		}
		// Create the dependency...
		var dependency = this._dependencies[hook]();
		// ... and inject it.
		object[hook](dependency);
	}
	return object;
};

exports.class = Injector;