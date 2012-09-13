/**
 * This module provides function(s) that perform validation of Games 
 * (in JSON format) with respect to the schemas provided in 
 * "./resources/gameValidationSchemas".
 * 
 * gameValidator.validate(jsonObject);
 * This method returns true if the jsonObject is valid with respect to 
 * any of the schemas, otherwise it will return false.
 */

var schemas = require('../../conf/gameSchemas');
var JSV = require("jsv").JSV;


GameValidator = function(){
	this._env = JSV.createEnvironment();
};

GameValidator.prototype.validate = function(jsonObject, atomicGameTypeName){
	if (schemas.hasOwnProperty(atomicGameTypeName)) {
		//the schema for the type is defined, so proceed with validation
		var schema = require(schemas[atomicGameTypeName]);		
		var report = this._env.validate(jsonObject, schema);	
//		console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//		console.log(schema);
//		console.log(report);			
		return (report.errors.length === 0);
	} else {
		//the schema was not found so just return false
		//(may extend later to throw exception for this)
		return false;
	}
};

//GameValidator.prototype.validateOLD = function(jsonObject, atomicGameTypeName){
//	if (schemas.hasOwnProperty(atomicGameTypeName)) {
//		//the schema for the type is defined, so proceed with validation
//		var schema = require(schemas[atomicGameTypeName]);		
//		
//		return (report.errors.length === 0);
//	} else {
//		//the schema was not found so just return false
//		//(may extend later to throw exception for this)
//		return false;
//	}
//};

exports.class = GameValidator;