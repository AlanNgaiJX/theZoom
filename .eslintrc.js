module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/no-unused-components": [
            "off",
            {
                // 开关： off error warn  检查是否注册了没有用到的组件 production环境其实应该检测  https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-unused-components.md
                ignoreWhenBindingPresent: true,
            },
        ],
        "@typescript-eslint/no-explicit-any": ["off"],
    },
};
