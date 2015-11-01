module.exports = new function () {
	var module = this;
	var path = require('path');
	var express = require('express');
	var consolidate = require('consolidate');
	var _ = require('lodash');
	var logger = require('./logger').logger;
	var db = require('db').db;
	var config = require('./config').config;
	var port = _.get(config, 'server.port') || 8080;

	this.runner = express();
	this.runner.engine('hbs', consolidate.handlebars);
	this.runner.set('views', path.join(_dirname, '..', 'views'));
	this.runner.on('error', function (e) {
		if (!module.isActive) {
			logger.error('Server was not started on port %s', config.port, {
				error: e.message,
				stack: e.stack
			});
		}
		else {
			logger.error(e.message, {
				stack: e.stack
			});
		}
	});
	return require('q').Promise(function (resolve) {
		module.runner.listen(port, function () {
			var address = this.address();

			logger.info('Server was started on: %s:%s', address.address, address.port);
			module.isActive = true;
			resolve(module.runner);
		});
	});
};

