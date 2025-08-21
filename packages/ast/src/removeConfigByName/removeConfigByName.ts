import * as traverse from '@4399ywkf/bundler-utils/compiled/babel/traverse';
import * as t from '@4399ywkf/bundler-utils/compiled/babel/types';

export function removeConfigByName(ast: t.File, name: string) {
  traverse.default(ast, {
    enter(path) {
      if (t.isIdentifier(path.node, { name })) {
        path?.parentPath?.remove();
      }
    },
  });
  return ast;
}
