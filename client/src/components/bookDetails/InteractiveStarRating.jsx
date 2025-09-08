import React from 'react';

const InteractiveStarRating = ({
                                   rating = 0,
                                   onRatingChange,
                                   maxRating = 5,
                                   size = "text-2xl",
                                   interactive = true,
                                   showCount = false,
                                   count = 0
                               }) => {
    const renderStars = () => {
        return [...Array(maxRating)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={index}
                    className={`${size} cursor-pointer transition-colors duration-200 ${
                        starValue <= rating
                            ? 'text-yellow-400'
                            : interactive
                                ? 'text-gray-300 hover:text-yellow-300'
                                : 'text-gray-300'
                    }`}
                    onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
                >
                    ★
                </span>
            );
        });
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                {renderStars()}
            </div>
            {showCount && (
                <span className="text-gray-500">
                    ({count} {count === 1 ? 'review' : 'reviews'})
                </span>
            )}
        </div>
    );
};

export default InteractiveStarRating;