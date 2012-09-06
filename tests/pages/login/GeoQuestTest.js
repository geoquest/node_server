var assert = require("assert");

var GeoQuestLogin = require("../../../ServerComponents/pages/login/GeoQuest.js");

describe('GeoQuestLogin page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {GeoQuestLogin.class}
	 */
	var page = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		page = new GeoQuestLogin.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
	});
	
	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof GeoQuestLogin.class);
		});
	});
	
});