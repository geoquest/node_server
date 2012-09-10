
/*request = {
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
		};*/

Request = function() 
{
	this.params = null;
	this.session = null;
};

Request.prototype.param = function(name) 
{
	
};

exports.class = Request;