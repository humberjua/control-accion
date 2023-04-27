// import { createExpoWebpackConfigAsync } from '@expo/webpack-config'
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // resolve victory-native as victory for the Web app
  config.resolve.alias['victory-native'] = 'victory'

  return config
}
