import Dotenv from "dotenv-webpack"
import path from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"

export default {
  // Define the entry points of our application (can be multiple for different sections of a website)
  entry: {
    main: "./src/js/main.js",
  },

  // Define the destination directory and filenames of compiled resources
  output: {
    filename: "js/[name].js",
    path: path.resolve(process.cwd(), "./docs"),
  },

  // Define development options
  devtool: "source-map",

  // Define loaders
  module: {
    rules: [
      // Use babel for JS files
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              url: false,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                ]
              }
            }
          },
          "sass-loader"
        ],
      },
      // File loader for images
      {
        test: /\.(jpg|jpeg|png|git|svg)$/i,
        type: "asset/resource",
      },
      // Handlebars loader
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },

  // Define used plugins
  plugins: [
    // Load .env file for environment variables in JS
    new Dotenv({
      path: "./.env"
    }),

    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),

    // Copy images to the public folder
    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
        }
      ]
    }),

    // Inject styles and scripts into the HTML
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), "./src/pages/index.hbs"),
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(process.cwd(), "./src/pages/about.hbs"),
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      filename: 'portfolio.html',
      template: path.resolve(process.cwd(), "./src/pages/portfolio.hbs"),
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: path.resolve(process.cwd(), "./src/pages/contact.hbs"),
      chunks: ['main']
    }),
  ],

  // Configure the "webpack-dev-server" plugin
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), "docs")
    },
    watchFiles: [
      path.resolve(process.cwd(), "./src/pages/*.hbs"),
    ],
    compress: true,
    port: process.env.PORT || 9090,
    hot: true,
  },

  // Performance configuration
  performance: {
    hints: false
  }
};
