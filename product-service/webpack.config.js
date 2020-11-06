const { IgnorePlugin } = require('webpack');

module.exports = {
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },
  plugins: [
		new IgnorePlugin({
			resourceRegExp: /^pg-native$/,
		}),
  ]
};
