// This file should trigger the no-override-exports rule
exports.view = {};

module.exports = appInfo => {
  const config = {};
  config.keys = '123456';
  return config;
};
