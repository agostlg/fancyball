// server.js
/*
{ domain: null,
  _events: {},
  _maxListeners: 10,
  resetTimeout: [Function],
  requestAcknowledgement: [Function],
  open: [Function],
  close: [Function],
  write: [Function],
  ping: [Function],
  getVersioning: [Function],
  _controlUARTTxLine: [Function],
  setDeviceName: [Function],
  getBluetoothInfo: [Function],
  setAutoReconnect: [Function],
  getAutoReconnect: [Function],
  getPowerState: [Function],
  setPowerNotification: [Function],
  sleep: [Function],
  getVoltageTripPoints: [Function],
  _setVoltageTripPoints: [Function],
  setInactivityTimeout: [Function],
  _jumpToBootloader: [Function],
  performLevel1Diagnostics: [Function],
  performLevel2Diagnostics: [Function],
  _clearCounters: [Function],
  assignTimeValue: [Function],
  pollPacketTimes: [Function],
  setHeading: [Function],
  setStabalisation: [Function],
  setRotationRate: [Function],
  setApplicationConfigurationBlock: [Function],
  getApplicationConfigurationBlock: [Function],
  getChassisID: [Function],
  _setChassisID: [Function],
  selfLevel: [Function],
  setDataStreaming: [Function],
  configureCollisionDetection: [Function],
  configureLocator: [Function],
  setAccelerometerRange: [Function],
  readLocator: [Function],
  setRGB: [Function],
  setBackLED: [Function],
  getRGB: [Function],
  roll: [Function],
  setBoostWithTime: [Function],
  setRawMotorValues: [Function],
  setMotionTimeout: [Function],
  setPermanentOptionFlags: [Function],
  getPermanentOptionFlags: [Function],
  setTemporaryOptionFlags: [Function],
  getTemporaryOptionFlags: [Function],
  getConfigurationBlock: [Function],
  setDeviceMode: [Function],
  setConfigurationBlock: [Function],
  getDeviceMode: [Function],
  runMacro: [Function],
  saveTemporaryMacro: [Function],
  saveMacro: [Function],
  reInitializeMacroExecutive: [Function],
  abortMacro: [Function],
  getMacroStatus: [Function],
  setMacroParameter: [Function],
  appendMacroChunck: [Function],
  eraseOrbBasicStorage: [Function],
  appendOrbBasicFragment: [Function],
  executeOrbBasicProgram: [Function],
  abortOrbBasicProgram: [Function],
  submitValueToInputStatement: [Function] }


*/


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
var spheron = require('spheron'); 				// get an instance of the express Router
var spheroPort = '/dev/rfcomm0';
var s = spheron;

var sphero = spheron.sphero();

sphero.on('open', function() {
		console.log("connection opened");
	});
sphero.open(spheroPort);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
});

//exports.roll = function(speed, heading, state, options)

router.get('/open', function(req, res) {
	sphero.on('open', function() {
		console.log("connection opened");
	});
	sphero.open(spheroPort);
	
});

router.get('/close', function(req, res) {
	sphero.on('close', function() {
		console.log("connection closed");
	});
	sphero.close(spheroPort);
});

router.get('/forward', function(req, res) {
	sphero.roll(40,0,1,1);	
});

router.get('/reverse', function(req, res) {
	sphero.roll(40,300,1,1);  	
});

router.get('/left', function(req, res) {
	sphero.roll(40,100,1,1);  	
});

router.get('/right', function(req, res) {
	sphero.roll(40,200,1,1);  	
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);