'use strict';

const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('oxlint integration tests', () => {
  const pluginPath = path.join(__dirname, '../../index.js');
  const fixturesDir = path.join(__dirname, 'fixtures');
  const configPath = path.join(__dirname, '.oxlintrc.json');

  it('should export plugin metadata required by oxlint', () => {
    const plugin = require('../../index.js');

    // Check plugin structure
    assert(plugin, 'Plugin should export an object');
    assert(plugin.meta, 'Plugin should have meta field');
    assert(plugin.meta.name, 'Plugin meta should have name');
    assert(plugin.meta.version, 'Plugin meta should have version');
    assert.strictEqual(plugin.meta.name, 'eslint-plugin-eggache', 'Plugin name should be correct');

    // Check rules structure
    assert(plugin.rules, 'Plugin should export rules');
    assert(plugin.rules['no-only-tests'], 'Plugin should have no-only-tests rule');
    assert(plugin.rules['no-override-exports'], 'Plugin should have no-override-exports rule');
    assert(plugin.rules['no-unexpected-plugin-keys'], 'Plugin should have no-unexpected-plugin-keys rule');

    // Check each rule has proper structure for oxlint
    Object.keys(plugin.rules).forEach(ruleName => {
      const rule = plugin.rules[ruleName];
      assert(rule.meta, `Rule ${ruleName} should have meta`);
      assert(rule.meta.type, `Rule ${ruleName} should have meta.type`);
      assert(rule.meta.docs, `Rule ${ruleName} should have meta.docs`);
      assert(rule.create, `Rule ${ruleName} should have create function`);
      assert.strictEqual(typeof rule.create, 'function', `Rule ${ruleName} create should be a function`);
    });
  });

  it('should have test fixtures for oxlint', () => {
    // Verify fixtures exist
    const fixtures = [
      'no-only-tests.js',
      'no-override-exports.js',
      'no-unexpected-plugin-keys.js',
    ];

    fixtures.forEach(fixture => {
      const fixturePath = path.join(fixturesDir, fixture);
      assert(fs.existsSync(fixturePath), `Fixture ${fixture} should exist`);
      const content = fs.readFileSync(fixturePath, 'utf8');
      assert(content.length > 0, `Fixture ${fixture} should have content`);
    });
  });

  it('should have oxlint configuration file', () => {
    assert(fs.existsSync(configPath), 'oxlint config should exist');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    assert(config.jsPlugins, 'Config should have jsPlugins field');
    assert(Array.isArray(config.jsPlugins), 'jsPlugins should be an array');
    assert(config.rules, 'Config should have rules field');
    assert(config.rules['eggache/no-only-tests'], 'Config should have eggache/no-only-tests rule');
    assert(config.rules['eggache/no-override-exports'], 'Config should have eggache/no-override-exports rule');
    assert(config.rules['eggache/no-unexpected-plugin-keys'], 'Config should have eggache/no-unexpected-plugin-keys rule');
  });

  it('should verify plugin is compatible with ES module imports', async () => {
    // Test that the plugin can be imported as an ES module
    // This is required for oxlint's JS plugin support
    const { pathToFileURL } = require('url');
    const pluginURL = pathToFileURL(pluginPath).href;

    try {
      // Dynamic import to test ES module compatibility
      const imported = await import(pluginURL);
      const plugin = imported.default || imported;

      assert(plugin, 'Plugin should be importable as ES module');
      assert(plugin.meta, 'Imported plugin should have meta');
      assert(plugin.meta.name, 'Imported plugin should have name');
      assert(plugin.rules, 'Imported plugin should have rules');
    } catch (error) {
      throw new Error(`Plugin is not compatible with ES module imports: ${error.message}`);
    }
  });
});

