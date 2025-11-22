// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "nativewind/babel", // 👈 NativeWind goes here, as a PRESET
    ],
    plugins: [
      "expo-router/babel",
      "react-native-reanimated/plugin", // 👈 MUST be last
    ],
  };
};
