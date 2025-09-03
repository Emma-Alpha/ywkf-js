import { ProvidePlugin } from '@4399ywkf/bundler-webpack/compiled/webpack';
import Config from '@4399ywkf/bundler-webpack/compiled/webpack-5-chain';
import { Env, IConfig } from '../types';

interface IOpts {
  config: Config;
  userConfig: IConfig;
  cwd: string;
  env: Env;
}

export async function addNodePolyfill(opts: IOpts) {
  const { config } = opts;
  const nodeLibs = require('node-libs-browser');

  config.plugin('node-polyfill-provider').use(ProvidePlugin, [
    {
      Buffer: ['buffer', 'Buffer'],
      process: nodeLibs['process'],
    },
  ]);

  config.resolve.fallback.merge({
    ...Object.keys(nodeLibs).reduce<Record<string, boolean>>((memo, key) => {
      if (nodeLibs[key]) {
        memo[key] = nodeLibs[key];
      } else {
        memo[key] = false;
      }
      return memo;
    }, {}),
    http: false,
    https: false,
    // 添加对较新 Node.js 内置模块的 fallback
    worker_threads: false,
    async_hooks: false,
    inspector: false,
    pnpapi: false,
    // 添加对可选依赖的 fallback
    '@parcel/css': false,
    'uglify-js': false,
    '@swc/core': false,
    'swc-plugin-auto-css-modules': false,
  });
}
