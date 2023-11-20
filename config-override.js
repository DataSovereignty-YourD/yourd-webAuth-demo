// webpack.config.js
const webpack = require('webpack');

module.exports = function override(config, env) {
    // 웹팩 설정을 여기서 커스터마이즈합니
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/")
    };
    // 예: config.module.rules.push(...);

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'] // Buffer 클래스를 전역 변수로 제공
        })
    ]);

    return config;
};