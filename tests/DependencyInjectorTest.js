var assert = require("assert");

var DependencyInjector = require("../ServerComponents/DependencyInjector.js");

describe('DependencyInjector', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {DependencyInjector.class}
	 */
	var injector = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		var runningNumber = 0;
		var dependencies = {
		    'setName': function() {
		    	return 'GeoQuest';
		    },
			'setCounter': function() {
				runningNumber++;
				return runningNumber;
			}
		};
		injector = new DependencyInjector.class(dependencies);
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		injector = null;
	});
	
});
