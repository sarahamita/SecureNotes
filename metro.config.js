const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    /* Resolver config */
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], // Add this line
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
