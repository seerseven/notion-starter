const { src, series } = require('gulp');
const git = require('gulp-git');
const push = require('gulp-git-push');
const gitignore = require('gulp-gitignore');

//Define Src and Dest Filepaths
const app = './';

function gitSave() {
	return src([app + '*'])
		.pipe(gitignore())
		.pipe(git.add())
		.pipe(git.commit('bump version'));
}

function gitSend(done) {
	git.push('origin', 'master', function (err) {
		if (err) throw err;
	});
	done();
}

exports.gitSave = gitSave;
exports.gitSend = gitSend;
exports.deploy = series(gitSave, gitSend);
