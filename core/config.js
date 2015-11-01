module.exports = new function () {
	var config = require('config');
	var env = process.env.NODE_ENV || 'development';

	if (!config[env]) {
		throw new Error(util.format('Config for environment %s is not existing', env));
	}
	this.config = config[env];
};

