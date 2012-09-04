/**
 * This module provides basic methods to query for users.
 * 
 * Example:
 * <code>
 * var UserRepository = require("UserDataAccess");
 * var repository = new UserRepository.class(mongoDBConnection);
 * var user = repository.byGoogleIdentifier("1513235656");
 * </code>
 */

UserRepository = function(connection) 
{
	
};

UserRepository.prototype.byGoogleIdentifier = function(identifier)
{
	
};

UserRepository.prototype.byFacebookIdentifier = function(identifier)
{
	
};

UserRepository.prototype.byGeoQuestIdentifier = function(identifier)
{
	
};

exports.class = UserRepository;