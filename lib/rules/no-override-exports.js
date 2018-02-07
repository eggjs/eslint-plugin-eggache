'use strict';

const path = require('path');

module.exports = {
  meta: {
    docs: {
      description: 'Disallow override exports',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/eggjs/eslint-plugin-eggache#no-override-exports',
    },
    schema: [
      {
        // if true, check all file, otherwise only check `config/config.*.js` or config/plugin.*.js`
        type: 'boolean',
      },
    ],
    messages: {
      exportsAfterModule: 'Don\'t use `exports` after `module.exports`',
      moduleAfterExports: 'Don\'t use `module.exports` after `exports`',
      repeatModule: 'Don\'t use `module.exports` multiple times',
    },
  },
  create(context) {
    let hasExports = false;
    let hasModule = false;
    const shouldCheckAll = context.options[0];
    // if `!shouldCheckAll`, then only check `<input>` or `config/config.*.js` or `config/plugin.*.js`
    if (!shouldCheckAll && !isConfig(context)) return {};

    return {
      ExpressionStatement(node) {
        // only consider the root scope
        if (context.getScope().type !== 'global') return;
        if (node.expression.type !== 'AssignmentExpression') return;
        const testNode = node.expression.left;
        if (isExports(testNode)) {
          if (hasModule) {
            context.report({ node, messageId: 'exportsAfterModule' });
          }
          hasExports = true;
        } else if (isModule(testNode)) {
          if (hasExports) {
            context.report({ node, messageId: 'moduleAfterExports' });
          }
          if (hasModule) {
            context.report({ node, messageId: 'repeatModule' });
          }
          hasModule = true;
        }
      },
    };
  },
};

function isConfig(context) {
  const filePath = context.getFilename();
  if (filePath === '<input>') return true;
  const baseName = path.basename(filePath);
  const dirname = path.basename(path.dirname(filePath));
  return dirname === 'config' && (baseName.startsWith('config.') || baseName.startsWith('plugin.'));
}

function isExports(node) {
  // exports.view = '';
  // exports['view'] = '';
  return node.object.type === 'Identifier' && node.object.name === 'exports';
}

function isModule(node) {
  // module.exports = {};
  // module.exports = () => {};
  if (node.object.type === 'Identifier') {
    return node.object.name === 'module' && node.property.type === 'Identifier' && node.property.name === 'exports';
  }

  if (node.object.type === 'MemberExpression') {
    const realNode = node.object;
    return realNode.object.name === 'module' && realNode.property.type === 'Identifier' && realNode.property.name === 'exports';
  }
}
