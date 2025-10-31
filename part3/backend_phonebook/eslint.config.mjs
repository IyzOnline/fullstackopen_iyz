import globals from "globals";
import js from '@eslint/js'
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'
import stylisticJs from '@stylistic/eslint-plugin-js';

export default defineConfig([
  js.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: single,
    semi: false,
  }),
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",
      globals: { ...globals.node }, 
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      eqeqeq: 'error',
      'no-console': 'off',
    }
  },
  {
    ignores: ['dist/**'],
  }
]);
