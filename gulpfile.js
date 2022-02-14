'use strict';

// Load plugins
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const gulpCopy = require('gulp-copy');
const bump = require('gulp-bump');
const git  = require('gulp-git');
const push = require('gulp-git-push');
const gitignore = require('gulp-gitignore');

// ESBuild Styles Move Task

function pcss() {
	return gulp
		.src('src/build/*.css')
		.pipe(plumber())
		.pipe(postcss())
		.pipe(gulp.dest('src/styles'));
}

function css() {
	return gulp
		.src('src/styles/**/*')
		.pipe(plumber())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('theme/assets'));
}


function bjs() {
	return gulp
		.src('src/build/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('theme/assets'));
}

function vjs() {
	return gulp
		.src([
			'src/js/vendors/jquery.js',
			'src/js/vendors/jqueryUI.js',
			'src/js/vendors/aos.js',
			'src/js/vendors/rellax.js',
		])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('src/scripts'));
}

function js() {
	return gulp
		.src([
			'src/scripts/jquery.min.js',
			'src/scripts/jqueryUI.min.js',
			// 'src/scripts/popper.min.js',
			// 'src/scripts/mdball.min.js',
			// 'src/scripts/three.min.js',
			// 'src/scripts/vanta.min.js',
			'src/scripts/aos.min.js',
			'src/scripts/rellax.min.js',
		])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('theme/assets'));
}
function cdn() {
	return gulp
		.src('theme/assets/*')
		.pipe(plumber())
		.pipe(rename({ prefix: 'dist-' }))
		.pipe(gulp.dest('docs'));
}
function tag() {
	return gulp
		.src('./package.json')
		.pipe(plumber())
		// bump package.json version
		.pipe(bump({type: 'patch'}))
		// save bumped file into filesystem
		.pipe(gulp.dest('./'))
}
function deploy() {
	return gulp
		.src('./*')
		.pipe(plumber())
		.pipe(gitignore())
		// add changes
		.pipe(git.add())
		// commit changes
		.pipe(git.commit('bump version'))
		// push local changes to repository
		.pipe(push({                      
			repository: 'origin',
			refspec: 'HEAD'
		}));
}


// Watch files
function watchFiles() {
	gulp.watch('src/build/*.js', bjs);
	gulp.watch('src/js/vendors/*.js', vjs);
	gulp.watch('src/scripts/**/*', js);
	gulp.watch('src/build/*.css', pcss);
	gulp.watch('src/styles/**/*', css);
	gulp.watch('theme/assets/**/*', cdn, tag, deploy);
}

// define complex tasks
const build = gulp.parallel(pcss, css, bjs, vjs, js);
const watch = gulp.series(watchFiles);


// export tasks
exports.pcss = pcss;
exports.css = css;
exports.bjs = bjs;
exports.vjs = vjs;
exports.js = js;
exports.cdn = cdn;
exports.tag = tag;
exports.deploy = deploy;
exports.build = build;
exports.watch = watch;
exports.default = build;
