import * as generator from '@4399ywkf/bundler-utils/compiled/babel/generator';
import * as t from '@4399ywkf/bundler-utils/compiled/babel/types';

export function generate(ast: t.File): string {
  return generator.default(ast, {
    retainLines: true,
    sourceMaps: false,
    decoratorsBeforeExport: true,
    jsescOption: { minimal: true },
  }).code;
}
