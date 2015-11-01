module.exports = new function () {
	var winston = require('winston');
	var config = require('./config').config;
	var _ = require('lodash');
	var path = _.get(config, 'logger.dir') || 'logs';

	function createFileTransport(transport, level, filename, options) {
		return new transport(_.merge({
			dirname: path,
			filename: filename,
			rotationFormat: 'YYYY-MM-DDTHH',
			level: level,
			json: true,
			prettyPrint: true
		}, options));
	}

	winston.addColors({
		verbose: 'blue',
		info: 'blue',
		warn: 'yellow',
		error: 'red'
	});

	var logger = new winston({
		transports: [
			createFileTransport(winston.transports.File, 'verbose', 'messages.log'),
			createFileTransport(winston.transports.File, 'info', 'messages.log'),
			createFileTransport(winston.transports.File, 'warn', 'messages.log'),
			createFileTransport(winston.transports.File, 'error', 'errors.log', {
				handleExceptions: true,
				humanReadableUnhandledException: true
			}),
			new winston.transports.Console({
				json: true,
				colorize: true,
				prettyPrint: true,
				handleExceptions: true,
				humanReadableUnhandledException: true
			})
		]
	});

	class Logger {
		static _log(level, args) {
			logger.log.apply(logger, _.flatten(level, args));
		}
		static verbose() {
			this._log('verbose', arguments);
		}
		static info() {
			this._log('info', arguments);
		}
		static warn() {
			this._log('warn', arguments);
		}
		static error() {
			this._log('error', arguments);
		}
	}

	this.logger = Logger;
};
