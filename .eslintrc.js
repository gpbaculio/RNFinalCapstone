module.exports = {
  root: true,
  extends: ['plugin:import/errors', 'plugin:import/warnings'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
