# electron-template

This repository is a template for an electron app. Certain limitations with electron, and certain planned features did force my hand, but overall, the toolchain here uses more stable libraries as a result.

## Features

- [Electron](https://www.electronjs.org)'s cross-platform build tools
- [twin.macro](https://github.com/ben-rogerson/twin.macro) + [Emotion](https://emotion.sh) styling system
- Decent [Webpack](https://webpack.js.org/) + [Babel](https://babeljs.io/) Configuration
- [React Framework](https://reactjs.org/) with [Hot Module Reloading](https://webpack.js.org/concepts/hot-module-replacement/)
- [Yarn 2's](https://yarnpkg.com/) implementation of [pnpm](https://pnpm.io/)
- First class [VSCode](https://code.visualstudio.com/) support

### Webpack-specific

- [ResourceQuery-based approach](https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax) for static asset importing & typings
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) to help analyze & reduce bundle size
- `webpack.config.js` is type-hinted & structured for clearer distinction between `development` & `production` mode
- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) automates generating `index.html`
- [webpack-nano](https://github.com/shellscape/webpack-nano) for better webpack CLI & startup times
- [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) to replace environment variables at compile time
- [ReactRefreshPlugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) for HMR
- [webpack-plugin-serve](https://github.com/shellscape/webpack-plugin-serve) for more efficient dev server & HMR

### Babel-specific

- Use modern automatic `jsx` import system
- Use `jsx-dev` plugin for better debugging experience
- Integrated into `webpack.config.js`

## Quirks

- Currently Babel configuration for electron is messed up. Might need separate .babelrc and tsconfig.json for electron-side? Especially since types seem to be leaking in when electron is imported that is affecting the webapp types too.
- browserslist in package.json is used by babel preset-env. bad because theoretically should have different js targets for chromium-based frontend and Node.js based backend.
- One would consider electron-webpack or electron-builder... if one has noted it existed...
