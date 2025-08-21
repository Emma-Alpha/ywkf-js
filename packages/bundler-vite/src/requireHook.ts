// @ts-expect-error 这里不能删除, 不然 ts 声明会有问题 TODO 需要 father 看看

const hookPropertyMap = new Map([
  ['less', '@4399ywkf/bundler-utils/compiled/less'],
]);

const mod = require('module');
const resolveFilename = mod._resolveFilename;

mod._resolveFilename = function (
  request: string,
  parent: any,
  isMain: boolean,
  options: any,
) {
  const hookResolved = hookPropertyMap.get(request);

  if (hookResolved) request = hookResolved;
  return resolveFilename.call(mod, request, parent, isMain, options);
};
