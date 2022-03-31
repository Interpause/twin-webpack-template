const webpack = require('webpack')
const argv = require('webpack-nano/argv')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { WebpackPluginServe } = require('webpack-plugin-serve')

const { production: isProd } = argv

// babel loader options
const babelOpts = {
  cacheDirectory: true,
  presets: [],
  plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
}

/** @type { webpack.ModuleOptions } */
const moduleOpts = {
  rules: [
    {
      test: /\.ts(x)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOpts,
        },
      ],
    },
    {
      resourceQuery: /raw/,
      type: 'asset/source',
    },
    {
      resourceQuery: /inline/,
      type: 'asset/inline',
    },
    {
      resourceQuery: /url/,
      type: 'asset/resource',
    },
  ],
}

/** @type { webpack.WebpackPluginInstance[] } */
const wpPlugins = [
  // replaces process.env.[VAR] with value at compile time
  new webpack.EnvironmentPlugin({ VERSION_NAME: 'unspecified' }),
  // auto-generate index.html
  new HtmlWebpackPlugin({
    title: 'Insert Title',
  }),
]

/** @type { webpack.Configuration } */
const config = {
  entry: ['./src/index.tsx'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/web'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '...'],
  },
  module: moduleOpts,
  plugins: wpPlugins,
}

config.mode = process.env.NODE_ENV = isProd ? 'production' : 'development'

if (isProd) {
  // Additional production mode config
  config.target = 'browserslist'
  wpPlugins.push(
    new BundleAnalyzerPlugin({
      reportFilename: path.resolve(__dirname, 'dist/webpack_report.html'),
      analyzerMode: 'static',
    }),
  )
  babelOpts.plugins.push([
    '@babel/plugin-transform-react-jsx',
    {
      runtime: 'automatic',
      importSource: '@emotion/react',
    },
  ])
  babelOpts.presets.push('@babel/preset-env')
} else {
  // Additional development mode config
  config.entry = ['webpack-plugin-serve/client', ...config.entry]
  config.watch = true
  wpPlugins.push(
    new ReactRefreshPlugin(),
    new WebpackPluginServe({
      host: 'localhost',
      port: 8080,
      progress: 'minimal',
      static: config.output.path,
      hmr: 'refresh-on-failure',
    }),
  )
  babelOpts.plugins.push([
    '@babel/plugin-transform-react-jsx-development',
    {
      runtime: 'automatic',
      importSource: '@emotion/react',
    },
  ])
}

module.exports = config
