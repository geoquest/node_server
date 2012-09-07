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
			//simulate variables in template
			templateVars: null, 
			render: function(template, templateVars) {
				this.template = template;
				this.templateVars = templateVars;
			}
		};
		
		userRepository = {
			user : null,
			byGeoQuestIdentifier: function(identifier, callback) {
				// Per default a miss is simulated: User is not in the database
				callback(null);
			},
			addErrorHandler : function(handler){
				//by default no error
			},
			insertUser : function(user){
				this.user = user;
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

	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof SignUp.class);
		});
	});
	
	describe('handleRequest', function() {
		
		it('render SignUp form for GET request', function(){
			page.handleRequest(request, response);
			assert.equal('signup.ejs', response.template);			
		});
		
		it('should render "Password not matched" if confirmPassword not matched', function(){
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			request.params.confirmPassword = 'notMatched';
			request.params.firstName = 'fName',
			request.params.lastName = 'lName',
			request.params.email = 'agile@lab.com';
			
			page.handleRequest(request, response);
			assert.equal('signupResult.ejs', response.template);
			assert.deepEqual({ title: 'Password not matched.', result: 'Please retry.'}, response.templateVars);
			
		});
		
		it('should render "User already in DB" if username already in DB', function(done){
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			request.params.confirmPassword = 'secret';
			request.params.fName = 'fName',
			request.params.lName = 'lName',
			request.params.email = 'agile@lab.com';
			
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, 'max.mustermann');
				// Simulate that the user was found.
				var user = new User.class();
				user.setLoginType('GeoQuest');
				user.setIdentifier('max.mustermann');
				user.setPassword('secret');
				callback(user);
				done();
			};
			
			page.handleRequest(request, response);
			assert.equal('signupResult.ejs', response.template);
			assert.deepEqual({ title: 'SignUp Failed.', result: 'This Username already existed.'}, response.templateVars);
			
		});
		
		it('should render SignUp Succeed. if insertion succeed', function(){
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			request.params.confirmPassword = 'secret';
			request.params.fName = 'fName',
			request.params.lName = 'lName',
			request.params.email = 'agile@lab.com';
						
			page.handleRequest(request, response);
			assert.equal('signupResult.ejs', response.template);
			assert.deepEqual({ title: 'SignUp Succeed.', result: 'Hi, ' +  request.params.fName + '!'}, response.templateVars);
			
		});
		
		it('should render err when theres error from userRepository', function(done){
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			request.params.confirmPassword = 'secret';
			request.params.fName = 'fName',
			request.params.lName = 'lName',
			request.params.email = 'agile@lab.com';
			
			//simulate err
			userRepository.addErrorHandler = function(errorHandler){
				var errmsg = 'error msg';
				errorHandler(errmsg);
				assert.equal('signupResult.ejs', response.template);
				assert.deepEqual({ title: 'SignUp Failed.', result: errmsg + 'Please retry.'}, response.templateVars);
				done();
			}
			
			page.handleRequest(request, response);			
		});
		
	});
	
	
});
