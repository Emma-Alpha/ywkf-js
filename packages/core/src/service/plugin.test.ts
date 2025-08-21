import { Plugin } from './plugin';

test('isPluginOrPreset', () => {
  // true
  expect(Plugin.isPluginOrPreset('preset', '@4399ywkf/preset-foo')).toEqual(
    true,
  );
  expect(Plugin.isPluginOrPreset('plugin', 'umi-plugin-foo')).toEqual(true);
  expect(Plugin.isPluginOrPreset('plugin', '@alipay/umi-plugin-foo')).toEqual(
    true,
  );
  // false
  expect(Plugin.isPluginOrPreset('plugin', 'foo')).toEqual(false);
  expect(Plugin.isPluginOrPreset('plugin', '@4399ywkf/preset-foo')).toEqual(
    false,
  );
});
