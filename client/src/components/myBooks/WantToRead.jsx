import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCover from '../BookCover';
import { BookMarked, X } from 'lucide-react';

const WantToRead = ({ readingList, bookDetails, onRemoveClick }) => {
    const navigate = useNavigate();

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    if (readingList.length === 0) {
        return (
            <div className="text-center py-12">
                <BookMarked className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No books on your list yet</p>
                <p className="text-sm text-gray-500 mt-1">
                    Add books you want to read to keep track of them
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {readingList.map((item) => {
                const book = bookDetails[item.bookId] || {};
                return (
                    <div
                        key={item.id}
                        onClick={() => handleBookClick(item.bookId)}
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

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        want to read
                                    </span>
                                    <button
                                        onClick={(e) => onRemoveClick(e, item.bookId)}
                                        className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                                    >
                                        <X className="h-3 w-3" />
                                        remove
                                    </button>
                                </div>

                                {book.description && (
                                    <div className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                                        {book.description}
                                    </div>
                                )}

                                <div className="mt-3 text-xs text-gray-500">
                                    Added on {new Date(item.addedAt).toLocaleDateString('en-US', {
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

export default WantToRead;