import { IApi } from '@4399ywkf/js';

export default (api: IApi) => {
  api.modifyConfig((memo) => {
    memo.alias = {
      ...memo.alias,
      '@4399ywkf/max': '@@/exports',
    };
    return memo;
  });
};
