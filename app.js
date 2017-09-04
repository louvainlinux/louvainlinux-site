/*
 * louvainlinux-site
 * GPL-3.0 License
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const compression = require('compression');
const routes = require('./config/routes');

/**
 * Module variables.
 * @private
 */

let app = express();

/**
 * Module exports.
 * @public
 */

module.exports = app;

/**
 * Compress all responses bodies
 */
app.use(compression());

/**
 * Configuration view engine and folder
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Configuration static files
 */

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(serveStatic(path.join(__dirname, 'public')));

/**
 * Bind all routes to the app
 */

app.use('/', routes);

/**
 * Catch 404 and forward to error handler
 */

app.use(function(req, res, next) {
    var err = new Error('Page Not Found !');
    err.status = 404;
    next(err);
});

/**
 * Error Handler Function
 */

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);

    if(res.status = 400) {
        res.render('views/errors/400.pug');
    } else {
        res.render('views/errors/500.pug');
    }
});
