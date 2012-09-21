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


//Loading configuration file for existing game schemas
var schemas = require('../../conf/gameSchemas');
//Loading validation library
var JSV = require("JSV").JSV;

//constructor
GameValidator = function(){
	this._env = JSV.createEnvironment();
	// Supported event types
	this._eventTypes = ["onStart", "onEnd", "onSuccess", "onFail", "onEnter", "onLeave"];
};

/**
 * Performs validation for different mission types and hotspots
 * According to atomicGameTypeName the according validation schema is loaded
 * validates the given jsonObject.  Further the events (including rules) 
 * are validated if given.
 * @param jsonObject JSON object to be validated
 * @param atomicGameTypeName name of the schema to be validated against
 * @returns {Boolean} true if valid, otherwise false
 */
GameValidator.prototype.validate = function(jsonObject, atomicGameTypeName){
	//the schema for the type is defined, so proceed with validation
	if (schemas.hasOwnProperty(atomicGameTypeName)) {
		//Loading schema
		var schema = require(schemas[atomicGameTypeName]);
		// validate mission/hotspot
		var report = this._env.validate(jsonObject, schema);	
		var valid = (report.errors.length == 0);	
		// if JSON is valid according to mission/hotspot schema proceed with event validation
		if (valid){
			// load rule schema
			var ruleSchema = require(schemas["rule"]);
			//iterate over possible event types and validate if one is defined
			for(var i in this._eventTypes){
				var type = this._eventTypes[i];
				var event = jsonObject[type];	
				//check if event type exists and have rules in it
				if (!(event == null || event == undefined || event.length == 0)){
					for(var j in event){
						//validate rule
						report = this._env.validate(event[j], ruleSchema);
						valid = (report.errors.length == 0);
						if(valid == false){
							//console.log(JSON.stringify(report.errors));
							return false;
						}
					}
				}
			}
		}else{
			//console.log(JSON.stringify(report.errors));
		}
		return valid;
	} else {
		//the schema was not found so just return false
		//(may extend later to throw exception for this)
        // EVIL! Write in a file!  console.log("That schema type has not been defined: " + atomicGameTypeName)
		return false;
	}
};

/**
 * Validate against the general game schema and
 * delegates further validation to {@link GameValidator.prototype.validate}
 * @param jsonObject game object in JSON format
 * @returns {Boolean} if valid true, otherwise false
 */
GameValidator.prototype.validateGame = function(jsonObject){	
	//load general game schema 
	var schema = require(schemas["gameSchema"]);
	//validate JSON game object
	var report = this._env.validate(jsonObject, schema);
	//if general game is valid proceed with validation of nested elements 
	if(report.errors.length === 0){
		// iterate over game element (missions)
		var gameElements = jsonObject["gameElements"];
		for(var i in gameElements){
			var elem = gameElements[i];
			// fetch the type of the mission
			var type = elem["type"];
			// validate mission
			var valid = this.validate(elem, type);
			if(!valid){
                // EVIL! Write in a file! console.log(report.errors); //log only the errors if the validation fails
				//console.log(JSON.stringify(report.errors));
                return false;
            }
		}
		// iterate over hotspot elements
		var hotspots = jsonObject["hotspots"];
		for(var i in hotspots){
			var elem = hotspots[i];
			// validate hotspot
			var valid = this.validate(elem, "hotspot");
			if(!valid){
                // EVIL! Write in a file! console.log(report.errors); //log only the errors if the validation fails
				//console.log(JSON.stringify(report.errors));
                return false;
            }
		}
		return true;
	}
    // EVIL! Write in a file!  console.log(report.errors); //log only the errors if the validation fails
	//console.log(JSON.stringify(report.errors));
	return false;
};

exports.class = GameValidator;