import React, {useState, useEffect} from 'react';
import axios from "axios";

// Create a simple loading spinner component
const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    )
}

// Enhanced BookCard component with larger images and description
const BookCard = ({book}) => {
    // Construct the image URL. Use placeholder image if no cover ID is available
    const coverURL = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : 'https://placehold.co/200x300/png?text=No+Cover';

    // Use a simple, consistent description or book subject
    const getDescription = () => {
        // Use book subject as description if available
        if (book.subject && book.subject.length > 0) {
            const subjects = book.subject.slice(0, 3).join(', ');
            return `A fascinating book exploring themes of ${subjects}.`;
        }

        // Fallback generic descriptions based on book type
        const fallbackDescriptions = [
            "A captivating story that has captured readers' imagination worldwide.",
            "An engaging narrative filled with compelling characters and plot twists.",
            "A thought-provoking work that explores the depths of human experience.",
            "A masterfully crafted tale that resonates with readers of all ages.",
            "An inspiring story that challenges perspectives and touches hearts."
        ];

        // Use title length to deterministically pick a description (consistent for same book)
        const index = (book.title?.length || 0) % fallbackDescriptions.length;
        return fallbackDescriptions[index];
    };

    const description = getDescription();

    return (
        <div className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="p-6">
                {/* Book Cover - Much Larger */}
                <div className="flex justify-center mb-4">
                    <img
                        src={coverURL}
                        alt={`Cover of ${book.title}`}
                        className="w-32 h-48 object-cover rounded-lg shadow-md border-2 border-gray-100"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSA2MEg2NVY5MEgzNVY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K';
                        }}
                    />
                </div>

                {/* Book Info */}
                <div className="text-center mb-4">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm mb-2">
                        {book.author_name ? book.author_name.slice(0, 2).join(', ') : 'Unknown Author'}
                        {book.author_name && book.author_name.length > 2 && ' & others'}
                    </p>
                    {book.first_publish_year && (
                        <p className="text-xs text-gray-500 mb-3">
                            Published: {book.first_publish_year}
                        </p>
                    )}

                    {/* Rating placeholder */}
                    <div className="flex justify-center items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">Trending</span>
                    </div>
                </div>

                {/* Description */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 text-center">
                        {description}
                    </p>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    View Details
                </button>
            </div>
        </div>
    );
};

// Main component to fetch and display trending books
const TrendingNow = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingBooks = async () => {
            try {
                setLoading(true);
                // Use native fetch instead of axios
                const response = await fetch('https://openlibrary.org/trending/daily.json');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Get a deterministic selection based on the current day
                const today = new Date();
                const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
                const availableBooks = data.works || [];
                const selectedBooks = [];

                for (let i = 0; i < Math.min(8, availableBooks.length); i++) {
                    const index = (dayOfYear + i * 7) % availableBooks.length;
                    if (!selectedBooks.find(book => book.key === availableBooks[index].key)) {
                        selectedBooks.push(availableBooks[index]);
                    }
                }

                setBooks(selectedBooks);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch trending books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingBooks();
    }, []);

    if (error) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8 h-full flex items-center justify-center">
                <div className="text-center text-red-500">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">Failed to load trending books</p>
                    <p className="text-sm text-gray-500">Please try again later</p>
                </div>
            </div>
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
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                            <p className="text-gray-500">Loading trending books...</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 hover:scrollbar-thumb-indigo-400 h-full">
                                {books.map((book, index) => (
                                    <BookCard key={book.key || index} book={book} />
                                ))}
                            </div>
                        </div>

                        {/* Scroll indicator */}
                        {books.length > 0 && (
                            <div className="text-center mt-4">
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingNow;