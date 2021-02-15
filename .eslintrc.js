module.exports = {
  'extends': 'react-app',
  'plugins': ['react-hooks'],
  'rules' : {
    'no-trailing-spaces': 'warn',
    'quotes': ['warn', 'single'],
    'indent': ['warn', 2],
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-unused-vars': 'warn',
    'no-debugger': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn' // <--- THIS IS THE NEW RULE
  },
}
