const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/`,
  outputPath: `./dist`,
  disableCSSModules: true,
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
