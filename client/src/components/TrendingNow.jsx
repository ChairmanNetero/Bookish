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

// Create component to display a single card
const BookCard = ({book}) => {
    // Construct the image URL. Use placeholder image if no cover ID is available
    const coverURL = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://placehold.co/150x220/png?text=No+Cover';

    return (
        <div className="flex-shrink-0 w-72 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="flex items-start space-x-4 p-4">
                <img
                    src={coverURL}
                    alt={`Cover of ${book.title}`}
                    className="w-16 h-24 object-cover rounded shadow-sm"
                    onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSA2MEg2NVY5MEgzNVY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K';
                    }}
                />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-sm text-indigo-600 mb-2">
                        {book.author_name ? book.author_name.slice(0, 2).join(', ') : 'Unknown Author'}
                        {book.author_name && book.author_name.length > 2 && ' & others'}
                    </p>
                    {book.first_publish_year && (
                        <p className="text-xs text-gray-500">
                            Published: {book.first_publish_year}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main component to fetch and display trending books
const TrendingNow = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://openlibrary.org/trending/daily.json');
                const data = response.data;
                // The API returns a list of works. We'll shuffle them and pick the first 8.
                const shuffledBooks = data.works.sort(() => 0.5 - Math.random());
                setBooks(shuffledBooks.slice(0, 8)); // Get a random selection of 8 books
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
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        Trending Now
                        <span className="text-orange-500">🔥</span>
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
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 hover:scrollbar-thumb-indigo-400 h-full">
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