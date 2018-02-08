'use strict';

module.exports = {
  rules: {
    'no-override-exports': require('./lib/rules/no-override-exports'),
    'no-unexpected-plugin-keys': require('./lib/rules/no-unexpected-plugin-keys'),
  },
};
