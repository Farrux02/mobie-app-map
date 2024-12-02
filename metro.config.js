// metro.config.js

const { getDefaultConfig } = require("@expo/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// Получаем конфигурацию по умолчанию от Expo
const defaultConfig = getDefaultConfig(__dirname);

// Добавляем расширение "bin" для MapLibre
defaultConfig.resolver.assetExts.push("bin");

// Оборачиваем конфигурацию с помощью reanimated
module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
