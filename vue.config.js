const path = require('path');

module.exports = {
    baseUrl: '/deskv3/',
    outputDir: path.resolve('./frappe/www/deskv3'),
    configureWebpack(config) {
        config.entry.app = ['./desk/src/main.js']
    },
    devServer: {
        allowedHosts: ['frappe.local'],
        proxy: 'http://frappe.local:8000'
    }
}