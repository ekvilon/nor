module.export = new function () {
	this.development = {
		server: {
			port: 8080
		},
		db: {
			url: 'mongodb://127.0.0.1:27017/nor'
		},
		cookies: {
			path: '/',
			secret: 'TBD'
		},
		cache: {}
	};
	this.development.apps = {
		admin: {
			cookies: _.merge(this.development.cookies, {
				path: '/admin'
			})
		},
		site: {}
	};
};

