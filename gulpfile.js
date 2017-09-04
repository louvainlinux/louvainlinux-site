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

gulp.task('default', ['serve']);
