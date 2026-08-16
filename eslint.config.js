import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import lit from 'eslint-plugin-lit'
import globals from 'globals'

export default tseslint.config(
	{ ignores: ['dist', 'node_modules', '.idea', 'src/generated'] },
	eslint.configs.recommended,
	tseslint.configs.recommended,
	{
		files: ['**/*.ts'],
		plugins: { lit },
		rules: {
			...lit.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'no-console': ['error', { allow: ['error', 'warn'] }],
			eqeqeq: ['error', 'always'],
			'prefer-const': 'error',
		},
	},
	{
		files: ['test/**/*.ts', '*.config.ts'],
		rules: { 'no-console': 'off' },
	},
	{
		files: ['scripts/**/*.mjs'],
		languageOptions: { globals: globals.node },
		rules: { 'no-console': 'off' },
	},
)
