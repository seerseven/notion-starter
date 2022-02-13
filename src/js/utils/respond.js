/**
 * postcss-responsify
 * @description Automatically create responsive classes for all rules in @respond {}
 * @author Derek Duncan <work@derekduncan.me>
 *
 * TODO:
 * -[x] Improve performance
 * -[] Extend @respond with breakpoint options
 * -[] Support nested @respond
 */

const postcss = require('postcss');
const merge = require('lodash/merge');

/**
 * Processes a breakpoint option by creating a PostCSS @media atRule from the options
 * @param {Object} root Root postcss node
 * @param {Object} breakpointOption
 * @param {String} breakpointOption.name
 * @param {String} breakpointOption.mediaQuery
 * @return {Object} Processed breakpoint option
 */
function processBreakpoint(root, breakpointOption) {
	if (breakpointOption && breakpointOption !== Object(breakpointOption)) {
		throw new Error('Breakpoint must be of type Object.');
	}

	const processedBreakpoint = Object.assign({}, breakpointOption);

	let atRule;
	/* search current rules to see if one exists */
	root.walkAtRules('media', (rule) => {
		if (rule.params !== processedBreakpoint.mediaQuery) return;
		atRule = rule;
	});

	/* if no rules exist, create a new one */
	if (!atRule) {
		atRule = postcss.atRule({
			name: 'media',
			params: processedBreakpoint.mediaQuery,
		});
	}

	processedBreakpoint.atRule = atRule;
	return processedBreakpoint;
}

/**
 * Provides defaults for the breakpoints options and processes each one
 * @param {Object} root Root postcss node
 * @param {Array} breakpointsOption Array of breakpoint objects
 * @return {Array} Processed breakpoints option
 */
function processBreakpoints(root, breakpointsOption) {
	if (breakpointsOption && !Array.isArray(breakpointsOption)) {
		throw new Error('Breakpoints option must be of type Array.');
	}

	const defaultBreakpoints = [
		{ prefix: 'zr-', mediaQuery: '(min-width: 0px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 360px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 576px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 640px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 768px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 900px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 992px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 1200px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 1400px)' },
		{ prefix: 'zr-', mediaQuery: '(min-width: 1600px)' },
	];

	const mergedBreakpoints = merge([], defaultBreakpoints, breakpointsOption);
	return mergedBreakpoints.map((breakpoint) =>
		processBreakpoint(root, breakpoint)
	);
}

/**
 * Creates a PostCSS rule based on breakpoint options
 * @param {Object} rule PostCSS rule to duplicate
 * @param {Object} prefix Prefix for selector
 * @return {Object} Responsified PostCSS rule
 */
function createPrefixedRule(rule, prefix) {
	const prefixLength = prefix.length;
	const selectorStart = rule.selector.slice(1, prefixLength + 1);
	const isAlreadyPrefixed = selectorStart === prefix;
	if (isAlreadyPrefixed) return false;

	return rule.clone({
		selector: `.${prefix + rule.selector.substring(1)}`,
	});
}

/**
 * Build a new PostCSS rule for every responsive state
 * @param {Array} breakpoints The processed breakpoints the build the rules off of
 * @return {Function}
 */
function responsifyRule(breakpoints) {
	/**
	 * Closure function that handles each @respond sub rule
	 * @param {Object} rule
	 */
	return (rule) => {
		/* insert the base rule right before the @respond rule */
		const root = rule.parent.parent;
		const clone = rule.clone();
		root.insertBefore(rule.parent, clone);

		const isValidSelector = rule.selector.charAt(0) === '.';
		if (!isValidSelector) return; /* equivilent to continue; */

		/* insert each responsive rule in its breakpoint's atRule */
		breakpoints.forEach((breakpoint) => {
			const responsiveRule = createPrefixedRule(rule, breakpoint.prefix);
			if (responsiveRule) {
				breakpoint.atRule.append(responsiveRule);
			}
		});
	};
}

/**
 * Loops through all @respond atRules in the css to find the rules that need to be responsified.
 * @param {Array} breakpoints The processed breakpoints to build the rules off of
 * @return {Function}
 */
function loopResponsiveRules(breakpoints) {
	/**
	 * Closure function that handles each @respond atRule
	 * @param {Object} rule
	 */
	return (rule) => {
		const subRules = rule.nodes;
		subRules.forEach(responsifyRule(breakpoints));
		/* remove the @respond structure since we've built the responsive rules we need */
		rule.remove();
	};
}

module.exports = postcss.plugin('postcss-respondify', (opts) => {
	const options = opts || {};

	return (root) => {
		const breakpoints = processBreakpoints(root, options.breakpoints);
		root.walkAtRules('respond', loopResponsiveRules(breakpoints));

		/* append each breakpoint's populated atRule into the css */
		root.append(
			breakpoints.map((breakpoint) => {
				return breakpoint.atRule;
			})
		);
	};
});
