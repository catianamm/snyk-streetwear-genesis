import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
  // Consider turning this to "error" for stricter checks, especially in CI
  "@typescript-eslint/no-unused-vars": [
    "warn", // or "error"
    {
      "argsIgnorePattern": "^_", // Allows unused function arguments prefixed with _
      "varsIgnorePattern": "^_", // Allows unused variables prefixed with _
      "caughtErrorsIgnorePattern": "^_" // Allows unused catch error variables prefixed with _
    }
  ],
    },
  }
);
