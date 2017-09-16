
module.exports = {
    context: __dirname + "/src",
    entry: "./init.tsx",
    output: {
        path: __dirname + "/dist",
        filename: 'app.bundle.js'
    },
    module: {
      loaders: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
    },
    resolve: {
      extensions:[".ts", ".tsx", ".js", ".jsx"],
      modules: [
        "./src",
        "node_modules"
      ]
    },
    devtool: 'source-map',
    devServer: {
      hot: true
    }
}