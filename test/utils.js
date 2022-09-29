'use strict';

const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

exports.defineTest = (ruleName, fixtures) => {
  const rule = require(`../lib/rules/${ruleName}`);

  fixtures.valid = (fixtures.valid || []).map(item => normalizeFixture(item));
  fixtures.invalid = (fixtures.invalid || []).map(item => normalizeFixture(item));

  return ruleTester.run(`test/rules/${ruleName}.test.js`, rule, fixtures);
};

function normalizeFixture(input) {
  if (typeof input === 'string') {
    input = {
      code: input,
    };
  }
  return input;
}
