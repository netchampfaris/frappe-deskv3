const path = require('path')

module.exports = {
  baseUrl: '/deskv3/',
  outputDir: path.resolve('./frappe/www/deskv3'),
  runtimeCompiler: true,
  configureWebpack(config) {
    config.entry.app = ['./desk/src/main.js']
  },
  devServer: {
    allowedHosts: ['frappe.deskv3'],
    proxy: 'http://frappe.deskv3:8001/',
  },
}
