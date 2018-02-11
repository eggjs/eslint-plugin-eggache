'use strict';

module.exports = {
  rules: {
    'no-override-exports': require('./lib/rules/no-override-exports'),
    'no-unexpected-plugin-keys': require('./lib/rules/no-unexpected-plugin-keys'),
  },
  configs: {
    recommended: {
      plugins: [ 'eggache' ],
      parserOptions: {
        ecmaVersion: 6,
      },
      overrides: [
        {
          files: [ 'config/config.*.js', 'config/plugin.*.js', 'config/plugin.js' ],
          rules: {
            'eggache/no-override-exports': 'error',
            'eggache/no-unexpected-plugin-keys': 'error',
          },
        },
      ],
    },
  },
};
