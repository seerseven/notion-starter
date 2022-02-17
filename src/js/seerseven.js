import * as el from './utils/element';

document.addEventListener('DOMContentLoaded', function () {
	el.change('id', 'page-index', 'add', 'SUCK-MY-BALLS');

	const newList = '#block-be2ef39cad6b4a7b9323e5d661b095bc';
	const main = '#block-12f032d6c94e43738202084671106b47';
	$(newList).appendTo(main);
});
