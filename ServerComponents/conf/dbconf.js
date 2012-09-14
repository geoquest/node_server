var dbname = "test";
var host = "localhost";
var port = 27017;

var dbconf = {
	dbname: dbname,
	host: host,
	port: port,
	url: host + ":" + port + "/" + dbname
  , collections : ["REGISTERED", "users", "games", "fs.chunks"]
  , salt : '1@#4%^78()'
};

module.exports = dbconf;
