import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCover from '../BookCover';
import StarRating from '../StarRating';
import { BookOpen } from 'lucide-react';

const ReadBooks = ({ reviews, bookDetails, onEditClick }) => {
    const navigate = useNavigate();

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const truncateText = (text, maxLength = 200) => {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No books read yet</p>
                <p className="text-sm text-gray-500 mt-1">
                    Books you review will appear here
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => {
                const book = bookDetails[review.bookId] || {};
                return (
                    <div
                        key={review.id}
                        onClick={() => handleBookClick(review.bookId)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-200"
                    >
                        <div className="flex p-4 gap-4">
                            <div className="flex-shrink-0">
                                <BookCover
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-20 h-28 object-cover rounded shadow-sm"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="mb-2">
                                    <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors mb-1">
                                        {book.title || 'Loading...'}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {book.author || 'Loading...'}
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <StarRating
                                        rating={review.rating}
                                        maxRating={5}
                                        size="w-5 h-5"
                                        label=""
                                        className="flex items-center gap-1"
                                    />
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        read
                                    </span>
                                    <button
                                        onClick={(e) => onEditClick(e, review.id)}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        [edit]
                                    </button>
                                </div>

                                {review.content && (
                                    <div className="text-sm text-gray-700 leading-relaxed">
                                        <p>{truncateText(review.content)}</p>
                                        {review.content.length > 200 && (
                                            <button className="text-indigo-600 hover:text-indigo-800 font-medium mt-1">
                                                ...more
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="mt-3 text-xs text-gray-500">
                                    Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReadBooks;