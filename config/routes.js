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
const pagesController = require('../controllers/pagesController');

/**
 * Module variables.
 * @private
 */

let router = express.Router();

/**
 * Module exports.
 * @public
 */

module.exports = router;

/**
 * Pages controller routes
 */

router.get('/', pagesController.home);
router.get('/**/:name', pagesController.display);
router.get('/:name', pagesController.display);
