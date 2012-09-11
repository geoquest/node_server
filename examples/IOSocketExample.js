exports.run = function(app) {

	// Bind route to handler function
	app.get('/socketExample', function(req, resp) {
		resp.render('../../examples/IOSocketExampleView.ejs', {
			title : "Socket Test",
			port : 9876
		});
	});

	// Open a listening socket for incoming connections
	var io = require('socket.io').listen(9876);

	// all open sockets are stored in here
	var activeConnections = [];

	io.sockets.on('connection', function(socket) {

		// add the new connection to active connections list
		activeConnections.push(socket);

		// make socket listen on the "chat" event
		socket.on('chat', function(data) {

			// broadcast the received message
			for ( var i in activeConnections) {
				activeConnections[i].emit("chat", data);
			}
		});
		
		// when a socket gets closed (i.e. browser-window is closed), broadcast this information
		socket.on('disconnect', function() {
			for ( var i in activeConnections) {
				activeConnections[i].emit("chat", {
					msg : "A user just disconnected..."
				});
			}
		});
	});
};