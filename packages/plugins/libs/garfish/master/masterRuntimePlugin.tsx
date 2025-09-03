// @ts-nocheck
/* eslint-disable */

import { getPluginManager } from '@@/core/plugin';
import Garfish from 'garfish';
import { ApplyPluginsType } from 'umi';
import { getMasterOptions, setMasterOptions } from './masterOptions';
import { MasterOptions } from './types';

let garfishInstance: any = null;

async function getMasterRuntime() {
  const config = await getPluginManager().applyPlugins({
    key: 'garfish',
    type: ApplyPluginsType.modify,
    initialValue: {},
    async: true,
  });
  const { master } = config;
  return master || config;
}

export async function render(oldRender: () => void) {
  const runtimeOptions = await getMasterRuntime();
  const masterOptions: MasterOptions = {
    ...getMasterOptions(),
    ...runtimeOptions,
  };

  // 更新 master options
  setMasterOptions(masterOptions);

  const {
    apps = [],
    basename = '/',
    domGetter = '#root-subapp',
    ...options
  } = masterOptions;

  // 主应用相关的配置注册完毕后即可开启渲染
  oldRender();

  // 如果有子应用配置，启动 Garfish
  if (apps.length > 0) {
    try {
      garfishInstance = Garfish.run({
        basename,
        domGetter,
        apps,
        autoRefreshApp: options.autoRefreshApp,
        onNotMatchRouter: options.onNotMatchRouter,
        ...options,
      });
    } catch (error) {
      console.error('[Garfish] Failed to start:', error);
    }
  }
}

export function onRouteChange({ location }: { location: Location }) {
  // Garfish 会自动处理路由变化，这里可以添加额外的逻辑
  if (garfishInstance) {
    // 可以在这里添加路由变化的处理逻辑
  }
}
