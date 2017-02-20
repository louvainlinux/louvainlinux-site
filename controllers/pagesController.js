/*
 * louvainlinux-site
 * GPL-3.0 License
 */

'use strict';

/**
 * Module exports.
 * @public
 */

 module.exports = {
    index
 }

/**
 * Display the index page of the website
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

function index(req, res, next) {
    res.render('pages/index', { title: 'Hey !', message: 'Hello there!' });
}
