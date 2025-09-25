module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
          },
        },
      ],
      // Keep this plugin last as recommended by Reanimated docs
      ["react-native-reanimated/plugin", { processNestedWorklets: true }],
    ],
  };
};


