import React from 'react';

const StarRating = ({
                        rating = 5,
                        maxRating = 5,
                        size = "w-4 h-4",
                        label = "Featured",
                        className = "flex items-center mb-2"
                    }) => {
    return (
        <div className={className}>
            {[...Array(maxRating)].map((_, i) => (
                <svg
                    key={i}
                    className={`${size} text-yellow-400 fill-current`}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            ))}
            {label && <span className="text-xs text-gray-500 ml-1">{label}</span>}
        </div>
    );
};

export default StarRating;