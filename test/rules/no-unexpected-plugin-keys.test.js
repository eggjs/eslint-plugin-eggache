'use strict';

const defineTest = require('../utils').defineTest;

defineTest('no-unexpected-plugin-keys', {
  valid: [
    `
    exports.test = {
      enable: true,
      package: '',
      env: [ 'local' ],
      path: '',
    }
    `,
    `
    module.exports = {
      test: {
        enable: true,
        package: '',
        env: [ 'local' ],
        path: '',
      },
      view: false,
    }
    `,
    `
    exports.view = true;
    module.exports.test = true;
    `,
    {
      code: `
        exports.test = {
          enable: true,
          package: '',
          foo: 'bar',
        }
      `,
      // don't check not plugin files
      filename: '/config/config.default.js',
    },
  ],

  invalid: [
    {
      code: `
        exports.test = {
          enable: true,
          package: '',
          foo: 'bar',
        }
      `,
      errors: [{ messageId: 'unexpectedKey', data: { key: 'foo' } }],
    },
    {
      code: `
        module.exports = {
          test: {
            enable: true,
            package: '',
            other: false,
          },
        }
      `,
      errors: [{ messageId: 'unexpectedKey', data: { key: 'other' } }],
    },
  ],
});
