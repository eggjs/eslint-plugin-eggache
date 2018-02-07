# eslint-plugin-eggache

custom eslint rule for egg RTFM questions

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/eslint-plugin-eggache.svg?style=flat-square
[npm-url]: https://npmjs.org/package/eslint-plugin-eggache
[travis-image]: https://img.shields.io/travis/{{org}}/eslint-plugin-eggache.svg?style=flat-square
[travis-url]: https://travis-ci.org/{{org}}/eslint-plugin-eggache
[codecov-image]: https://codecov.io/gh/{{org}}/eslint-plugin-eggache/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/{{org}}/eslint-plugin-eggache
[david-image]: https://img.shields.io/david/{{org}}/eslint-plugin-eggache.svg?style=flat-square
[david-url]: https://david-dm.org/{{org}}/eslint-plugin-eggache
[snyk-image]: https://snyk.io/test/npm/eslint-plugin-eggache/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/eslint-plugin-eggache
[download-image]: https://img.shields.io/npm/dm/eslint-plugin-eggache.svg?style=flat-square
[download-url]: https://npmjs.org/package/eslint-plugin-eggache

## Usage

```bash
npm i eslint-plugin-eggache --save
```

## Rules

### no-override-exports

A common mistake that newbee will make - override `module.exports` and `exports`.

```js
/* eslint eggache/no-override-exports: [ 'error' ] */

// config/config.default.js
exports.view = {};

module.exports = appInfo => {
  const config = exports = {};
  config.keys = '123456';
  return config;
}
```

**Options**:

The first options is a boolean, default to false, means only check:
- `config/config.*.js`
- `config/plugin.*.js`

set it to `true` means to check all files.

```js
/* eslint eggache/no-override-exports: [ 'error', true ] */

// due to options `true`, this will pass the lint
// ${app_root}/app.js
module.exports = exports = {};
exports.keys = '123456';
```