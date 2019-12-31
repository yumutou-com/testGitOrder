import path, { resolve } from 'path';
import webpackPlugin from './plugin.config';
import pageRoutes from './router.config';
import proxy from './proxy.config';
import themeConfig from './theme.config';

const appConfigPath = path.join(__dirname, '../public/app.config.json');
const pkg = path.join(__dirname, '../package.json');
const { base } = require(appConfigPath);
const { name } = require(pkg);

resolve(__dirname, './src');

export default {
  history: 'hash',
  treeShaking: true,
  ignoreMomentLocale: true,
  targets: { ie: 11 },
  base: `${base}/`,
  publicPath: './',
  mountElementId: name,
  plugins: [
    ['@umijs/plugin-qiankun'],
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loader',
        },
        title: '应用的标题',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
          exclude: ['@umijs/plugin-qiankun'],
        },
        pwa:
          process.env.NODE_ENV === 'production'
            ? {
              workboxPluginMode: 'InjectManifest',
              workboxOptions: {
                importWorkboxFrom: 'local',
              },
            }
            : false,
        locale: {
          enable: true,
          default: 'zh-CN',
          baseNavigator: false,
          antd: true,
        },
      },
    ],
  ],
  routes: pageRoutes,
  proxy,
  theme: themeConfig(),
  alias: {
    '@': resolve(__dirname, './src'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    utils: resolve(__dirname, './src/utils'),
    themes: resolve(__dirname, './src/themes'),
    services: resolve(__dirname, './src/services'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    [
      'import',
      {
        libraryName: 'seid',
        libraryDirectory: 'es',
        style: true,
      },
      'seid',
    ],
  ],
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
};
