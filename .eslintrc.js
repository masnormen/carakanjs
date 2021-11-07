module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    indent: ["error", 2, {SwitchCase: 1}],
    "@typescript-eslint/no-namespace": "off",
  },
};
