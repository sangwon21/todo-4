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
        {
          test: /\.(ts|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
            },
          ],
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
