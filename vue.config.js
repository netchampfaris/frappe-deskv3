const path = require('path')
const fs = require('fs')
const sites_path = path.resolve('../../sites');
const common_site_config = require('../../sites/common_site_config.json');
const sites = fs.readdirSync(sites_path).filter(
  folder_name => !['.build', 'apps.txt', 'assets', 'common_site_config', 'currentsite'].includes(folder_name));

module.exports = {
  publicPath: '/desk-beta/',
  outputDir: path.resolve('./frappe/www/desk-beta'),
  runtimeCompiler: true,
  configureWebpack(config) {
    config.entry.app = ['./desk/src/main.js']
  },
  devServer: {
    allowedHosts: sites,
    proxy: {
      '^/api': {
        target: 'http://localhost:8004',
        ws: true,
        changeOrigin: true,
        router: function (req) {
          const site_name = req.headers.host.split(':')[0];
          return `http://${site_name}:${common_site_config.webserver_port}`;
        }
      },
    }
  },
}