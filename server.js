const path = require('path')
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./bundler/webpack.dev');
const compiler = webpack(config);

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	})
);

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, './home.html'))
});


app.listen(3000, function() {
	console.log('app running on port 3000')
});




