var dbname = "test";
var host = "localhost";
var port = 27017;

var dbconf = {
	dbname: dbname,
	host: host,
	port: port,
	url: host + ":" + port + "/" + dbname
  , collections : ["users", "games", "gameStates"]
};

module.exports = dbconf;
