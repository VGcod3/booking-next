'use client'
import React, { ReactNode, Component } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ''
        };
    }

    componentDidCatch(error: Error) {
        // Update state to indicate that an error has occurred
        this.setState({ hasError: true, errorMessage: error.message });

        // You can also log the error or send it to an error tracking service
        console.error(error);
    }

    render() {
        if (this.state.hasError) {
            // Render an error message or a fallback UI
            // return <div>Something went wrong.</div>;
            return (
                <h2 className="text-danger text-center">{this.state.errorMessage}</h2>
            );
        }

        // Render the children components as usual
        return this.props.children;
    }
}


export default ErrorBoundary;
