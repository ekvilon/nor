module.export = new function () {
	var express = require('express');
	var db = require('db').db;
	var config = require('./config').config;
	var _ = require('lodash');

	this.runner = express();
	this.runner.listen(_.get(config, 'server.port') || 8080);
};

