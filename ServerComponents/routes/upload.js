
/**
 * Get the form used for uploading games
 */
this.uploadGameForm = function (req, res) {
	res.render('upload.ejs');
};

/**
 * Handle the POST request containing the uploaded game file
 */
this.uploadGame = function (req, res) {
	//res.render('upload.ejs');
};