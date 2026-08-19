// @ts-check
const {defineConfig} = require('eslint/config');
const angular = require('angular-eslint');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        extends: [angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/component-selector': [
                'error',
                {
                    prefix: 'dp',
                    style: 'kebab-case',
                    type: 'element',
                },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    prefix: 'dp',
                    style: 'camelCase',
                    type: 'attribute',
                },
            ],
            '@angular-eslint/no-output-native': 'off',
            '@angular-eslint/no-output-on-prefix': 'off',
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
            '@angular-eslint/prefer-standalone': 'warn',
            'no-console': [
                'error',
                {
                    allow: ['info', 'error'],
                },
            ],
            'no-debugger': 'error',
            quotes: [
                'error',
                'single',
                {
                    allowTemplateLiterals: true,
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [angular.configs.templateRecommended],
    },
    {
        files: ['projects/ng2-date-picker/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-inject': 'off',
        },
    },
]);
