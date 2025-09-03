import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Garfish MicroApp Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent =
        this.props.fallback ||
        (() => (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Something went wrong</h3>
            <p>{this.state.error?.message}</p>
          </div>
        ));
      return <FallbackComponent error={this.state.error!} />;
    }

    return this.props.children;
  }
}
