// @ts-nocheck

export function render(oldRender: any) {
  // 将渲染函数暴露到全局，供 provider 使用
  (window as any).__UMI_RENDER__ = oldRender;

  // 如果不在 Garfish 环境中，直接渲染
  if (!window.__GARFISH__) {
    return oldRender();
  }

  // 在 Garfish 环境中，等待 provider 调用
  return Promise.resolve();
}

export function modifyClientRenderOpts(memo: any) {
  // 从 Garfish 环境中获取配置
  const garfishProps = window.__GARFISH_EXPORTS__?.props || {};
  const { basename } = garfishProps;

  if (basename && basename !== memo.basename) {
    return {
      ...memo,
      basename,
    };
  }

  return memo;
}
