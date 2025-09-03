import type { GarfishProvider } from './types';

let app: any = null;

export const provider: GarfishProvider = {
  render(props) {
    const { dom, basename, ...otherProps } = props;

    // 获取全局的渲染函数
    const renderApp = (window as any).__UMI_RENDER__;
    if (renderApp) {
      // 设置挂载点
      const mountElementId = dom.id || '__GARFISH_MOUNT_ELEMENT_ID__';

      // 调用 Umi 的渲染函数
      app = renderApp({
        mountElementId,
        basename,
        ...otherProps,
      });
    } else {
      console.warn('[Garfish] UMI render function not found');
    }
  },

  destroy(props) {
    if (app && typeof app.unmount === 'function') {
      app.unmount();
      app = null;
    }

    // 清理 DOM
    const { dom } = props;
    if (dom) {
      dom.innerHTML = '';
    }
  },
};

// 独立运行检测
if (!window.__GARFISH__) {
  // 独立运行时的逻辑
  const renderApp = (window as any).__UMI_RENDER__;
  if (renderApp) {
    renderApp();
  }
}
