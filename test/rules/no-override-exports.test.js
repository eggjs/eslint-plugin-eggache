'use strict';

const defineTest = require('../utils').defineTest;

defineTest('no-override-exports', {
  valid: [
    `
    module.exports = appInfo => {
      const config = exports = {};
      exports.view = '';
      return config;
    }
    `,
    `
    exports.view = '';
    exports['view'] = '';
    `,
    'module.exports = {};',
    'module.exports = appInfo => {};',
    {
      code: `
        module.exports = {};
        exports.view = true;
      `,
      // don't check not config files
      filename: '/app_root/app.js',
      options: [ ],
    },
  ],

  invalid: [
    {
      code: `
        exports.view = '';
        module.exports = {};
      `,
      errors: [{ messageId: 'moduleAfterExports' }],
    },
    {
      code: `
        module.exports = {};
        exports.view = '';
      `,
      errors: [{ messageId: 'exportsAfterModule' }],
    },
    {
      code: `
        module.exports = {};
        module.exports.view = '';
      `,
      errors: [{ messageId: 'repeatModule' }],
    },
    {
      code: `
        module.exports = {};
        exports.view = true;
      `,
      // check all files
      filename: '/app_root/app.js',
      options: [ true ],
      errors: [{ messageId: 'exportsAfterModule' }],
    },
  ],
});
