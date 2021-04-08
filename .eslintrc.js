module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	overrides: [{
		files: ['*.ts', '*.tsx'],
		rules: {
			'no-undef': 'off',
		},
	}],
	rules: {
		indent: [2, 'tab'],
		radix: [2, 'as-needed'],
		camelcase: 0,
		'no-tabs': 0,
		'no-else-return': 0,
		'operator-linebreak': [1, 'after'],
		'max-len': [1, { code: 120, ignoreComments: true }],
		'arrow-parens': [1, 'as-needed'],
		'dot-notation': [2, { allowKeywords: false }],
		'object-curly-newline': [2, { consistent: true }],
		'no-use-before-define': [0, { functions: true, classes: true, variables: true }],
		'consistent-return': 1,
		'no-confusing-arrow': 1,
		'no-nested-ternary': 0,
		'import/extensions': 0,
		'import/prefer-default-export': 0,
		'import/no-unresolved': [2, { caseSensitive: true }],
		'react/no-array-index-key': 0,
		'react/jsx-indent': [2, 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'react/require-default-props': 0,
		'react/jsx-props-no-spreading': [2, {
			html: 'ignore',
			custom: 'ignore',
			explicitSpread: 'enforce',
			exceptions: [''],
		}],
	},
};
