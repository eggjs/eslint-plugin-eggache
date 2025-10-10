// This file should trigger the no-unexpected-plugin-keys rule
exports.test = {
  enable: true,
  package: 'egg-test',
  someConfig: 'should not be here',
};
