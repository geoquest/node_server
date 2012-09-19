/**
 * This module provides function(s) that perform validation of Games 
 * (in JSON format) with respect to the schemas provided in 
 * "./resources/gameValidationSchemas". On introducing new schemas it is
 * important to extend the configuration mapping in 
 * ./ServerComponents/conf/gameSchemas.js appropriately.  
 * 
 * gameValidator.validate(jsonObject);
 * This method returns true if the jsonObject is valid with respect to 
 * any of the schemas, otherwise it will return false.
 */

var schemas = require('../../conf/gameSchemas');
var JSV = require("JSV").JSV;

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
		console.log(report);			
		return (report.errors.length === 0);
	} else {
		//the schema was not found so just return false
		//(may extend later to throw exception for this)
		return false;
	}
};

GameValidator.prototype.validateGame = function(jsonObject){	
	var schema = require(schemas["gameSchema"]);
	var report = this._env.validate(jsonObject, schema);	
	if(report.errors.length === 0){
		var gameElements = jsonObject["gameElements"];
		for(var i in gameElements){
			var elem = gameElements[i];
			var type = elem["type"];
			var valid = this.validate(elem, type);
			if(valid == false) return false;
		}
		return true;
	}
	return false;
};

exports.class = GameValidator;