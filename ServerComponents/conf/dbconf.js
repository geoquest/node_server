var dbname = "test";
var host = "localhost";
var port = "27017";

/*
module.exports = {
	url: host + ":" + port + "/" + dbname
  , collections : ["REGISTERED"]
  , salt : '1@#4%^78()'
};
*/


var dbconf = {
	url: host + ":" + port + "/" + dbname
  , collections : ["users", "games", "gameStates"]
};

module.exports = dbconf;