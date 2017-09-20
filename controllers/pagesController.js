/* controllers/pagesController.js
 *
 * Copyright (C) 2017 Denis Pettens <denis.pettens@gmail.com>
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

const fs = require('fs');

/**
 * Module exports.
 * @public
 */

 module.exports = {
    home,
    display
 }

/**
 * Display the home page of the website
 *
 * Options:
 *
 *   - `req`  Express request object
 *   - `res`  Express response object
 *   - `next` next middelware to call
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @public
 */

function home(req, res, next) {
    res.render('pages/home', {title: 'Accueil'});
}

/**
 * Display the page with the name passed in the url if they exist
 *
 * Options:
 *
 *   - `req`  Express request object
 *   - `res`  Express response object
 *   - `next` next middelware to call
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @public
 */

function display(req, res, next) {
    // Redirect to the home page if the name passed is home
    if (req.params.name === 'home') {
        res.redirect('/');
    }

    // Checking the existence of the pug file corresponding to the name passed
    // If they exist display the page
    // Otherwise continue to the error middelware
    if (fs.existsSync(req.app.get('views') + '/pages/' + req.params.name + '.pug')) {
        res.render('pages/' + req.params.name);
    } else {
        next();
    }
}
