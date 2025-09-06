import React from 'react';

const ErrorDisplay = ({
                          error,
                          onRetry,
                          title = "Something went wrong",
                          className = "bg-white rounded-lg border border-gray-200 p-8 h-full flex items-center justify-center"
                      }) => {
    return (
        <div className={className}>
            <div className="text-center text-red-500">
                <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-lg font-medium mb-2">{title}</p>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorDisplay;