module.exports = {
  entry: __dirname + "/jobProducer.js",
  target: 'node',
  output: {
    path: __dirname + "/public",
    filename: "jobProducerBundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
