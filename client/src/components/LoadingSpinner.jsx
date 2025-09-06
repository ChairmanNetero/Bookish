import React from 'react';

const LoadingSpinner = ({
                            size = "h-16 w-16",
                            color = "border-indigo-500",
                            text = "Loading...",
                            className = "flex justify-center items-center h-64"
                        }) => {
    return (
        <div className={className}>
            <div className="flex flex-col items-center">
                <div className={`animate-spin rounded-full ${size} border-t-2 border-b-2 ${color} mb-4`}></div>
                {text && <p className="text-gray-500">{text}</p>}
            </div>
        </div>
    );
};

export default LoadingSpinner;