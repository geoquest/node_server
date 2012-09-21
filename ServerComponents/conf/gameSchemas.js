var schemasDir = "../../../resources/gameValidationSchemas/";
var gameSchema = "gameSchema";
/**
 * mapping from game element type name to schema directory path
 * New Schemas has to be placed into directory ./resources/gameValidationSchemas/
 * in order to be used by the GameValidator
 */
var atomicGameSchemas = {
		gameSchema:schemasDir+gameSchema,
		"npcTalk":schemasDir+"npcTalk",
		"questionAndAnswer":schemasDir+"questionAndAnswer",
		"hotspot": schemasDir + "hotspot",
		"rule" : schemasDir + "rule",
		"testSchema":schemasDir+"testSchema",
		"QRTagReading":schemasDir+"QRTagReading"
};

module.exports = atomicGameSchemas;
