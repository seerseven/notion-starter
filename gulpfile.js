'use strict';

const { task, series, watch, src, dest, parallel } = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const bump = require('gulp-bump');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');
const git = require('gulp-git');
const push = require('gulp-git-push');
const gitignore = require('gulp-gitignore');
const wait = require('gulp-wait');

//Define Src and Dest Filepaths
const esbuild = 'src/build/';
const styles = 'src/styles/';
const scripts = 'src/scripts/';
const dist = 'theme/assets';
const cdn = 'docs';
const app = './';

function gitPush() {
	git.push('origin', 'master', function (err) {
		if (err) throw err;
	});
}

//List Javascript Vendors in Bundle Order
var libs = ['jquery.js', 'jqueryUI.js', 'aos.js', 'rellax.js'];

//Itterate Through Vendor Array adding Filepath Strings
libs = libs.map((i) => scripts + i);

//Run Compiled Sass Through PostCSS
function css() {
	return gulp
		.src([esbuild + '*.css'])
		.pipe(plumber())
		.pipe(postcss())
		.pipe(gulp.dest(styles))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist))
		.pipe(rename({ prefix: 'dist-' }))
		.pipe(gulp.dest(cdn));
}

//Move, Minify, and Rename Bundled Modules
function js() {
	return gulp
		.src([esbuild + '*.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist))
		.pipe(rename({ prefix: 'dist-' }))
		.pipe(gulp.dest(cdn));
}

//Move, Minify, and Rename Bundled Vendors
function lib() {
	return gulp
		.src(libs)
		.pipe(plumber())
		.pipe(concat('lib.js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist))
		.pipe(rename({ prefix: 'dist-' }))
		.pipe(gulp.dest(cdn));
}

function ver() {
	return gulp
		.src([app + 'package.json'])
		.pipe(plumber())
		.pipe(bump({ type: 'patch' }))
		.pipe(gulp.dest(app));
}

function gitCommit() {
	return gulp
		.src([app + '*'])
		.pipe(gitignore())
		.pipe(git.add())
		.pipe(git.commit('bump version'));
}

exports.change = function (done) {
	src([app + '*'])
		.pipe(gitignore())
		.pipe(git.add())
		.pipe(git.commit('bump version'));
	done();
};

task('commit', function (done) {
	gitCommit();
	done();
});

task('push', function (done) {
	gitPush();
	done();
});

task('deploy', series('commit', 'push'));

task('watch', function () {
	watch('src/build/*.css', css);
	watch('src/build/*.css', js);
	watch('src/scripts/*.js', lib);
});

exports.default = function () {
	watch('src/build/*.css', css);
	watch('src/build/*.css', js);
	watch('src/scripts/*.js', lib);
};

// define complex tasks
const version = series(ver);

// export tasks
exports.css = css;
exports.js = js;
exports.lib = lib;
exports.ver = ver;

exports.version = version;
