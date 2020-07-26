const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
    env: {
        browser: true,
        jest: true,
        es2020: true,
    },
    extends: ["airbnb-typescript", "react-app", "prettier", "prettier/react"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": ["error", prettierOptions],
    },
};
