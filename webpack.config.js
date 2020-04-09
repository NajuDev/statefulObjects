const path = require('path');

module.exports = (env) => (
    {
        mode: env && env.production ? 'production' : 'development',
        entry: path.resolve(__dirname, 'index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'stateful-object.js',
            library: 'statefulObjects',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    }
)