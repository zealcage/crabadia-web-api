// const authJwt = require('./verifyJwtToken');
// const validations = require('../validation/');

const util = require('util');

const Database = require('../mongodbConfig/mongodb.config.js')
let mine = require("../controller/mine");

// IMAGE
//const upload = require('../controller/uploadImage/uploadMiddleware');
//const displayImage = require('../controller/uploadImage/displayImage');

// const userError = require('../controller/errorController');

module.exports = function (app, io, redis) {
	// require('../cron/cronJobs.js')(io, cluster)
	app.use(function (req, res, next) {
		req.io = io;
		redis.get = util.promisify(redis.get);
		req.redis = redis;
		next();
	});

	app.get('/api/health-check', (req, res) => {
		res.send("Healthy");
	});

	app.get('/api/mine/tactic-one', mine.services.getCheapestThreeCrabs);

	app.get('/api/mine/tactic-two', mine.services.getCheapestTwoCrabsAndPrime);
	
	app.get('/api/mine/tactic-three', mine.services.getPrimeAndTwoHighMP);

	//******************** PUBLIC ********************//
	//app.post('/api/mobile/auth/signin', userServices.loginService.signinMobile);

	//app.post('/api/mobile/auth/signup', userServices.loginService.signupMobile);


	//******************** Error handler ********************//
	app.use(function (err, req, res, next) {//Error Controller
		console.error(err)
		// userError.addError(req, err, 99, 'GLOBAL_ERROR_CONTROLLER', 0)
		res.status(500).json({
			"description": "Error",
			"error": "Error occured"
		});
	});
}