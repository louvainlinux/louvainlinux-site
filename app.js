/* app.js
 *
 * Copyright (C) 2018 Louvain-li-Nux <info@louvainlinux.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
    var err = new Error('Page non trouvée :(');
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
        res.render('errors/400.pug');
    } else {
        res.render('errors/500.pug');
    }
});
