import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    rules: {
      "no-unused-vars": "warn",  // Warn about unused variables
      "no-undef": "warn",        // Warn about undefined variables
      "eqeqeq": "error",         // Enforce === instead of ==
      "no-console": ["warn", { "allow": ["warn", "error"] }],      // Warn about console.log statements
      "semi": ["error", "always"], // Require semicolons
      "quotes": ["error", "double"] // Enforce double quotes
    },
    files: ["*.js"]
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  {
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "docs/",  // ✅ This prevents linting errors from build files
      "build/",
    ],
  },
];
