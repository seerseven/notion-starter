'use strict';

const { series, watch, src, dest } = require('gulp');
const bump = require('gulp-bump');
const plumber = require('gulp-plumber');
const prompt = require('gulp-prompt');

const cssTasks = require('./styles.js');
const jsTasks = require('./scripts.js');
const gitTasks = require('./git.js');
const sassTasks = require('./sass.js');

//Define Src and Dest Filepaths
const app = './';

function ver() {
	return src([app + 'package.json'])
		.pipe(plumber())
		.pipe(bump({ type: 'patch' }))
		.pipe(dest(app));
}

function ask(done) {
	src('test.js', { allowEmpty: true }).pipe(
		prompt.confirm(
			{
				type: 'input',
				name: 'test',
				message: 'Hello, please enter commit mesage?',
			},
			(res) => {
				console.log('Result', res);
			}
		)
	);
	done();
}

function watchcode() {
	watch('src/build/*.css', cssTasks.css);
	watch('src/build/*.js', jsTasks.js);
	watch('src/vendors/*.js', jsTasks.lib);
}

exports.watch = watchcode;
exports.css = cssTasks.css;
exports.js = jsTasks.js;
exports.lib = jsTasks.lib;
exports.save = gitTasks.gitSave;
exports.send = gitTasks.gitSend;
exports.deploy = series(gitTasks.gitSave, gitTasks.gitSend);
exports.scss = sassTasks.scss;
exports.ver = ver;
exports.ask = ask;

exports.default = function () {
	watch('src/build/*.css', cssTasks.css);
	watch('src/build/*.js', jsTasks.js);
	watch('src/vendors/*.js', jsTasks.lib);
	watch(
		'theme/assets/*.min.*',
		{ delay: 3500 },
		series(gitTasks.gitSave, gitTasks.gitSend)
	);
};
