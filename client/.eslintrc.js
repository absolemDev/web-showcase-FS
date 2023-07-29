module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: [0, 4],
    // indent: ["error", 2, { ignoredNodes: ["ConditionalExpression"] }],
    semi: [2, "always"],
    "react/display-name": "off",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    "multiline-ternary": ["off"],
    "react/react-in-jsx-scope": "off"
  }
};
