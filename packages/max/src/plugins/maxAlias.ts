import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyConfig((memo) => {
    memo.alias = {
      ...memo.alias,
      '@4399ywkf/max': '@@/exports',
    };
    return memo;
  });
};
