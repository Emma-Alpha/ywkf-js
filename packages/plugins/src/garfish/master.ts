import { IApi, RUNTIME_TYPE_FILE_NAME } from '@4399ywkf/js';
import { winPath } from '@4399ywkf/js/plugin-utils';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { withTmpPath } from '../utils/withTmpPath';

export function isMasterEnable(opts: { userConfig: any }) {
  const masterCfg = opts.userConfig.garfish?.master;
  if (masterCfg) {
    return masterCfg.enable !== false;
  }
  return !!process.env.INITIAL_GARFISH_MASTER_OPTIONS;
}

export default (api: IApi) => {
  api.describe({
    key: 'garfish-master',
    enableBy: isMasterEnable,
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'masterRuntimePlugin.tsx' })];
  });

  api.modifyDefaultConfig((config) => ({
    ...config,
    garfish: {
      ...config.garfish,
      master: {
        basename: '/',
        domGetter: '#root-subapp',
        ...JSON.parse(process.env.INITIAL_GARFISH_MASTER_OPTIONS || '{}'),
        ...(config.garfish || {}).master,
      },
    },
  }));

  api.modifyRoutes((memo) => {
    Object.keys(memo).forEach((id) => {
      const route = memo[id];
      if (route.microApp) {
        const appName = route.microApp;
        const base = api.config.base || '/';
        const routeProps = route.microAppProps || {};
        const normalizedRouteProps = JSON.stringify(routeProps).replace(
          /"/g,
          "'",
        );
        route.file = `(async () => {
          const { getMicroAppRouteComponent } = await import('@@/plugin-garfish-master/getMicroAppRouteComponent');
          return getMicroAppRouteComponent({ appName: '${appName}', base: '${base}', routePath: '${route.path}', routeProps: ${normalizedRouteProps} })
        })()`;
      }
    });
    return memo;
  });

  function getFileContent(file: string) {
    return readFileSync(
      join(__dirname, '../../libs/garfish/master', file),
      'utf-8',
    );
  }

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RUNTIME_TYPE_FILE_NAME,
      content: `
export interface GarfishMasterOptions {
  basename?: string;
  domGetter?: string | (() => Element | null);
  apps?: Array<{
    name: string;
    entry: string;
    activeWhen: string | ((location: Location) => boolean);
    props?: Record<string, any>;
  }>;
  autoRefreshApp?: boolean;
  onNotMatchRouter?: (path: string) => void;
}

export interface IRuntimeConfig {
  garfish?: GarfishMasterOptions;
}
      `,
    });

    api.writeTmpFile({
      path: 'masterOptions.ts',
      content: `
let options = ${JSON.stringify({
        basename: api.config.base || '/',
        domGetter: '#root-subapp',
        ...api.config.garfish?.master,
      })};
export const getMasterOptions = () => options;
export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      `,
    });

    // 生成 Garfish 相关运行时文件
    [
      'masterRuntimePlugin.tsx',
      'getMicroAppRouteComponent.tsx',
      'MicroApp.tsx',
      'ErrorBoundary.tsx',
    ].forEach((file) => {
      let content = getFileContent(file);

      if (!api.config.garfish?.externalGarfish) {
        content = content.replace(
          /from 'garfish'/g,
          `from '${winPath(dirname(require.resolve('garfish/package')))}'`,
        );
      }

      api.writeTmpFile({
        path: file,
        content,
      });
    });

    api.writeTmpFile({
      path: 'index.ts',
      content: `
export { MicroApp } from './MicroApp';
      `,
    });
  });
};
