import React from 'react';

const BookCover = ({
                       src,
                       alt,
                       className = "w-24 h-36 object-cover rounded-lg shadow-md border-2 border-gray-100",
                       fallbackIcon = true
                   }) => {
    const fallbackSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSA2MEg2NVY5MEgzNVY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K';

    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={className}
                onError={(e) => {
                    e.target.src = fallbackSvg;
                }}
            />
        );
    }

    if (fallbackIcon) {
        return (
            <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
            </div>
        );
    }

    return (
        <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200`} />
    );
};

export default BookCover;