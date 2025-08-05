// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      import: require('eslint-plugin-import'),
    },
    settings: {
      'import/resolver': {
        typescript: {
          // tsconfig.json 경로 명시 가능 (생략하면 자동 탐색)
        },
      },
    },
  },
]);
