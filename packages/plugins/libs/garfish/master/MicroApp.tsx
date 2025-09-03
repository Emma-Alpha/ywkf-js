import Garfish from 'garfish';
import React, { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface MicroAppProps {
  name: string;
  entry?: string;
  basename?: string;
  loading?: React.ComponentType;
  errorBoundary?: React.ComponentType<{ error: Error }>;
  [key: string]: any;
}

export const MicroApp: React.FC<MicroAppProps> = ({
  name,
  entry,
  basename,
  loading: Loading,
  errorBoundary,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadApp = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (entry) {
          // 动态加载应用
          appRef.current = await Garfish.loadApp(name, {
            entry,
            domGetter: containerRef.current!,
            basename,
            ...props,
          });
        } else {
          // 使用已注册的应用
          const registeredApp = Garfish.apps[name];
          if (registeredApp) {
            appRef.current = registeredApp;
            await appRef.current.mount({
              domGetter: containerRef.current!,
              basename,
              ...props,
            });
          } else {
            throw new Error(`App ${name} not found`);
          }
        }

        if (appRef.current && !appRef.current.mounted) {
          await appRef.current.mount();
        }

        setIsLoading(false);
      } catch (err) {
        console.error(`Failed to load micro app ${name}:`, err);
        setError(err as Error);
        setIsLoading(false);
      }
    };

    loadApp();

    return () => {
      if (appRef.current && appRef.current.mounted) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, [name, entry, basename]);

  if (error) {
    const ErrorComponent =
      errorBoundary || (() => <div>Failed to load {name}</div>);
    return <ErrorComponent error={error} />;
  }

  return (
    <ErrorBoundary fallback={errorBoundary}>
      {isLoading && Loading && <Loading />}
      <div
        ref={containerRef}
        id={`garfish-${name}`}
        style={{ width: '100%', height: '100%' }}
      />
    </ErrorBoundary>
  );
};
