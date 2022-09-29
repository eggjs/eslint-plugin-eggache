'use strict';

module.exports = {
  rules: {
    'no-only-tests': require('./lib/rules/no-only-tests'),
    'no-override-exports': require('./lib/rules/no-override-exports'),
    'no-unexpected-plugin-keys': require('./lib/rules/no-unexpected-plugin-keys'),
  },
  configs: {
    recommended: {
      plugins: [ 'eggache' ],
      rules: {
        'eggache/no-only-tests': 'warn',
        'eggache/no-override-exports': 'error',
        'eggache/no-unexpected-plugin-keys': 'error',
      },
    },
  },
};
