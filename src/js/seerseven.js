import * as el from './utils/element';

document.addEventListener('DOMContentLoaded', function () {
	el.change('id', 'page-index', 'add', 'SUCK-MY-BALLS');

	const div = 'block-be2ef39cad6b4a7b9323e5d661b095bc';
	const main = 'block-6d55f0a3e06c494e9a42d3a4349643ae';

	const content = el.newID(main, 'mainContent');
	const newDiv = el.newID(div, 'newDiv');

	el.prepend('#newDiv', '#mainContent');
	el.wrap('#page-index', 'wrapper', 'pageWrapper');
	el.inner('#mainContent', 'inner-wrapper');

	el.insert('before', '#newDiv', '#mainContent');
	$('.wrapper').css({
		'background-color': '#f8f8f8',
		width: '100%',
		'max-width': '1000px',
		margin: '20px auto',
	});
});
