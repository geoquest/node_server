var dbname = "test";
var host = "localhost";
var port = "27017";

module.exports = {
	url: host + ":" + port + "/" + dbname
  , collections : ["REGISTERED"]
  , salt : '1@#4%^78()'
};