/*
 * @Author: lyc
 * @Date: 2020-12-20 12:05:30
 * @LastEditors: lyc
 * @LastEditTime: 2020-12-20 15:03:55
 * @Description: file content
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#C41D7F' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};