import { IApi } from '@4399ywkf/js';

export default (api: IApi) => {
  api.modifyAppData((memo) => {
    memo.umi.name = 'Umi Max';
    memo.umi.importSource = '@4399ywkf/max';
    memo.umi.cliName = 'max';
    return memo;
  });
};
