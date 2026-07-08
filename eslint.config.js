import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'error',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message:
            'dangerouslySetInnerHTML is forbidden. Untrusted HTML must go through DOMPurify.sanitize(); see src/components/custom/crypto-icons.tsx for the approved pattern.',
        },
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.object.name='sessionStorage'][callee.property.name=/^(getItem|setItem|removeItem)$/][arguments.0.type='Literal'][arguments.0.value='session-token']",
          message:
            "sessionStorage 'session-token' is forbidden — auth must come from HttpOnly cookies (Phase 3 H-02) and the WS path must use /auth/ws-ticket (Phase 3 H-04). Do not introduce new reads or writes.",
        },
      ],
    },
  },
  {
    files: [
      'src/components/custom/crypto-icons.tsx',
      'src/services/base.service.ts',
    ],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    files: ['src/utils/logger.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];
