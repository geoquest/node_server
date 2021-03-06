var assert = require("assert");

var GameValidator = require("../ServerComponents/util/game/GameValidator");

describe('GameValidator',function() {
	/**
	 * The game validator object.
	 */
	var gameValidator = null;

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		gameValidator = new GameValidator.class();

	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		gameValidator = null;
	});

	// describe('constructor', function() {
	// it('loads schemas', function() {
	// assert.ok(gameValidator.getSchemas().length);
	// });
	//
	// });

	describe('function validateGame', function() {
		it('returns true if game json is valid', function() {
			var testJSON = {				
				"name" : "Fragen",
				"gameElements" : [
 				                  {
									"type" : "npcTalk",
									"id" : "Intro_2",
									"name" : "Intro",
									"charimage" : "Schatzkarte-0.png",
									"nextdialogbuttontext" : "Weiter ...",
									"endbuttontext" : "Caching starten...",
									"dialogItem" : [ {
										"text" : "this is dialog 1"
									}, {
										"text" : "this is dialog 2"
									}, {
										"text" : "this is dialog 3"
									} ],
									"onEnd" : [],
									"onStart" : []
								},
				                  {
				                	  "type":"questionAndAnswer",
				                	  "id" : "Question1",
				      				"name" : "Fragen",
				      				"correctAnswersNeeded" : 1,
				      				"charimage" : "Schatzkarte-0.png",
				      				"shuffle" : "all",
				      				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				      				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				      				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				      				"questions" : [
				      						{
				      							"questionText" : "Wie weit ist das andere Ufer ungefähr entfernt?",
				      							"answers" : [
				      									{
				      										"correct" : 0,
				      										"answerText" : "100 m",
				      										"responseText" : "100m? nein das ist zu wenig."
				      									},
				      									{
				      										"correct" : 1,
				      										"answerText" : "300 m",
				      										"responseText" : "Richtig! Es sind etwa 300m bis zum anderen Ufer."
				      									} ]
				      						},
				      						{
				      							"questionText" : "Wie viele Kirchen kann man in der Stadt am andern Ufer sehen?",
				      							"answers" : [
				      									{
				      										"correct" : 0,
				      										"answerText" : "1",
				      										"responseText" : "I HATE LULU!"
				      									},
				      									{
				      										"correct" : 1,
				      										"answerText" : "3"
				      									} ]
				      						} ]
				                  }
				 ]
			};
			assert.equal(true, gameValidator.validateGame(testJSON));
		});
		it('returns false if game json is invalid( invalid npcTalk element)', function() {
			var testJSON = {				
				"name" : "Fragen",
				"gameElements" : [
 				                  {
									"type" : "npcTalk",
									"id" : "Intro_2",
									"name" : "Intro",
									"charimage" : "Schatzkarte-0.png",
									"nextdialogbuttontext" : "Weiter ...",
									"endbuttontext" : "Caching starten...",
									"dialogItem" : [],
									"onEnd" : [],
									"onStart" : []
								},
				                  {
				                	  "type":"questionAndAnswer",
				                	  "id" : "Question1",
				      				"name" : "Fragen",
				      				"correctAnswersNeeded" : 1,
				      				"charimage" : "Schatzkarte-0.png",
				      				"shuffle" : "all",
				      				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				      				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				      				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				      				"questions" : [
				      						{
				      							"questionText" : "Wie weit ist das andere Ufer ungefähr entfernt?",
				      							"answers" : [
				      									{
				      										"correct" : 0,
				      										"answerText" : "100 m",
				      										"responseText" : "100m? nein das ist zu wenig."
				      									},
				      									{
				      										"correct" : 1,
				      										"answerText" : "300 m",
				      										"responseText" : "Richtig! Es sind etwa 300m bis zum anderen Ufer."
				      									} ]
				      						},
				      						{
				      							"questionText" : "Wie viele Kirchen kann man in der Stadt am andern Ufer sehen?",
				      							"answers" : [
				      									{
				      										"correct" : 0,
				      										"answerText" : "1",
				      										"responseText" : "I HATE LULU!"
				      									},
				      									{
				      										"correct" : 1,
				      										"answerText" : "3"
				      									} ]
				      						} ]
				                  }
				 ]
			};
			assert.equal(false, gameValidator.validateGame(testJSON));
		});
		it('returns false if game json is invalid(invalid Q&A element)', function() {
			var testJSON = {				
				"name" : "Fragen",
				"gameElements" : [
 				                  {
									"type" : "npcTalk",
									"id" : "Intro_2",
									"name" : "Intro",
									"charimage" : "Schatzkarte-0.png",
									"nextdialogbuttontext" : "Weiter ...",
									"endbuttontext" : "Caching starten...",
									"dialogItem" : [ {
										"text" : "this is dialog 1"
									}, {
										"text" : "this is dialog 2"
									}, {
										"text" : "this is dialog 3"
									} ],
									"onEnd" : [],
									"onStart" : []
								},
				                  {
				                	  "type":"questionAndAnswer",
				                	  "id" : "Question1",
				      				"name" : "Fragen",
				      				"correctAnswersNeeded" : 1,
				      				"charimage" : "Schatzkarte-0.png",
				      				"shuffle" : "all",
				      				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				      				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				      				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				      				"questions" : [
				      						{
				      							"questionText" : "Wie weit ist das andere Ufer ungefähr entfernt?",
				      							"answers" : [
				      									{
				      										"correct" : 0,
				      										"answerText" : "100 m",
				      										"responseText" : "100m? nein das ist zu wenig."
				      									},
				      									{
				      										"correct" : 1,
				      										"answerText" : "300 m",
				      										"responseText" : "Richtig! Es sind etwa 300m bis zum anderen Ufer."
				      									} ]
				      						},
				      						{
				      							"questionText" : "Wie viele Kirchen kann man in der Stadt am andern Ufer sehen?",
				      							"answers" : [
				      									{
				      										"correct" : 0,
				      										"responseText" : "I HATE LULU!"
				      									},
				      									{
				      										"correct" : 1,
				      										"answerText" : "3"
				      									} ]
				      						} ]
				                  }
				 ]
			};
			assert.equal(false, gameValidator.validateGame(testJSON));
		});
		it('returns false if game json is invalid(missing type attribute)', function() {
			var testJSON = {				
				"name" : "Fragen",
				"gameElements" : [
				                  {
				                	  "typo":"npcTalk"
				                  },
				                  {
				                	  "type":"questionAndAnswer"
				                  }
				 ]
			};
			assert.equal(false, gameValidator.validateGame(testJSON));
		});
		it('returns false if game json is invalid(gameElements empty)', function() {
			var testJSON = {				
				"name" : "Fragen",
				"gameElements" : [
				 ]
			};
			assert.equal(false, gameValidator.validateGame(testJSON));
		});
	});	
	describe('function validate', function() {
		it('returns false if json is invalid', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"list" : []
			};
			assert.equal(false, gameValidator.validate(testJSON, "testSchema"));
		});
		it('succeeds if json is valid', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"list" : [ {
					"text" : "hallo LULU!!!",
					"label" : "BUBU"
				} ]
			};
			assert.equal(true, gameValidator.validate(testJSON,"testSchema"));
		});

		it('returns false if schema is not found', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"list" : [ {
					"text" : "hallo LULU!!!",
					"label" : "BUBU"
				} ]
			};
			assert.equal(false, gameValidator.validate(testJSON, "schemaThatIsMissing"));
		});

		it('returns false the type is incorrect', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"list" : [ {
					"text" : 5,
					"label" : "BUBU"
				} ]
			};
			assert.equal(false, gameValidator.validate(testJSON, "testSchema"));
		});

		it('returns false the required field (text) is missing',function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"list" : [ {
					"label" : "BUBU"
				} ]
			};
			assert.equal(false, gameValidator.validate(testJSON, "testSchema"));
		});
		it('validates a correct NPCTalk game (returns true) ', function() {
			var testJSON = {
				"id" : "Intro_2",
				"name" : "Intro",
				"charimage" : "Schatzkarte-0.png",
				"nextdialogbuttontext" : "Weiter ...",
				"endbuttontext" : "Caching starten...",
				"dialogItem" : [ {
					"text" : "this is dialog 1"
				}, {
					"text" : "this is dialog 2"
				}, {
					"text" : "this is dialog 3"
				} ],
				"onEnd" : [],
				"onStart" : []
			};
			assert.equal(true, gameValidator.validate(testJSON, "npcTalk"));
		});
		it('fails for an incorrect NPCTalk game (returns false) ',function() {
			var testJSON = {
				"charimage" : "Schatzkarte-0.png",
				"description" : "bla bla",
				"nextdialogbuttontext" : "Weiter ...",
				"endbuttontext" : "Caching starten...",
				"name" : "Intro",
				"dialogItem" : [ {
					"text" : "this is dialog 1"
				}, {
					"text" : "this is dialog 2"
				}, {
					"text" : "this is dialog 3"
				} ],
				"onEnd" : "showMessage"
			};
			assert.equal(false, gameValidator.validate(
					testJSON, "npcTalk"));
		});
		it('returns false for no dialog item in the NPCTalk game', function() {
			var testJSON = {
				"id" : "Intro_2",
				"name" : "Intro",
				"charimage" : "Schatzkarte-0.png",
				"nextdialogbuttontext" : "Weiter ...",
				"endbuttontext" : "Caching starten...",
				"dialogItem" : [ ],
				"onEnd" : "showMessage"
			};
			assert.equal(false, gameValidator.validate(testJSON, "npcTalk"));
		});
		
		it('validates a correct QuestionAndAnswer game (returns true) ',function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"correctAnswersNeeded" : 1,
				"charimage" : "Schatzkarte-0.png",
				"shuffle" : "all",
				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				"questions" : [
						{
							"questionText" : "Wie weit ist das andere Ufer ungefähr entfernt?",
							"answers" : [
									{
										"correct" : 0,
										"answerText" : "100 m",
										"responseText" : "100m? nein das ist zu wenig."
									},
									{
										"correct" : 1,
										"answerText" : "300 m",
										"responseText" : "Richtig! Es sind etwa 300m bis zum anderen Ufer."
									} ]
						},
						{
							"questionText" : "Wie viele Kirchen kann man in der Stadt am andern Ufer sehen?",
							"answers" : [
									{
										"correct" : 0,
										"answerText" : "1",
										"responseText" : "I HATE LULU!"
									},
									{
										"correct" : 1,
										"answerText" : "3"
									} ]
						} ]
			};
			assert.equal(true, gameValidator.validate(testJSON, "questionAndAnswer"));
		});
		it('fails for an incorrect QuestionAndAnswer game (typecheck fails) (returns false) ', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"correctAnswersNeeded" : 1,
				"charimage" : "Schatzkarte-0.png",
				"shuffle" : "all",
				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				"questions" : [
						{
							"questionText" : "Wie weit ist das andere Ufer ungefähr entfernt?",
							"answers" : [
									{
										"correct" : 0,
										"answerText" : "100 m",
										"responseText" : "100m? nein das ist zu wenig."
									},
									{
										"correct" : 1,
										"answerText" : "300 m",
										"responseText" : "Richtig! Es sind etwa 300m bis zum anderen Ufer."
									} ]
						},
						{
							"questionText" : "Wie viele Kirchen kann man in der Stadt am andern Ufer sehen?",
							"answers" : [
									{
										"correct" : "dsafsafqwwqf",
										"responseText" : "I HATE LULU!",
										"answerText" : 3
									},
									{
										"correct" : 1,
										"answerText" : "3"
									} ]
						} ]
			};
			assert.equal(false, gameValidator.validate(testJSON, "questionAndAnswer"));
		});
		it('fails for an incorrect QuestionAndAnswer (game missing a required field) (returns false) ', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"correctAnswersNeeded" : 1,
				"charimage" : "Schatzkarte-0.png",
				"shuffle" : "all",
				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				"questions" : [
						{
							"questionText" : "Wie weit ist das andere Ufer ungefähr entfernt?",
							"answers" : [
									{
										"correct" : 0,
										"answerText" : "100 m",
										"responseText" : "100m? nein das ist zu wenig."
									},
									{
										"correct" : 1,
										"answerText" : "300 m",
										"responseText" : "Richtig! Es sind etwa 300m bis zum anderen Ufer."
									} ]
						},
						{
							"questionText" : "Wie viele Kirchen kann man in der Stadt am andern Ufer sehen?",
							"answers" : [
									{
										"responseText" : "I HATE LULU!",
										"answerText" : "3"
									},
									{
										"correct" : 1,
										"answerText" : "3"
									} ]
						} ]
			};
			assert.equal(false, gameValidator.validate(testJSON, "questionAndAnswer"));
		});
		
		it('fails for an incorrect QuestionAndAnswer game (no question defined) (returns false) ', function() {
			var testJSON = {
				"id" : "Question1",
				"name" : "Fragen",
				"correctAnswersNeeded" : 1,
				"charimage" : "Schatzkarte-0.png",
				"shuffle" : "all",
				"introText" : "Wenn ihr hier nach Nord-Westen über den See zum Yachthafen schaut ...",
				"outroSuccessText" : "Sehr gut, ihr habt genügend Fragen korrekt beantwortet.",
				"outroFailText" : "Ihr habt zu viele Fragen Falsch beantwortet.",
				"questions" : [ ]
			};
			assert.equal(false, gameValidator.validate(testJSON, "questionAndAnswer"));
		});
		it('validates a correct Hotspot game (returns true) ', function() {
			var testJSON = {
				"id" : "Intro_Hot2",
				"latitude" : "50.719078",
				"longitude" : "7.121755",
				"icon" : "Spot.ico",
				"radius" : "10",
				"initialVisibility":true,
				"onEnter" : []
			};
			assert.equal(true, gameValidator.validate(testJSON, "hotspot"));
		});
		it('fails for an incorrect Hotspot game (returns false) ',function() {
			var testJSON = {
					"id" : "Intro_Hot2",
					"latitude" : "50.719078",
					"longitude" : "7.121755",
					"icon" : "Spot.ico",
					"radius" : "10",
					"initialVisibility":true,
					"onEnter" : "hallo"
				};
			assert.equal(false, gameValidator.validate(
					testJSON, "hotspot"));
		});
		
		it('validates a correct QR-Scan game (returns true) ', function() {
			var testJSON = {
				"id" : "Intro_QRCode2",
				"expectedContent" : "35638990",
				"taskdescription" : "Here you have to find and scan a water bottle.",
				"onFail": [],
				"onSuccess" : []
			};
			assert.equal(true, gameValidator.validate(testJSON, "QRTagReading"));
		});
		it('fails for an incorrect QR-Scan game (returns false) ',function() {
			var testJSON = {
					"id" : "Intro_QRCode2",
					"expectedContent" : 3563899,
					"onFail": [],
					"onSuccess" : []
				};
			assert.equal(false, gameValidator.validate(
					testJSON, "QRTagReading"));
		});
		
		it('validates a correct NPCTalk game including some rules (returns true) ', function() {
			var testJSON = {
				"id" : "Intro_2",
				"name" : "Intro",
				"charimage" : "Schatzkarte-0.png",
				"nextdialogbuttontext" : "Weiter ...",
				"endbuttontext" : "Caching starten...",
				"dialogItem" : [ {
					"text" : "this is dialog 1"
				}, {
					"text" : "this is dialog 2"
				}, {
					"text" : "this is dialog 3"
				} ],
				"onEnd" : [],
				"onStart" : [
				             { 
				            	"conditions": [
				            	            "myVar == 3",
				            	            "myVar < 5"
				            	            
				            	],
				            	"actions" : [
				            	             {
				            	            	"method" : "endGame",
				            	            	"arguments" : {"message" : "hello world!"}
				            	             }
				            	]
				             }
				]
			};
			assert.equal(true, gameValidator.validate(testJSON, "npcTalk"));
		});
		
		
		it('validates a incorrect NPCTalk game including some rules (returns false) ', function() {
			var testJSON = {
				"id" : "Intro_2",
				"name" : "Intro",
				"charimage" : "Schatzkarte-0.png",
				"nextdialogbuttontext" : "Weiter ...",
				"endbuttontext" : "Caching starten...",
				"dialogItem" : [ {
					"text" : "this is dialog 1"
				}, {
					"text" : "this is dialog 2"
				}, {
					"text" : "this is dialog 3"
				} ],
				"onEnd" : [],
				"onStart" : [
				             { 
				            	"conditions": [
				            	            {
				            	            	 "cond" : "myVar == 3"
				            	            },
				            	            
				            	            {
				            	            	"cond" : "myVar < 5"
				            	            }
				            	],
				            	"actions" : [
				            	             {
				            	            	
				            	             }
				            	]
				             }
				]
			};
			assert.equal(false, gameValidator.validate(testJSON, "npcTalk"));
		});
		
		it('validates another incorrect NPCTalk game including some rules (returns false) ', function() {
			var testJSON = {
				"id" : "Intro_2",
				"name" : "Intro",
				"charimage" : "Schatzkarte-0.png",
				"nextdialogbuttontext" : "Weiter ...",
				"endbuttontext" : "Caching starten...",
				"dialogItem" : [ {
					"text" : "this is dialog 1"
				}, {
					"text" : "this is dialog 2"
				}, {
					"text" : "this is dialog 3"
				} ],
				"onEnd" : [],
				"onStart" : [
				             { 
				            	"conditions": [
				            	            {
				            	            	 "cond" : "myVar == 3"
				            	            },
				            	            
				            	            {
				            	            	"cond" : "myVar < 5"
				            	            }
				            	],
				            	"actions" : [
				            	             {
				            	            	"method" : 123,
				            	            	"arguments" : {"message" : "hello world!"}
				            	             }
				            	]
				             }
				]
			};
			assert.equal(false, gameValidator.validate(testJSON, "npcTalk"));
		});
		it('validates correct game including NPCTalk and hotspots (returns true) ', function() {
			var testJSON = {
				    "name": "HotSpot game",
				    "hotspots": [
				        {
				            "id": "hotspot_1",
				            "latitude": "50.720801",
				            "longitude": "7.121484",
				            "radius": "20",
				            "onEnter": [
				                {
				                    "actions": [
				                        {
				                            "method": "showMessage",
				                            "arguments": {
				                                "message": "Hotspot_1 found!"
				                            }
				                        },
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_1",
				                                "visible": false
				                            }
				                        },
				                        {
				                            "method": "setVariable",
				                            "arguments": {
				                                "var": "xVar",
				                                "val": 1
				                            }
				                        },
				                        {
				                            "method": "startMission",
				                            "arguments": {
				                                "id": "Second"
				                            }
				                        }
				                    ]
				                }
				            ]
				        },
				        {
				            "id": "hotspot_2",
				            "latitude": "50.724",
				            "longitude": "7.121",
				            "radius": "20",
				            "onEnter": [
				                {
									"conditions" : [
										"xVar < 3",
										"xVar > 0",
										"xVar == 1"
									],
				                    "actions": [
				                        {
				                            "method": "showMessage",
				                            "arguments": {
				                                "message": "Hotspot_2 found!"
				                            }
				                        },
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_2",
				                                "visible": false
				                            }
				                        },
				                        {
				                            "method": "endGame"
				                        }
				                    ]
				                }
				            ]
				        }
				    ],
				    "gameElements": [
				        {
				            "type": "npcTalk",
				            "id": "First",
				            "name": "FirstMission",           
				            "nextdialogbuttontext": "Next ...",
				            "endbuttontext": "Start Caching...",
				            "dialogItem": [
				                {
				                    "text": "FirstMission this is dialog 1"
				                },
				                {
				                    "text": "FirstMission this is dialog 2"
				                },
				                {
				                    "text": "FirstMission this is dialog 3"
				                }
				            ],
				            "onEnd": [
				                {
				                    "actions": [
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_1",
				                                "visible": true
				                            }
				                        },
				                        {
				                            "method": "vibrate",
				                            "arguments": {
				                                "duration": 5000
				                            }
				                        },
										{
											"method": "showMap"
										}
				                    ]
				                }
				            ]
				        },
				        {
				            "type": "npcTalk",
				            "id": "Second",
				            "name": "SecondMission",            
				            "nextdialogbuttontext": "NEXT!",
				            "endbuttontext": "Get the last hotspot",
				            "dialogItem": [
				                {
				                    "text": "SecondMission this is dialog 11"
				                },
				                {
				                    "text": "SecondMission this is dialog 22"
				                }
				            ],
				            "onEnd": [
				                {
				                    "actions": [
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_2",
				                                "visible": true
				                            }
				                        },
										{
											"method": "showMap"
										}
				                    ]
				                }
				            ]
				        }
				    ]
				};
			assert.equal(true, gameValidator.validateGame(testJSON));
		});
		it('validates incorrect game including NPCTalk and hotspots (condition is not a string) (returns false) ', function() {
			var testJSON = {
				    "name": "HotSpot game",
				    "hotspots": [
				        {
				            "id": "hotspot_1",
				            "latitude": "50.720801",
				            "longitude": "7.121484",
				            "radius": "20",
				            "onEnter": [
				                {
				                    "actions": [
				                        {
				                            "method": "showMessage",
				                            "arguments": {
				                                "message": "Hotspot_1 found!"
				                            }
				                        },
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_1",
				                                "visible": false
				                            }
				                        },
				                        {
				                            "method": "setVariable",
				                            "arguments": {
				                                "var": "xVar",
				                                "val": 1
				                            }
				                        },
				                        {
				                            "method": "startMission",
				                            "arguments": {
				                                "id": "Second"
				                            }
				                        }
				                    ]
				                }
				            ]
				        },
				        {
				            "id": "hotspot_2",
				            "latitude": "50.724",
				            "longitude": "7.121",
				            "radius": "20",
				            "onEnter": [
				                {
									"conditions" : [
										222,
										"xVar > 0",
										"xVar == 1"
									],
				                    "actions": [
				                        {
				                            "method": "showMessage",
				                            "arguments": {
				                                "message": "Hotspot_2 found!"
				                            }
				                        },
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_2",
				                                "visible": false
				                            }
				                        },
				                        {
				                            "method": "endGame"
				                        }
				                    ]
				                }
				            ]
				        }
				    ],
				    "gameElements": [
				        {
				            "type": "npcTalk",
				            "id": "First",
				            "name": "FirstMission",           
				            "nextdialogbuttontext": "Next ...",
				            "endbuttontext": "Start Caching...",
				            "dialogItem": [
				                {
				                    "text": "FirstMission this is dialog 1"
				                },
				                {
				                    "text": "FirstMission this is dialog 2"
				                },
				                {
				                    "text": "FirstMission this is dialog 3"
				                }
				            ],
				            "onEnd": [
				                {
				                    "actions": [
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_1",
				                                "visible": true
				                            }
				                        },
				                        {
				                            "method": "vibrate",
				                            "arguments": {
				                                "duration": 5000
				                            }
				                        },
										{
											"method": "showMap"
										}
				                    ]
				                }
				            ]
				        },
				        {
				            "type": "npcTalk",
				            "id": "Second",
				            "name": "SecondMission",            
				            "nextdialogbuttontext": "NEXT!",
				            "endbuttontext": "Get the last hotspot",
				            "dialogItem": [
				                {
				                    "text": "SecondMission this is dialog 11"
				                },
				                {
				                    "text": "SecondMission this is dialog 22"
				                }
				            ],
				            "onEnd": [
				                {
				                    "actions": [
				                        {
				                            "method": "setHotspotVisibility",
				                            "arguments": {
				                                "id": "hotspot_2",
				                                "visible": true
				                            }
				                        },
										{
											"method": "showMap"
										}
				                    ]
				                }
				            ]
				        }
				    ]
				};
			assert.equal(false, gameValidator.validateGame(testJSON));
		});
	});

});