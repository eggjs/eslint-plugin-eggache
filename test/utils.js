'use strict';

const is = require('is-type-of');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

exports.defineTest = (ruleName, fixtures) => {
  const rule = require(`../lib/rules/${ruleName}`);

  fixtures.valid = (fixtures.valid || []).map(item => normalizeFixture(item));
  fixtures.invalid = (fixtures.invalid || []).map(item => normalizeFixture(item));

  return ruleTester.run(`test/rules/${ruleName}.test.js`, rule, fixtures);
};

function normalizeFixture(input) {
  if (is.string(input)) {
    input = {
      code: input,
    };
  }
  // input.
  input.parserOptions = Object.assign({ ecmaVersion: 6 }, input.parserOptions);
  return input;
}
