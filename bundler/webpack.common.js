const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const path = require('path');
const fs = require('fs');

// need to add new pages to this array
const pages = ['home', 'about'] 

/* TODO 
	create an automated function that recognizes
	and bundles new pages automatically
*/


module.exports = {
	entry: pages.reduce((config, page) => {
		config[page] = path.resolve(__dirname,`../pages/${page}/${page}.js`)
		return config
	}, {}),
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	devtool: 'source-map',
	plugins: [].concat(
		pages.map(
			(page) => 
				new CopyWebpackPlugin({
					patterns: [
						{ from: path.resolve(__dirname, `../pages/${page}/static`)}
					]
				})
		),
		pages.map(
			(page) => 
				new HtmlWebpackPlugin({
					template: path.resolve(__dirname, `../pages/${page}/${page}.html`),
					filename: `${page}.html`,
					minify: true
				})
		),
		pages.map(
			(page) =>
				new MiniCSSExtractPlugin() 
		),
	),
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	module: {
		rules: [

			// HTML
			{
				test: /\.(html)$/,
				use: [ 'html-loader']
			},

			// JS
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},

			// CSS
			{
				test: /\.css$/,
				use: [
					MiniCSSExtractPlugin.loader,
					'css-loader'
				]
			},

			// IMAGES 
			{
				test: /\.(jpg|png|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/images'
						}
					}
				]
			},

			//FONTS

			{
				test: /\.(woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/fonts'
						}
					}
				]
			},

			// GLSL

			{
				test: /\.(glsl|frag|vert|fs|vs)$/,
				exclude: /node_modules/,
				use: ['raw-loader']
			}
		]
	}
}