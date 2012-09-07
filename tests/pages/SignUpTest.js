var assert = require("assert");
var User = require("../../ServerComponents/User");
var SignUp = require("../../ServerComponents/pages/SignUp");

describe('SignUp page', function() {
	
	var page = null;
	var userRepository = null;
	var request = null;
	var response = null;
	
	beforeEach(function() {
		
		request = {
			'method': 'GET',
			'params': {},
			'session': {},
			// Simulate param() function.
			'param': function(name) {
				if (name in this.params) {
					return this.params[name];
				}
				return undefined;
			}
		};
		
		response = {
			// The object remembers the last rendered template
			// for later checks.
			template: null,
			render: function(template) {
				this.template = template;
			}
		};
		
		userRepository = {
			byGeoQuestIdentifier: function(identifier, callback) {
				// Per default a miss is simulated: User is not in the database
				callback(null);
			}
		};
		
		page = new SignUp.class();
		page.setUserRepository(userRepository);
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
		userRepository = null;
		response = null;
		request = null;
	});

	describe('handleRequest', function() {
		
		it('render SignUp form for GET request', function(){
			page.handleRequest(request, response);
			assert.equal('signup.ejs', response.template);			
		});
		
	});
	
	
});
