import { run } from '@4399ywkf/js';

run({
  presets: [require.resolve('./preset')],
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
