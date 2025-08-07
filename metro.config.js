const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");
const config = getDefaultConfig(__dirname);
const merge = require("deepmerge");
// const mergedConfig = merge(
//   withNativeWind(config, { input: "./global.css" }),
  
//   // {
//   //   arrayMerge: (target, source) => source.concat(target),
//   //   isMergeableObject: (obj) =>
//   //     (obj !== undefined &&
//   //       obj !== null &&
//   //       Object.getPrototypeOf(obj) === Object.prototype) ||
//   //     obj instanceof Array,
//   // }
// );

// console.log(mergedConfig);

module.exports = withNativeWind(config, { input: "./global.css" })
