const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

function scss() {
	return src('src/sass/abstracts/utilities/schema/schema.scss')
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(rename({ basename: 'sche-ma', extname: '.scss' }))
		.pipe(dest('src/sass/abstracts/utilities/schema'));
}

exports.scss = scss;
