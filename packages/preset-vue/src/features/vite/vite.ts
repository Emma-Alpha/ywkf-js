import type { IApi } from '@4399ywkf/js';
// @ts-ignore
import vuePlugin from '../../../compiled/@vitejs/plugin-vue';

export default (api: IApi) => {
  api.describe({
    key: 'preset-vue:vite',
  });

  api.modifyViteConfig((config) => {
    config.plugins?.push(vuePlugin(api.config.vue));
    return config;
  });
};
