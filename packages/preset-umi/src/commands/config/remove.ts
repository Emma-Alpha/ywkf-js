import { generate, getASTByFilePath, removeConfigByName } from '@4399ywkf/ast';
import { writeFileSync } from 'fs';

export function remove(mainConfigFile: string, name: string) {
  const ast = getASTByFilePath(mainConfigFile);
  if (!ast) return;
  const generateCode = generate(removeConfigByName(ast, name));
  // perf: lazy import
  const prettier = require('@4399ywkf/utils/compiled/prettier');
  const printStr = prettier.format(generateCode, {
    parser: 'typescript',
  });
  writeFileSync(mainConfigFile, printStr, 'utf-8');
  console.log(`remove config:${name} on ${mainConfigFile}`);
}
