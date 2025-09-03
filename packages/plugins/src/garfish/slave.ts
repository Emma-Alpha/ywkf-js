import { IApi, RUNTIME_TYPE_FILE_NAME } from '@4399ywkf/js';
import { winPath } from '@4399ywkf/js/plugin-utils';
import assert from 'assert';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { withTmpPath } from '../utils/withTmpPath';

function isSlaveEnable(opts: { userConfig: any }) {
  const slaveCfg = opts.userConfig?.garfish?.slave;
  if (slaveCfg) {
    return slaveCfg.enable !== false;
  }
  return !!process.env.INITIAL_GARFISH_SLAVE_OPTIONS;
}

export default (api: IApi) => {
  api.describe({
    key: 'garfish-slave',
    enableBy: isSlaveEnable,
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'slaveRuntimePlugin.ts' })];
  });

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RUNTIME_TYPE_FILE_NAME,
      content: `
export interface GarfishProvider {
  render: (props: { dom: Element; basename?: string; [key: string]: any }) => void;
  destroy: (props: { dom: Element; [key: string]: any }) => void;
}

export interface IRuntimeConfig {
  garfish?: {
    slave?: {
      enable?: boolean;
      shouldNotModifyRuntimePublicPath?: boolean;
      shouldNotModifyDefaultBase?: boolean;
    };
  };
}
      `,
    });
  });

  api.modifyDefaultConfig((memo) => {
    const initialSlaveOptions = {
      ...JSON.parse(process.env.INITIAL_GARFISH_SLAVE_OPTIONS || '{}'),
      ...(memo.garfish || {}).slave,
    };

    const modifiedDefaultConfig = {
      ...memo,
      runtimePublicPath: true,
      garfish: {
        ...memo.garfish,
        slave: initialSlaveOptions,
      },
    } as any;

    const shouldNotModifyDefaultBase =
      api.userConfig.garfish?.slave?.shouldNotModifyDefaultBase ??
      initialSlaveOptions.shouldNotModifyDefaultBase;
    const historyType = api.userConfig.history?.type || 'browser';

    if (!shouldNotModifyDefaultBase && historyType !== 'hash') {
      modifiedDefaultConfig.base = `/${api.pkg.name}`;
    }

    return modifiedDefaultConfig;
  });

  api.addHTMLHeadScripts(() => {
    const dontModify =
      api.config.garfish?.slave?.shouldNotModifyRuntimePublicPath;
    return dontModify
      ? []
      : [
          `window.publicPath = window.__GARFISH_EXPORTS__?.publicPath || "${
            api.config.publicPath || '/'
          }";`,
        ];
  });

  api.chainWebpack((config) => {
    assert(api.pkg.name, 'You should have name in package.json.');

    // Garfish 需要 UMD 格式输出
    config.output
      .libraryTarget('umd')
      .library(`${api.pkg.name}`)
      .globalObject('window');

    return config;
  });

  // 导出 Garfish provider
  api.addEntryImports(() => {
    return [
      {
        source: '@@/plugin-garfish-slave/provider',
        specifier: '{ provider }',
      },
    ];
  });

  api.addEntryCode(() => [
    `
// 导出 Garfish provider
export { provider };

// 独立运行时的启动逻辑
if (!window.__GARFISH__) {
  render();
}
    `,
  ]);

  function getFileContent(file: string) {
    return readFileSync(
      join(__dirname, '../../libs/garfish/slave', file),
      'utf-8',
    );
  }

  api.onGenerateFiles({
    fn() {
      ['provider.ts', 'slaveRuntimePlugin.ts'].forEach((file) => {
        let content = getFileContent(file);

        if (!api.config.garfish?.externalGarfish) {
          content = content.replace(
            /from 'garfish'/g,
            `from '${winPath(dirname(require.resolve('garfish/package')))}'`,
          );
        }

        api.writeTmpFile({
          path: file,
          content: content.replace(
            '__MOUNT_ELEMENT_ID__',
            api.config.mountElementId,
          ),
        });
      });
    },
  });
};
