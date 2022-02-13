const breakpoints = [
	{ prefix: 'zx-', mediaQuery: '(min-width: 0px)' },
	{ prefix: 'xs-', mediaQuery: '(min-width: 360px)' },
	{ prefix: 'sm-', mediaQuery: '(min-width: 576px)' },
	{ prefix: 'sx-', mediaQuery: '(min-width: 640px)' },
	{ prefix: 'md-', mediaQuery: '(min-width: 768px)' },
	{ prefix: 'nx-', mediaQuery: '(min-width: 900px)' },
	{ prefix: 'lg-', mediaQuery: '(min-width: 992px)' },
	{ prefix: 'xl-', mediaQuery: '(min-width: 1200px)' },
	{ prefix: 'xxl-', mediaQuery: '(min-width: 1400px)' },
	{ prefix: 'xxxl-', mediaQuery: '(min-width: 1600px)' },
];
const responsified = {
	breakpoints,
};

module.exports = {
	syntax: 'postcss-scss',
	parser: 'postcss-scss',
	plugins: [
		require('postcss-alias'),
		require('postcss-hocus'),
		require('postcss-utilities'),
		require('postcss-colorstring'),
		require('postcss-instagram'),
		require('postcss-aimlesscolor'),
		require('postcss-contrast'),
		require('postcss-center'),
		require('postcss-scrollbar'),
		require('postcss-omnicss'),
		require('postcss-short'),
		require('postcss-tipsy'),
		require('postcss-easing-gradients'),
		require('postcss-custom-selectors'),
		require('postcss-pseudo-classes')({
			blacklist: [':root'],
			restrictTo: [':nth-child', 'hover'],
			allCombinations: true,
			preserveBeforeAfter: true,
		}),
		require('postcss-font-magician')({
			// hosted: ['./src/fonts', /custom/path/to/fonts/on/site],
			foundries: ['google'],
			variants: {
				Montserrat: {
					300: [],
					400: [],
					500: [],
					600: [],
					700: [],
				},
			},
		}),
		require('postcss-fluid')({
			min: '320px',
			max: '1600px',
			functionName: 'fluid',
		}),
		require('mdcss')({ destination: '.vscode/styleguide' }),
		require('postcss-placehold')({ service: 'dummyimage' }),
		require('postcss-responsify')(responsified),
		require('css-declaration-sorter')({ order: 'smacss' }),
		require('postcss-fixes')({ preset: 'safe' }),
		require('postcss-preset-env')({ stage: 1 }),
		require('autoprefixer')({
			grid: 'true',
		}),
	],
};
