import { IApi } from '@4399ywkf/js';
import { winPath } from '@4399ywkf/utils';
import { dirname } from 'path';

// TODO:
// - generator
// - builtinStore
// - lint

export default (api: IApi) => {
  api.describe({
    key: 'valtio',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
    enableBy: api.EnableBy.config,
  });

  const libPath = winPath(
    dirname(require.resolve('@4399ywkf/valtio/package.json')),
  );

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: 'index.ts',
      content: `
export {
  proxy,
  useSnapshot,
  snapshot,
  subscribe,
  subscribeKey,
  proxyWithComputed,
  proxyWithHistory,
  proxyWithDevtools,
  proxyMap,
  proxySet,
  derive,
  underive,
  useProxy,
} from '${libPath}';
      `,
    });
  });

  api.modifyConfig((memo) => {
    memo.alias = {
      ...memo.alias,
      '@4399ywkf/valtio': libPath,
    };
    return memo;
  });
};
