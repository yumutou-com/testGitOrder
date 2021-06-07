/* eslint-disable */
module.exports = {
  extends: ['sei'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    'global-require': 0,
    'no-underscore-dangle': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'import/order': 2,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/no-did-update-set-state': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/sort-comp': [
      2,
      {
        order: ['static-variables', 'static-methods', 'lifecycle', 'everything-else', 'render'],
      },
    ],
    'no-return-assign': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'no-unused-expressions': 0,
    'no-restricted-syntax': 0,
    'consistent-return': 0,
    'react/no-find-dom-node': 0,
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
  },
};
