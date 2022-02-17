import * as el from './utils/element';

document.addEventListener('DOMContentLoaded', function () {
	el.change('id', 'page-index', 'add', 'SUCK-MY-BALLS');

	const div = 'block-be2ef39cad6b4a7b9323e5d661b095bc';
	const main = 'block-6d55f0a3e06c494e9a42d3a4349643ae';

	const content = el.newID(main, 'mainContent');
	const newDiv = el.newID(div, 'newDiv');
	console.log(content);
	console.log(newDiv);
	el.prepend('#newDiv', '#mainContent');
});
