import React, { useState, useEffect } from 'react';
import { useBookData } from '../hooks/useBookData';
import { getWeekNumber } from '../utils/bookDescriptionGenerator';
import BookCover from './BookCover';
import StarRating from './StarRating';
import ErrorDisplay from './ErrorDisplay';

const BookOfTheWeek = () => {
    const [book, setBook] = useState(null);
    const { loading, error, fetchBookDetails, setError, setLoading } = useBookData();

    // Predefined list of book IDs from Open Library
    const bookIds = [
        'OL27448W', // The Lord of the Rings
        'OL3140822W', // To Kill a Mockingbird
        'OL1168083W', // 1984
        'OL468431W', // The Great Gatsby
        'OL66554W', // Pride and Prejudice
        'OL893415W', // Dune
        'OL27482W', // The Hobbit
        'OL857600W', // The Feast of the Goat
        'OL82931W', // Light in August
        'OL36287W' // The Count of Monte Cristo
    ];

    const fetchWeeklyBook = async () => {
        try {
            const weekNumber = getWeekNumber();
            const bookId = bookIds[weekNumber % bookIds.length];
            const bookData = await fetchBookDetails(bookId);
            setBook(bookData);
        } catch (err) {
            // Error is already handled in the hook
        }
    };

    useEffect(() => {
        fetchWeeklyBook();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="animate-pulse">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-16 rounded-t-2xl -m-6 mb-6"></div>
                            <div className="flex gap-4">
                                <div className="w-24 h-36 bg-gray-200 rounded-lg"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Book of the Week</h2>
                        <ErrorDisplay
                            error={error}
                            onRetry={fetchWeeklyBook}
                            className="text-center"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Don't render if no book data
    if (!book) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Book of the Week</h2>
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex gap-4 mb-4">
                            {/* Book Cover */}
                            <div className="flex-shrink-0">
                                <BookCover
                                    src={book.coverImage}
                                    alt={`Cover of ${book.title}`}
                                />
                            </div>

                            {/* Book Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-indigo-600 font-medium text-sm mb-3">
                                    by {book.author}
                                </p>

                                <StarRating label="Featured" />
                            </div>
                        </div>

                        {/* Description */}
                        {book.description && (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                    {book.description}
                                </p>
                            </div>
                        )}

                        {/* Action Button */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Add to My Books
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookOfTheWeek;