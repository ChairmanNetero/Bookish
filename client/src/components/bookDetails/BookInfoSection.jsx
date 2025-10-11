import React from 'react';
import { BookMarked, BookOpen, Check, Loader2 } from 'lucide-react';
import StarRating from '../StarRating';

const BookInfoSection = ({
                             book,
                             averageRating,
                             reviewCount,
                             onRateBookClick,
                             userReview,
                             isInReadingList,
                             onToggleReadingList,
                             readingListLoading
                         }) => {
    return (
        <div className="lg:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {book.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
                by {book.authorName}
            </p>

            {/* Rating Display */}
            <div className="mb-6">
                <StarRating
                    rating={averageRating || 0}
                    maxRating={5}
                    size="w-6 h-6"
                    label={`${(averageRating || 0).toFixed(1)} (${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})`}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={onRateBookClick}
                    disabled={userReview}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        userReview
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                    <BookOpen className="h-5 w-5" />
                    {userReview ? 'Already Reviewed' : 'Rate Book'}
                </button>

                <button
                    onClick={onToggleReadingList}
                    disabled={readingListLoading || userReview}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        userReview
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isInReadingList
                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
                                : 'bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-600'
                    }`}
                >
                    {readingListLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : isInReadingList ? (
                        <Check className="h-5 w-5" />
                    ) : (
                        <BookMarked className="h-5 w-5" />
                    )}
                    {isInReadingList ? 'On Your List' : 'Want to Read'}
                </button>
            </div>

            {userReview && (
                <p className="text-sm text-gray-500 mb-6 italic">
                    You've already reviewed this book. Remove from reviewed books to add to "Want to Read" list.
                </p>
            )}

            {/* Book Details */}
            <div className="space-y-4">
                {book.publicationYear && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                            First Published
                        </h3>
                        <p className="text-gray-600">{book.publicationYear}</p>
                    </div>
                )}

                {book.genres && book.genres.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Genres
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {book.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookInfoSection;