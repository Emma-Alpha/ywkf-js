// packages/plugins/libs/garfish/master/getMicroAppRouteComponent.tsx
import React from 'react';
import { MicroApp } from './MicroApp';

interface GetMicroAppRouteComponentOptions {
  appName: string;
  base: string;
  routePath: string;
  routeProps?: Record<string, any>;
}

export function getMicroAppRouteComponent({
  appName,
  base,
  routePath,
  routeProps = {},
}: GetMicroAppRouteComponentOptions) {
  return () => <MicroApp name={appName} basename={base} {...routeProps} />;
}
