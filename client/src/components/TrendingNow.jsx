import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookData } from '../hooks/useBookData';
import { formatAuthors, getCoverImageUrl } from '../utils/bookDescriptionGenerator';
import BookCover from './BookCover';
import StarRating from './StarRating';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

// Enhanced BookCard component
const BookCard = ({ book, onViewDetails }) => {
    const coverURL = getCoverImageUrl(book.cover_i);
    const authorText = formatAuthors(book.author_name);

    return (
        <div className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
            <div className="p-6 h-full flex flex-col">
                {/* Book Cover - Much Larger */}
                <div className="flex justify-center mb-4">
                    <BookCover
                        src={coverURL}
                        alt={`Cover of ${book.title}`}
                        className="w-32 h-48 object-cover rounded-lg shadow-md border-2 border-gray-100"
                    />
                </div>

                {/* Book Info - flex-grow to push button to bottom */}
                <div className="text-center mb-4 flex-grow">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm mb-2">
                        {authorText}
                    </p>
                    {book.first_publish_year && (
                        <p className="text-xs text-gray-500 mb-3">
                            Published: {book.first_publish_year}
                        </p>
                    )}

                    <StarRating
                        label="Trending"
                        className="flex justify-center items-center"
                    />
                </div>

                {/* Action Button - stays at bottom */}
                <button
                    onClick={() => onViewDetails(book)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    View Details
                </button>
            </div>
        </div>
    );
};

// Main component to fetch and display trending books
const TrendingNow = () => {
    const [books, setBooks] = useState([]);
    const { loading, error, fetchTrendingBooks } = useBookData();
    const navigate = useNavigate();

    const loadTrendingBooks = async () => {
        try {
            const trendingBooks = await fetchTrendingBooks();
            setBooks(trendingBooks);
        } catch (err) {
            // Error is already handled in the hook
        }
    };

    const handleViewDetails = (book) => {
        // Extract book ID from the key (e.g., "/works/OL45804W" -> "OL45804W")
        const bookId = book.key ? book.key.split('/').pop() : null;

        if (bookId) {
            // Navigate to book details page with the book ID
            navigate(`/books/${bookId}`, {
                state: {
                    bookData: book
                }
            });
        } else {
            console.error('No valid book ID found');
        }
    };

    useEffect(() => {
        loadTrendingBooks();
    }, []);

    if (error) {
        return (
            <ErrorDisplay
                error={error}
                title="Failed to load trending books"
                onRetry={loadTrendingBooks}
            />
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xl">🔥</span>
                        </div>
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Trending Now
            </span>
                    </h2>
                </div>

                {loading ? (
                    <LoadingSpinner
                        text="Loading trending books..."
                        className="flex-1 flex items-center justify-center"
                    />
                ) : (
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 hover:scrollbar-thumb-indigo-400 h-full">
                                {books.map((book, index) => (
                                    <BookCard
                                        key={book.key || index}
                                        book={book}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingNow;