import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    rules: {
      "no-unused-vars": "warn", // ✅ Fix: Keep rules inside object
      "no-undef": "warn"
    },
    files: ["*.js"]
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended
];
