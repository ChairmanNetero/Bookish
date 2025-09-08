import React, { useState } from 'react';
import InteractiveStarRating from './InteractiveStarRating';

const BookInfoSection = ({
                             book,
                             averageRating,
                             reviewCount,
                             onRateBookClick,
                             userReview
                         }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const truncatedDescription = book.description && book.description.length > 300
        ? book.description.substring(0, 300) + "..."
        : book.description;

    return (
        <div className="lg:w-2/3 p-8">
            {/* Title and Author */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                    by <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        {book.authorName}
                    </span>
                </p>
            </div>

            {/* Rating Display */}
            {reviewCount > 0 && (
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <InteractiveStarRating
                            rating={Math.round(averageRating)}
                            interactive={false}
                            showCount={true}
                            count={reviewCount}
                        />
                        <span className="text-lg font-semibold text-gray-700">
                            {averageRating}
                        </span>
                    </div>
                </div>
            )}

            {/* Description */}
            <div className="mb-8">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {showFullDescription ? book.description : truncatedDescription}
                </div>
                {book.description && book.description.length > 300 && (
                    <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-3 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                        {showFullDescription ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>

            {/* Publication Year */}
            {book.publicationYear && (
                <div className="mb-6">
                    <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                        First Published
                    </span>
                    <p className="text-lg text-gray-800 font-medium">{book.publicationYear}</p>
                </div>
            )}

            {/* Genres */}
            {book.genres && book.genres.length > 0 && (
                <div className="mb-8">
                    <span className="text-sm text-gray-500 uppercase tracking-wide font-medium block mb-3">
                        Genres
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {book.genres.map((genre, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                    Want to Read
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                    Add to Shelf
                </button>
                <button
                    onClick={onRateBookClick}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    {userReview ? 'Already Reviewed' : 'Rate this book'}
                </button>
            </div>
        </div>
    );
};

export default BookInfoSection;