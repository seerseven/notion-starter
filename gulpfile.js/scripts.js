const { task, series, watch, src, dest, parallel } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

//Define Src and Dest Filepaths
const esbuild = 'src/build/';
const scripts = 'src/scripts/';
const vendors = 'src/vendors/';
const dist = 'theme/assets';

//List Javascript Vendors in Bundle Order
var libs = ['jquery.js', 'jqueryUI.js'];
libs = libs.map((i) => vendors + i);

var allJS = ['lib.js', 'seerseven.js', 'notion.js'];
allJS = allJS.map((i) => scripts + i);

//Move, Minify, and Rename Bundled Modules
function js() {
	return src([esbuild + '*.js'])
		.pipe(plumber())
		.pipe(dest(scripts))
		.pipe(dest(dist));
}

//Move, Minify, and Rename Bundled Vendors
function lib() {
	return src(libs).pipe(plumber()).pipe(concat('lib.js')).pipe(dest(scripts));
}

function alljs() {
	return src(allJS)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(dist));
}

exports.js = js;
exports.lib = lib;
exports.alljs = alljs;
