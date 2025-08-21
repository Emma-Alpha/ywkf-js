import { defineConfig } from "umi";

export default defineConfig({
  npmClient: '{{{ npmClient }}}',
  presets: [require.resolve('@4399ywkf/preset-vue')],
});
