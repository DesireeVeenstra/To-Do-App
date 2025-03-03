import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    },
    files: ["*.js"]
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  {
    ignores: ["docs/**"]  // ✅ Exclude build files from linting
  }
];
