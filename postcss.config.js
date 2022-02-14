module.exports = {
	syntax: 'postcss-scss',
	parser: 'postcss-scss',
	plugins: [
		require('postcss-alias'),
		require('postcss-hocus'),
		require('postcss-utilities'),
		require('postcss-instagram'),
		require('postcss-aimlesscolor'),
		require('postcss-contrast'),
		require('postcss-scrollbar'),
		require('postcss-short'),
		require('postcss-tipsy'),
		require('postcss-easing-gradients'),
		require('postcss-custom-selectors'),
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
		require('postcss-placehold')({ service: 'dummyimage' }),
		require('css-declaration-sorter')({ order: 'smacss' }),
		require('postcss-fixes')({ preset: 'safe' }),
		require('postcss-preset-env')({ stage: 1 }),
		require('autoprefixer')({
			grid: 'true',
		}),
	],
};
