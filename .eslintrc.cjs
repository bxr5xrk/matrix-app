module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['react', 'jsx-a11y'],
    ignorePatterns: ['vite.config.ts'],
    rules: {
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-console': 'warn',
        'jsx-quotes': ['error', 'prefer-double'],
        'semi-spacing': ['error', { before: false, after: true }],
        quotes: ['error', 'single', { avoidEscape: true }],
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'no-whitespace-before-property': 'error'
        // indent: ['error', 4]
    },
    settings: {
        react: {
            version: 'detect'
        },
        prettier: {
            singleQuote: true,
            jsxSingleQuote: false
        }
    }
};
