import Config from '@4399ywkf/bundler-webpack/compiled/webpack-5-chain';
import WebpackBar from '../../compiled/webpackbar';
import ProgressPlugin from '../plugins/ProgressPlugin';
import { Env, IConfig } from '../types';

interface IOpts {
  name?: string;
  config: Config;
  userConfig: IConfig;
  cwd: string;
  env: Env;
}

export async function addProgressPlugin(opts: IOpts) {
  const { config, name, env } = opts;
  if (env === Env.production) {
    config.plugin('progress-plugin').use(WebpackBar, [
      {
        name: name || 'webpack',
      },
    ]);
  } else {
    config.plugin('progress-plugin-dev').use(ProgressPlugin);
  }
}
