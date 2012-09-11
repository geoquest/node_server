var extAuthConf = require('../conf/extAuthConf');
var everyauth = require('everyauth');

//configure everyauth
everyauth.everymodule.findUserById(function(id, callback) {
	// Invoke callback to ensures that the routing proceeds.
	// Do not provide user information yet, this is handled 
	// by the login pages.
    callback(null, null);
});

everyauth
	.facebook
	.appId(extAuthConf.fb.appId)
	.appSecret(extAuthConf.fb.appSecret)
	.findOrCreateUser(function (session, accessToken, accessTokenExtra, fbUserMetadata) {
		// Pass Facebook user data to the session, so that it
		// can be processed by the login page module.
	    session.facebookUser = fbUserMetadata;
	    return fbUserMetadata;
	}).redirectPath('/login/facebook');

everyauth.google
	.appId(extAuthConf.google.clientId)
	.appSecret(extAuthConf.google.clientSecret)
	.scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
	.findOrCreateUser(function (session, accessToken, extra, googleUser) {
		// Pass Google user data to the session, so that it
		// can be processed by the login page module.
	    session.googleUser = googleUser;
	    return googleUser;
	}).redirectPath('/login/google');

module.exports = everyauth;