module.exports = {
	extends: [
		'stylelint-config-prettier',
		'stylelint-config-recess-order',
		'stylelint-config-standard',
	],
	plugins: ['stylelint-prettier', 'stylelint-order'],
	rules: {
		indentation: 2,
		'color-hex-case': 'lower',
		'color-hex-length': 'short',
		'order/properties-order': ['never'],
		'max-nesting-depth': 6,
	},
	customSyntax: 'postcss-html',
};
