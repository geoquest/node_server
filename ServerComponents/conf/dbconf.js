var dbname = "test";
var host = "localhost";
var port = "27017";

var dbconf = {
	url: host + ":" + port + "/" + dbname
  , collections : ["users", "games", "gameStates"]
};

module.exports = dbconf;