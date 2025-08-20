import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BookOfTheWeek = () => {
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState('');

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
        'OL468431W',   // The Great Gatsby
        'OL66554W', // Pride and Prejudice
        'OL893415W', // Dune
        'OL27482W',   // The Hobbit
        'OL857600W', // The Feast of the Goat
        'OL82931W',// Light in August
        'OL36287W'  // The Count of Monte Cristo
    ];

    // Fetching the data using axios
    useEffect(() => {
        const fetchBookdata = async () => {
            try{
                const weekNumber = getWeekNumber();

                // Determine which book to feature this week
                const bookId = bookIds[weekNumber % bookIds.length];

                // Fetch book details from Open Library
                const bookResponse = await axios.get(`https://openlibrary.org/works/${bookId}.json`)
                const bookData = bookResponse.data;
                console.log(bookData);

                // Fetch author data
                if(bookData.authors && bookData.authors.length > 0){
                    const authorKey = bookData.authors[0].author.key;
                    const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                    setAuthor(authorResponse.data.name);
                }

                // set the book data in a state
                setBook(bookData);
            } catch(err){
                console.error('Error fetching book data',err);
            }
        }
        fetchBookdata();
    }, []);

    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-20 font-sans">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
                    Book of the Week
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
                    Our special feature for this week. Dive in!
                </p>
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden md:flex">
                    {/* Book Cover */}
                    <div className="md:w-1/3">
                        {book.covers && book.covers.length > 0 ? (
                            <img
                                className="w-full h-full object-cover"
                                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                                alt={`Cover of ${book.title}`}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x1200/e2e8f0/334155?text=No+Cover'; }}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Cover Available</span>
                            </div>
                        )}
                    </div>

                    {/* Book Details */}
                    <div className="p-8 md:p-10 md:w-2/3 flex flex-col justify-between">
                        <div>
                            <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wider">
                                Featured Read
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
                                {book.title}
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                                by {author || 'Unknown Author'}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-6">
                                {description.split('\n')[0]} {/* Show first paragraph or snippet */}
                            </p>
                        </div>
                        <a
                            href={`https://openlibrary.org${book.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 self-start"
                        >
                            Learn More on Open Library
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookOfTheWeek;