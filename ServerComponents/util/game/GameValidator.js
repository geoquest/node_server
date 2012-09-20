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
	// Supported event types
	this._eventTypes = ["onStart", "onEnd", "onSuccess", "onFail", "onEnter", "onLeave"];
};



GameValidator.prototype.validate = function(jsonObject, atomicGameTypeName){
	if (schemas.hasOwnProperty(atomicGameTypeName)) {
		//the schema for the type is defined, so proceed with validation
		var schema = require(schemas[atomicGameTypeName]);		
		var report = this._env.validate(jsonObject, schema);	
//		console.log(schema);
		var valid = (report.errors.length == 0);
		if(valid == false) return valid;
		if (!valid) {
			 // EVIL! Write in a file! console.log(report.errors); //log only the errors if the validation fails
		}else{
			for(var i in this._eventTypes){
				var type = this._eventTypes[i];
				var event = jsonObject[type];
				
				if (event== null || event == undefined || event.length == 0){
					continue;
				}else{
					var ruleSchema = require(schemas["rule"]);
					for(var j in event){
						report = this._env.validate(event[j], ruleSchema);
						valid = (report.errors.length == 0);
						if(valid == false) return false;
					}
				}				
			}
		}		
		return valid;
	} else {
		//the schema was not found so just return false
		//(may extend later to throw exception for this)
        // EVIL! Write in a file!  console.log("That schema type has not been defined: " + atomicGameTypeName)
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
			if(!valid){
                // EVIL! Write in a file! console.log(report.errors); //log only the errors if the validation fails
                return false;
            }
		}
		var hotspots = jsonObject["hotspots"];
		for(var i in hotspots){
			var elem = hotspots[i];
			var valid = this.validate(elem, "hotspot");
			if(!valid){
                // EVIL! Write in a file! console.log(report.errors); //log only the errors if the validation fails
                return false;
            }
		}
		return true;
	}
    // EVIL! Write in a file!  console.log(report.errors); //log only the errors if the validation fails
	return false;
};

exports.class = GameValidator;