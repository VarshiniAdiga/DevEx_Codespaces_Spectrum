const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./index.tsx",
    mode: "development",
    context: path.join(__dirname, "client"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: true
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
            filename: "index.html"
        }),
        new webpack.ProvidePlugin({
            process: "process"
        })
    ],
    devServer: {
        port: 3000,
        host: "localhost",
        https: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            "/api": `http://localhost:${process.env.PORT || 9999}`
        }
    }
};
