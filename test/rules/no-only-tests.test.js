'use strict';

const defineTest = require('../utils').defineTest;

defineTest('no-only-tests', {
  valid: [
    `describe('desc something', function() {
      // do nothing
    });`,
    `it("assert something", function() {
      // do nothing
    });`,
  ],
  invalid: [
    {
      code: `describe.only('desc something', function() {
        // do nothing
      })`,
      errors: [{ message: 'describe.only not permitted' }],
    },
    {
      code: `it.only('assert something', function() {
        // do nothing
      })`,
      errors: [{ message: 'it.only not permitted' }],
    },
  ],
});
