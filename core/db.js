module.exports = new function () {
	var module = this;
	var mongoClient = require('mongodb').MongoClient;
	var _ = require('lodash');
	var config = require('./config').config;
	var logger = require('./logger').logger;
	var url = _.get(config, 'db.url') || 'mongodb://127.0.0.1:27017/nor';

	return require('q').Promise(function (resolve, reject) {
		logger.info('Connecting to', url);
		mongoClient.connect(url, function (err, db) {
			if (err) {
				logger.error('Connecting to', url, 'was failed', {message: e.message, stack: err.stack});
				reject();
			}
			module.db = db;
			resolve();
		});
	});
};

