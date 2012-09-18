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
		templatePath = __dirname + '/../../../ServerComponents/views/games/your-games.ejs';
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
 				},
 				getId: function(){
 					return '7xq9t57z39yqsu9p';
 				}
 			},
 			{
 				toString: function() {
 					return 'Game2';
 				},
 				getId: function(){
 					return '9y7ed6gue6tsn6f9';
 				}
 			}
 		];
 		ejs.renderFile(templatePath, {showDialog: false, title : '', msgModal : '', 'games': games, 'msg': 'Hello', 'uploadError' : false, 'highlightGameId' : '7xq9t57z39yqsu9p'}, function(error, html) {
 			if (error) {
 				assert.fail('Rendering error: ' + error);
 			}
 			assert.notEqual(html.indexOf('Game1'), -1);
 			assert.notEqual(html.indexOf('Game2'), -1);
 			done();
 		});
	});
	
	it('shows provided message', function(done) {
		ejs.renderFile(templatePath, {showDialog: false, title : '', msgModal : '','games': [], 'msg': 'Hello World!', 'uploadError' : false, 'highlightGameId' : '7xq9t57z39yqsu9p'}, function(error, html) {
 			if (error) {
 				assert.fail('Rendering error: ' + error);
 			}
 			assert.notEqual(html.indexOf('Hello World!'), -1);
 			done();
 		});
	});
});