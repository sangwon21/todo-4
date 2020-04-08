const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const config = {
    entry: "./src/index.ts",

    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        // we use babel-loader to load our jsx and tsx files
        {
          test: /\.(ts|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },

        // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };

  if (options.mode === "development") {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: "Development",
        showErrors: true,
      }),
    ];

    config.devtool = "inline-source-map";

    config.devServer = {
      hot: true,
      contentBase: path.resolve(__dirname, "dist"),
      stats: {
        color: true,
      },
    };
  } else {
    config.plugins = [new CleanWebpackPlugin(["dist"])];
  }

  return config;
};
