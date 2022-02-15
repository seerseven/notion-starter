const { task, series, watch, src, dest, parallel } = require('gulp');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');

const esbuild = 'src/build/';
const styles = 'src/styles/';
const dist = 'theme/assets';

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

exports.css = css;
