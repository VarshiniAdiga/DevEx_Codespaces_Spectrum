const presets = ["@babel/preset-env", "@babel/preset-react"];

const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }]
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ["@babel/plugin-proposal-private-methods", { loose: true }]
];

const env = {
    development: {
        plugins
    }
};

export default {
    presets,
    plugins,
    env
};
