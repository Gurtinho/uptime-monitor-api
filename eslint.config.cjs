// eslint.config.cjs
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules', 'dist', 'build'], // substitui .eslintignore
  },
  {
    files: ['**/*.{ts,tsx,js}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module', // troque para 'script' se usar CommonJS
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: pluginImport,
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off', // desativa regra do core
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  }
]