import React, { useState, useEffect } from 'react';

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

// Component to display a single book card
const BookCard = ({ book }) => {
    // Construct the image URL. Use a placeholder if no cover ID is available.
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150x220.png?text=No+Cover';

    return (
        <div className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <img
                src={coverUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-64 object-cover rounded-t-lg"
                loading="lazy"
            />
            <div className="p-4">
                <h3 className="font-bold text-md truncate" title={book.title}>
                    {book.title}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                    {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                </p>
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
                const response = await fetch('https://openlibrary.org/trending/daily.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // The API returns a list of works. We'll shuffle them and pick the first 5.
                const shuffledBooks = data.works.sort(() => 0.5 - Math.random());
                setBooks(shuffledBooks.slice(0, 5)); // Get a random selection of 5 books

            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch trending books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingBooks();
    }, []); // The empty dependency array ensures this effect runs only once on mount

    if (error) {
        return <div className="text-center py-10 text-red-500">Failed to load trending books. Please try again later.</div>;
    }

    return (
        <section className="bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                    Trending Now 🔥
                </h2>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                        {books.map((book) => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrendingNow;