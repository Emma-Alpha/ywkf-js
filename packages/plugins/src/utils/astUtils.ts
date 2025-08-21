import * as Babel from '@4399ywkf/bundler-utils/compiled/babel/core';
import * as t from '@4399ywkf/bundler-utils/compiled/babel/types';

export function getIdentifierDeclaration(node: t.Node, path: Babel.NodePath) {
  if (t.isIdentifier(node) && path.scope.hasBinding(node.name)) {
    let bindingNode = path.scope.getBinding(node.name)!.path.node;
    if (t.isVariableDeclarator(bindingNode)) {
      bindingNode = bindingNode.init!;
    }
    return bindingNode;
  }
  return node;
}
