const wallabyWebpack = require('wallaby-webpack'); // eslint-disable-line
const phantom = require('phantomjs2-ext'); // eslint-disable-line

module.exports = function configureWallaby(wallaby) {
  const webpackPostprocessor = wallabyWebpack({
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
          { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.s(a|c)ss$/, loader: 'style-loader!css-loader!sass-loader' },
      ],
    },
  });

  return {
    files: [
      { pattern: 'src/**/*.js*', load: false },
    ],
    tests: [
      { pattern: 'test/**/*.spec.js*', load: false },
    ],
    compilers: {
      '**/*.js*': wallaby.compilers.babel(),
    },
    postprocessor: webpackPostprocessor,
    bootstrap() {
      window.__moduleBundler.loadTests(); // eslint-disable-line
    },
    env: {
      runner: phantom.path,
      params: { runner: '--web-security=false' },
    },
  };
};
