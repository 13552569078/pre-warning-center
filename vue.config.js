/* eslint-disable */
// const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const GlobalApi = require(path.resolve(__dirname, "src/common/global-api-params.ts"));

module.exports = {
  publicPath: isProduction ? `/${process.env.PROD_PREFIX}` : '/',
  outputDir: 'dist',
  assetsDir: './static',
  transpileDependencies: ['@vue/reactivity'],
  parallel: false,
  pages: {
    index: {
      entry: 'src/main',
      template: 'public/index.html',
      filename: 'index.html',
      title: process.env.TITLE_CENTRE_CONFIG
    }
  },
  lintOnSave: !isProduction ? 'error' : false,
  productionSourceMap: !isProduction,
  devServer: {
    host: '127.0.0.1',
    port: 8345,
    https: false,
    open: true,
    client: {
      // webpack promise异常处理
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '127.0.0.1'
    },
    proxy: {
      '/ucenterProxyApis': {
        target: 'https://www.jczhdev.etcc.group/swan-gateway-warning/swan-ucenter/',
        changeOrigin: true,
        pathRewrite: {
          '^/ucenterProxyApis': ''
        }
      },
      '/proxyApis': {
        // target: 'https://www.jczhdev.etcc.group/swan-gateway-warning/swan-pre-warning-web',
        // target: 'http://10.255.144.181/swan-gateway-warning/swan-pre-warning-web',
        target: 'http://10.253.200.46:8580/swan-gateway-warning/swan-pre-warning-web',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApis': ''
        }
      }
    }
  },
  css: {
    extract: !!isProduction,
    sourceMap: !isProduction
  },
  configureWebpack: () => {
    let baseConfig = {};
    baseConfig = {
      module: {
        rules: [
          {
            test: /\.(ts|js)$/,
            loader: require.resolve(path.resolve(__dirname, 'build/import.loader'))
          }
        ]
      },
      resolve: {
        // 第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main'],
        alias: {
          'normalize-wheel-es': 'normalize-wheel-es/dist/index.mjs',
          'async-validator': 'async-validator/dist-web/index.js',
          '@apis': path.resolve(__dirname, 'src/apis'),
          '@common': path.resolve(__dirname, 'src/common'),
          '@image': path.resolve(__dirname, 'src/assets/image'),
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@vuex': path.resolve(__dirname, 'src/vuex')
        },
        fallback: {
          fs: false,
          path: false
        }
      },
      plugins: [
        require('unplugin-vue-define-options/webpack')(),
        require('unplugin-vue-components/webpack')({
          resolvers: [
            name => {
              if (name.startsWith('Hl')) {
                return { importName: name, path: 'hongluan-ui' };
              }
            },
            name => {
              if (name.startsWith('Hb')) {
                return { importName: name, path: 'hongluan-business-ui' };
              }
            },
            name => {
              if (name.startsWith('Two') || name.startsWith('Fill') || name.startsWith('File')) return { importName: name, path: '@hongluan-ui/icons' };
            },
            name => {
              if (name.startsWith('Fx')) {
                return { importName: name, path: 'fx-front-framework' };
              }
            }
          ]
        })
      ]
    };
    if (isProduction) {
      // 为生产环境修改配置...
      const newPlugins = [
        // 压缩代码
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // true 不删除源文件 false 删除源文件
        })
      ];
      baseConfig.plugins.push(...newPlugins);
    }
    // 为开发环境修改配置...
    const newPlugins = [];
    baseConfig.plugins.push(...newPlugins);
    return baseConfig;
  },
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      GlobalApi.globalAPIParamsList.forEach(paramKey => {
        args[0]["process.env"][paramKey] = JSON.stringify(process.env[paramKey]);
      })
      return args;
    })
  }
};
