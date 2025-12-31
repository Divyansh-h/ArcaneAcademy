import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
                    <div className="max-w-md w-full text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="p-4 bg-red-100 rounded-full">
                                <AlertCircle className="h-10 w-10 text-red-600" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900">Something went wrong</h1>
                        <p className="text-zinc-600">
                            We apologize for the inconvenience. An unexpected error occurred.
                        </p>
                        {this.state.error && (
                            <div className="p-4 bg-zinc-100 rounded-lg text-left overflow-auto max-h-48">
                                <p className="text-xs font-mono text-zinc-700">{this.state.error.toString()}</p>
                            </div>
                        )}
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full"
                        >
                            Reload Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
