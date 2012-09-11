var assert = require('assert');
var ejs = require('ejs');
var fs = require('fs');

describe('list games template', function() {
	
	/**
	 * Path to the tested template.
	 * 
	 * @var {String}
	 */
	var templatePath = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		templatePath = __dirname + '/../../../ServerComponents/views/games/list.ejs';
		templatePath = fs.realpathSync(templatePath);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		templatePath = null;
	});
	
	it('shows names description of games', function(done) {
		var games = [
 			{
 				toString: function() {
 					return 'Game1';
 				}
 			},
 			{
 				toString: function() {
 					return 'Game2';
 				}
 			}
 		];
 		ejs.renderFile(templatePath, {'games': games}, function(error, html) {
 			if (error) {
 				assert.fail('Rendering error: ' + error);
 			}
 			assert.notEqual(html.indexOf('Game1'), -1);
 			assert.notEqual(html.indexOf('Game2'), -1);
 			done();
 		});
	});
});