require('./core/runner').then(function () {
	require('./core/db').then(function () {
		require('./apps');
	});
});
