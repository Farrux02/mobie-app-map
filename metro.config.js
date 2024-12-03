// metro.config.js

const { getDefaultConfig } = require("@expo/metro-config");

const isWeb = process.env.EXPO_PLATFORM === "web";

if (!isWeb) {
  const {
    wrapWithReanimatedMetroConfig,
  } = require("react-native-reanimated/metro-config");

  const defaultConfig = getDefaultConfig(__dirname);

  defaultConfig.resolver.assetExts.push("bin");

  module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
} else {
  module.exports = {};
}
