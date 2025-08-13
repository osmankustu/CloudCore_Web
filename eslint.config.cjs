const eslintPluginTs = require("@typescript-eslint/eslint-plugin");
const eslintPluginSecurity = require("eslint-plugin-security");
const eslintPluginSimpleImportSort = require("eslint-plugin-simple-import-sort");
const eslintPluginUnusedImports = require("eslint-plugin-unused-imports");
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      security: eslintPluginSecurity,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "unused-imports": eslintPluginUnusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    linterOptions: {
      // Bu satır yeni "no-unused-disable" karşılığı
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      // "no-unused-disable" artık yok, kaldırdık
    },
    overrides: [
      {
        files: ["eslint.config.cjs"],
        rules: {
          "@typescript-eslint/no-require-imports": "off",
        },
      },
    ],
  },
];
