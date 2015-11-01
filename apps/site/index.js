var runner = require('../../core/runner').runner;
var db = require('../../core/db').db;
var middleware = require('./middleware');
var routes = require('./routes');

middleware(runner, db);
routes(runner, db);
