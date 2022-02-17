import * as el from './utils/element';

document.addEventListener('DOMContentLoaded', function () {
	el.change('id', 'page-index', 'add', 'SUCK-MY-BALLS');

	const newList = '#block-be2ef39cad6b4a7b9323e5d661b095bc';
	const main = '#block-6d55f0a3e06c494e9a42d3a4349643ae';

	const content = el.ID(main, 'mainContent');

	$(newList).appendTo(content);
});
