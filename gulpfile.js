/*
 * louvainlinux-site
 * GPL-3.0 License
 *
 * Inspired by this example
 * https://github.com/sogko/gulp-recipes/blob/master/browser-sync-nodemon-expressjs/
 */

'use strict';

/**
 * Variables
 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

const BROWSER_SYNC_RELOAD_DELAY = 500;

/**
 * Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
		proxy: 'http://localhost:8080',
		port: 4000,
        browser: ['google-chrome-stable']
	}, function() {
        console.log('Browser-Sync launched');
    });
});

gulp.task('nodemon', function (next) {
    let called = false;
    return nodemon({
        script: './bin/http',
        ext: 'js',
        ignore: ['public/**/*.js'],
        env: {
            'NODE_ENV': 'development'
        }
    })
    .on('start', function onStart() {
        if (!called) {
            next();
        }

        called = true;
    })
    .on('restart', function onRestart() {
        setTimeout(function () {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    })
    .on('crash', function() {
        console.log('Nodemon has crashed');
	})
    .once('quit', function () {
        process.exit();
	});
});

gulp.task('browser-sync-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
      gulp.watch('views/**/*.pug', ['browser-sync-reload']);
});
