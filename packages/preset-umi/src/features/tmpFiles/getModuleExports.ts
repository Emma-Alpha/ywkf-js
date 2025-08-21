import { parseModule } from '@4399ywkf/bundler-utils';
import { chalk } from '@4399ywkf/utils';
import { readFileSync } from 'fs';

export async function getModuleExports(opts: {
  file: string;
}): Promise<readonly string[]> {
  const { file } = opts;
  const content = readFileSync(file, 'utf-8');
  try {
    const [_, exports] = await parseModule({ content, path: file });
    return exports || [];
  } catch (e) {
    console.log(
      `Parse file ${chalk.red(
        file,
      )} exports error, please check this file esm format.`,
    );
    // do not kill process
    return [];
  }
}
