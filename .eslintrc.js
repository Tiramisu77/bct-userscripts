module.exports = {
    env: {
        es6: true,
        browser: true,
    },

    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: [],
    rules: { "no-console": "off", "no-var": ["error"] },
}
