export interface MasterOptions {
  basename?: string;
  domGetter?: string | (() => Element | null);
  apps?: Array<{
    name: string;
    entry: string;
    activeWhen: string | ((location: Location) => boolean);
    props?: Record<string, any>;
  }>;
  autoRefreshApp?: boolean;
  onNotMatchRouter?: (path: string) => void;
  [key: string]: any;
}
