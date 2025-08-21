import Config from '@4399ywkf/bundler-webpack/compiled/webpack-5-chain';
import { Env, IConfig } from '../types';

interface IOpts {
  config: Config;
  userConfig: IConfig;
  cwd: string;
  env: Env;
}

export async function addSampleFeature(opts: IOpts) {
  const { config, userConfig, cwd, env } = opts;
  config;
  userConfig;
  cwd;
  env;
}
