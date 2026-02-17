import React from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔥 ERRO GLOBAL CAPTURADO:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="max-w-md w-full text-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <h2 className="text-xl font-semibold text-foreground">
              Ocorreu um erro inesperado
            </h2>
            <p className="text-sm text-muted-foreground">
              Nosso sistema já registrou o problema.
            </p>
            <pre className="text-xs text-destructive bg-muted p-3 rounded overflow-auto max-h-32 text-left">
              {this.state.error?.message || "Erro desconhecido"}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition"
            >
              Recarregar sistema
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
