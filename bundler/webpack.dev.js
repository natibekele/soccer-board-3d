const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const ip = require('internal-ip')
const portFinderSync = require('portfinder-sync')
const path = require('path')

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
	commonConfiguration, 
	{
		mode: 'development',
		devServer: {
			host: 'local-ip',
			port: portFinderSync.getPort(8080),
			static: {
				directory: path.join(__dirname, 'dist')
			},
			watchFiles: ['./dist/*'],
			client: {
				logging: 'info',
				overlay: true,

			},
			hot: false,
			https: false,
			open: true,
			// onAfterSetupMiddleware: function(devServer) {
			// 	const port = devServer.options.port
			// 	const s = devServer.options.https ? 's': ''
			// 	const localIp = ip.v4.sync()
			// 	const ipAddress = `http:${s}://${localIp}/${port}`
			// 	const localhost = `http:${s}://localhost/${port}`

			// 	console.log(`Project running at:\n  - ${infoColor(ipAddress)}\n  - ${infoColor(localhost)}`)
			// }
	}
})