export interface GarfishProvider {
  render: (props: {
    dom: Element;
    basename?: string;
    [key: string]: any;
  }) => void;
  destroy: (props: { dom: Element; [key: string]: any }) => void;
}

declare global {
  interface Window {
    __GARFISH__?: any;
    __GARFISH_EXPORTS__?: {
      props?: Record<string, any>;
      publicPath?: string;
    };
    __UMI_RENDER__?: (options?: any) => any;
  }
}
