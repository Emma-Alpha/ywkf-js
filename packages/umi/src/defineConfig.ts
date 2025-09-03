// @ts-ignore
import type { IConfig } from '@4399ywkf/preset-umi';
// @ts-ignore
import { IConfigFromPlugins } from '@@/core/pluginConfig';

type ConfigType = IConfigFromPlugins & IConfig;
/**
 * 通过方法的方式配置umi，能带来更好的 typescript 体验
 * @param  {ConfigType} config
 * @returns ConfigType
 */
export function defineConfig(config: ConfigType): ConfigType {
  return config;
}
