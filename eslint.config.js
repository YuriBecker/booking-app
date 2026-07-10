import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";
import globals from "globals";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "public/mockServiceWorker.js",
      "**/*.{ts,tsx}",
    ],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["cypress/**/*.js"],
    ...cypress.configs.recommended,
  },
];
