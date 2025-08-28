import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BookOfTheWeek = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get week number to ensure same book shows for the entire week
    const getWeekNumber = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek);
    };

    // A predefined list of books IDs from Open Library
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

    // Fetching the data using axios
    const fetchBook = async () => {
        try {
            setLoading(true);
            setError(null);

            const weekNumber = getWeekNumber();

            // Determine which book to feature this week
            const bookId = bookIds[weekNumber % bookIds.length];

            // Fetch book details from Open Library
            const bookResponse = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
            const bookData = bookResponse.data;
            console.log(bookData);

            // Fetch author data
            let authorName = "Unknown Author";
            if (bookData.authors && bookData.authors.length > 0) {
                try {
                    const authorKey = bookData.authors[0].author.key;
                    const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                    authorName = authorResponse.data.name;
                    console.log(authorName);
                } catch (authorError) {
                    console.warn('Could not fetch author data:', authorError);
                }
            }

            // Fetch the description (without external links)
            const fullDescription = bookData.description;

            const separator = '--';
            const endIndex = fullDescription.indexOf(separator);
            const description = fullDescription.slice(0, endIndex);

            // Get cover image - need to get the cover ID from the book data
            let coverImage = null;
            if (bookData.covers && bookData.covers.length > 0) {
                coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[1]}-L.jpg`;
            }

            // Construct the book object
            const bookInfo = {
                title: bookData.title,
                author: authorName,
                description: description,
                coverImage: coverImage

            }

            setBook(bookInfo);
            console.log(bookInfo);

        } catch (err) {
            console.error('Error fetching book data', err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBook();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div>
                <h2>Loading Book of the Week...</h2>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div>
                <h2>Book of the Week</h2>
                <p>{error}</p>
                <button onClick={fetchBook}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md">
                <div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Book of the Week</h2>
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex gap-4 mb-4">
                            {/* Book Cover */}
                            <div className="flex-shrink-0">
                                {book?.coverImage ? (
                                    <img
                                        src={book.coverImage}
                                        alt={`Cover of ${book.title}`}
                                        className="w-24 h-36 object-cover rounded-lg shadow-md border-2 border-gray-100"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSA2MEg2NVY5MEgzNVY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K';
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="w-24 h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-md border-2 border-gray-100 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Book Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 line-clamp-2">
                                    {book?.title}
                                </h3>
                                <p className="text-indigo-600 font-medium text-sm mb-3">
                                    by {book?.author}
                                </p>

                                {/* Rating placeholder */}
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">Featured</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {book?.description && (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                    {book.description}
                                </p>
                            </div>
                        )}

                        {/* Action Button */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <button
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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