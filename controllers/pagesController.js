/*
 * louvainlinux-site
 * GPL-3.0 License
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
