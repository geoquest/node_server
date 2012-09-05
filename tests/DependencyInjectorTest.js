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
	
	describe('constructor', function() {
		it('creates DependencyInjector object', function() {
			assert.ok(injector instanceof DependencyInjector.class);
		});
		it('throws exception if dependencies are not provided', function() {
			assert.throws(function() {
				new DependencyInjector.class();
			});
		});
		it('throws exception if no object provided', function() {
			assert.throws(function() {
				new DependencyInjector.class('This is invalid');
			});
		});
	});
	
	describe('inject', function() {
		it('throws exception if no object is provided', function() {
			assert.throws(function() {
				injector.inject('invalid content');
			});
		});
		it('does nothing if no dependency can be injected', function() {
			assert.doesNotThrow(function() {
				injector.inject({});
			});
		});
		it('returns provided object', function() {
			var object = {
				'id': 'object 42'
			};
			var result = injector.inject(object);
			assert.strictEqual(result, object);
		});
		it('injects dependency if function is available', function() {
			var object = {
			    name: null,
				setName: function(name) {
					// Stores the provided name in an object
					// attribute if this function is called.
					this.name = name;
				}
			};
			injector.inject(object);
			assert.equal(object.name, 'GeoQuest');
		});
		it('creates dependency for each injection', function() {
	        var object = {
	        	number: 0,
	        	setCounter: function(number) {
	        		// Stores the provided number in an object
					// attribute if this function is called.
					this.number = number;
	        	}	
	        };
	        injector.inject(object);
	        assert.equal(object.number, 1);
	        // On the second call the number should be incremented.
	        injector.inject(object);
	        assert.equal(object.number, 2);
		});
		it('throws exception if hook property is available, but not a function', function() {
			assert.throws(function() {
				var object = {
				    // This is named like a dependency hook, but
				    // it is not a function.
					setCounter: 42	
				};
				injector.inject(object);
			});
		});
		it('injects objects by reference', function() {
			var dependency = {
				globalCounter: 0
			};
			// Create an injector with a dependency that stays always the same.
			injector = new DependencyInjector.class({setDependency: function() { return dependency; }});
			var object = {
				dependency: null,
				setDependency: function(dependency) {
					this.dependency = dependency;
				}
			};
			// Inject the dependency...
			injector.inject(object);
			// ... and modify the original object.
			dependency.globalCounter = 1;
			// Now the injected object should reflect that change:
			assert.equal(object.dependency.globalCounter, 1);
		});
	});
	
});
