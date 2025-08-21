import { Service } from '@4399ywkf/js';

export async function getDevConfig() {
  const service = new Service({
    presets: [require.resolve('./workerPreset')],
  });

  const opts: any = await service.run({
    name: 'dev-config',
    args: [],
  });

  return opts;
}
