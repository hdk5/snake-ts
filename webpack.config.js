const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: [
        "./src/app.ts"
    ],
    module: {
        rules: [
            {
                test: /\.mp3$/,
                include: [
                    path.resolve(__dirname, "src/soundmap/")
                ],
                use: 'base64-inline-loader'
            },
            {
                test: /\.png$/,
                include: [
                    path.resolve(__dirname, "src/tilemap/")
                ],
                use: 'base64-inline-loader'
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]

};
