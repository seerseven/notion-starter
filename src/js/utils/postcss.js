const breakp = [
	{ prefix: 'sm-', mediaQuery: '(min-width: 576px)' },
	{ prefix: 'md-', mediaQuery: '(min-width: 768px)' },
	{ prefix: 'lg-', mediaQuery: '(min-width: 992px)' },
	{ prefix: 'xl-', mediaQuery: '(min-width: 1200px)' },
];
const roptions = function () {
	return breakp;
};

module.exports = { roptions };
