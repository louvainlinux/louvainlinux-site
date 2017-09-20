/* gulpfile.js
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
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const cmq = require('gulp-merge-media-queries');
const stylus = require('gulp-stylus');
const axis = require('axis');
const rupture = require('rupture');
const jeet = require('jeet');

const coffee = require('gulp-coffee');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');

const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');

const BROWSER_SYNC_RELOAD_DELAY = 500;

/**
 * Basic Tasks
 */

gulp.task('pug', function () {
    browserSync.reload();
});

gulp.task('stylus', function() {
    return gulp.src(['ressources/assets/stylus/app.styl'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(stylus({
			use: [axis(), rupture(), jeet()]
		}))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cmq({log: true}))
        .pipe(rename('app.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src(['ressources/assets/scripts/**/*.coffee'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(coffee({bare: true}))
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(concat('app.min.js'))
        .pipe(uglify())
	    .pipe(gulp.dest('public/js/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src('ressources/assets/images/**/*')
        .pipe(plumber({
            handleError: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('public/images/'))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * Build tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
	return browserSync.init({
		proxy: 'http://localhost:8080'
	}, function() {
        console.log('Browser-Sync launched');
    });
});

gulp.task('nodemon', function (next) {
    let called = false;
    return nodemon({
        script: './bin/proxy',
        ext: 'js',
        ignore: ['public/**/*.js', 'gulpfile.js'],
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

gulp.task('serve', ['browser-sync'], function () {
    gulp.watch('ressources/assets/stylus/**/*.styl',  ['stylus']);
	gulp.watch('ressources/assets/scripts/**/*.coffee', ['scripts']);
    gulp.watch('ressources/assets/images/**/*', ['images']);
    gulp.watch('views/**/*.pug', ['pug']);
});

gulp.task('deploy', ['stylus', 'scripts', 'images']);
gulp.task('default', ['deploy']);
