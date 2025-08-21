import { Plugin } from '@4399ywkf/bundler-utils/compiled/esbuild';

export function nodeGlobalsPolyfill(): Plugin {
  return {
    name: 'node-globals-polyfill',
    setup({ initialOptions, onResolve, onLoad }) {
      onResolve;
      onLoad;
      initialOptions.inject ||= [];
    },
  };
}
