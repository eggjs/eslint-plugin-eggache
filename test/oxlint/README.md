# Oxlint Integration Tests

This directory contains tests and fixtures to verify that `eslint-plugin-eggache` is compatible with oxlint's JavaScript plugin system.

## Structure

- `fixtures/` - Test files that should trigger linting violations
- `.oxlintrc.json` - Oxlint configuration for testing the plugin
- `oxlint.test.js` - Automated tests to verify plugin structure and compatibility

## Running Tests

The automated tests verify:
1. Plugin exports the required metadata for oxlint (`meta.name`, `meta.version`)
2. All rules have proper structure (`meta.type`, `meta.docs`, `create` function)
3. Plugin is compatible with ES module imports (required by oxlint)
4. Test fixtures and configuration files exist

Run the tests with:
```bash
npm test
```

## Manual Testing with Oxlint

Since oxlint's JavaScript plugin support is experimental and under active development, manual testing may be needed.

### Prerequisites

```bash
npm install oxlint --save-dev
```

### Method 1: Using npm package

1. Publish or link the package:
   ```bash
   npm link
   ```

2. In a test project, link the plugin:
   ```bash
   npm link eslint-plugin-eggache
   ```

3. Create `.oxlintrc.json`:
   ```json
   {
     "jsPlugins": ["eslint-plugin-eggache"],
     "rules": {
       "eggache/no-only-tests": "warn",
       "eggache/no-override-exports": "error",
       "eggache/no-unexpected-plugin-keys": "error"
     }
   }
   ```

4. Run oxlint:
   ```bash
   npx oxlint .
   ```

### Method 2: Using absolute path

Create `.oxlintrc.json` with absolute path to the plugin:
```json
{
  "jsPlugins": ["/absolute/path/to/eslint-plugin-eggache/index.js"],
  "rules": {
    "eslint-plugin-eggache/no-only-tests": "warn",
    "eslint-plugin-eggache/no-override-exports": "error",
    "eslint-plugin-eggache/no-unexpected-plugin-keys": "error"
  }
}
```

### Testing with Fixtures

Test the plugin with the provided fixtures:

```bash
# Test no-only-tests rule
npx oxlint test/oxlint/fixtures/no-only-tests.js

# Test no-override-exports rule  
npx oxlint test/oxlint/fixtures/no-override-exports.js

# Test no-unexpected-plugin-keys rule
npx oxlint test/oxlint/fixtures/no-unexpected-plugin-keys.js
```

## Notes

- Oxlint's JavaScript plugin support is experimental and not subject to semver
- Plugin loading behavior may change in future oxlint versions
- The plugin structure follows ESLint conventions which oxlint aims to be compatible with
- See https://oxc.rs/blog/2025-10-09-oxlint-js-plugins.html for more information
