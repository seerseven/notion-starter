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
const sass = require('gulp-sass')(require('sass'));

//Define Src and Dest Filepaths
const esbuild = 'src/build/';
const styles = 'src/styles/';
const scripts = 'src/scripts/';
const dist = 'theme/assets';
const app = './';

// var routes = {
//   app: './',
//   styles: 'src/styles/',
//   scripts = 'src/scripts/',
//   dist = 'theme/assets',
//   esbuild = 'src/build/',
// }

//List Javascript Vendors in Bundle Order
var libs = ['jquery.js', 'jqueryUI.js', 'aos.js', 'rellax.js'];
libs = libs.map((i) => scripts + i);

//Run Compiled Sass Through PostCSS
function css() {
	return src([esbuild + '*.css'])
		.pipe(plumber())
		.pipe(postcss())
		.pipe(dest(styles))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(dist));
}

//Move, Minify, and Rename Bundled Modules
function js() {
	return src([esbuild + '*.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(dist));
}

//Move, Minify, and Rename Bundled Vendors
function lib() {
	return src(libs)
		.pipe(plumber())
		.pipe(concat('lib.js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(dist));
}

function ver() {
	return src([app + 'package.json'])
		.pipe(plumber())
		.pipe(bump({ type: 'patch' }))
		.pipe(dest(app));
}

function gitCommit() {
	return src([app + '*'])
		.pipe(gitignore())
		.pipe(git.add())
		.pipe(git.commit('bump version'));
}

function gitPush(done) {
	git.push('origin', 'master', function (err) {
		if (err) throw err;
	});
	done();
}

task('commit', function (done) {
	gitCommit();
	done();
});

task('push', function (done) {
	gitPush();
	done();
});

exports.change = function (done) {
	src([app + '*'])
		.pipe(gitignore())
		.pipe(git.add())
		.pipe(git.commit('Dev Testing'));
	done();
};

exports.scss = function () {
	return src('src/sass/abstracts/utilities/schema/schema.scss')
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(rename({ basename: 'sche-ma', extname: '.scss' }))
		.pipe(dest('src/sass/abstracts/utilities/schema'));
};

exports.default = function () {
	watch('src/build/*.css', css);
	watch('src/build/*.js', js);
	watch('src/scripts/*.js', lib);
	watch('theme/assets/*.min.css', { delay: 3500 }, series(gitCommit, gitPush));
};

// export tasks

exports.save = gitCommit;
exports.push = gitPush;
exports.deploy = series(gitCommit, gitPush);

// exports.js = js;
// exports.watch = watch;
