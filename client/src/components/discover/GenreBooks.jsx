import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner.jsx';
import ErrorDisplay from '../ErrorDisplay.jsx';

const GenreBooks = () => {
    const { genre } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Genre-specific book lists with OpenLibrary IDs
    const genreBooks = {
        'romance': [
            { id: 'OL66554W', title: 'Pride and Prejudice', author: 'Jane Austen' },
            { id: 'OL1095427W', title: 'Jane Eyre', author: 'Charlotte Brontë' },
            { id: 'OL21177W', title: 'Wuthering Heights', author: 'Emily Brontë' },
            { id: 'OL262758W', title: 'The Notebook', author: 'Nicholas Sparks' },
            { id: 'OL3261155W', title: 'Outlander', author: 'Diana Gabaldon' },
            { id: 'OL16817509W', title: 'Me Before You', author: 'Jojo Moyes' },
            { id: 'OL4720160W', title: "The Time Traveler's Wife", author: 'Audrey Niffenegger' },
            { id: 'OL267933W', title: 'Gone with the Wind', author: 'Margaret Mitchell' },
            { id: 'OL5720023W', title: 'Twilight', author: 'Stephenie Meyer' },
            { id: 'OL18020194W', title: 'It Ends with Us', author: 'Colleen Hoover' }
        ],
        'science-fiction': [
            { id: 'OL17091839W', title: 'The Martian', author: 'Andy Weir' },
            { id: 'OL46125W', title: 'Foundation', author: 'Isaac Asimov' },
            { id: 'OL17365W', title: '2001: A Space Odyssey', author: 'Arthur C. Clarke' },
            { id: 'OL510405W', title: 'Ringworld', author: 'Larry Niven' },
            { id: 'OL17267881W', title: 'The Three-Body Problem', author: 'Liu Cixin' },
            { id: 'OL17415W', title: "Childhood's End", author: 'Arthur C. Clarke' },
            { id: 'OL5724837W', title: 'Revelation Space', author: 'Alastair Reynolds' },
            { id: 'OL1963268W', title: 'Hyperion', author: 'Dan Simmons' },
            { id: 'OL8514692W', title: 'Blindsight', author: 'Peter Watts' },
            { id: 'OL27258W', title: 'Neuromancer', author: 'William Gibson' }
        ],
        'fantasy': [
            { id: 'OL27448W', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
            { id: 'OL27479W', title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien' },
            { id: 'OL82548W', title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling' },
            { id: 'OL82536W', title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' },
            { id: 'OL257943W', title: 'A Game of Thrones', author: 'George R.R. Martin' },
            { id: 'OL27482W', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
            { id: 'OL8479867W', title: 'The Way of Kings', author: 'Brandon Sanderson' },
            { id: 'OL17352669W', title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas' },
            { id: 'OL679360W', title: 'American Gods', author: 'Neil Gaiman' },
            { id: 'OL893415W', title: 'Dune', author: 'Frank Herbert' }
        ],
        'classics': [
            { id: 'OL53919W', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
            { id: 'OL24341W', title: '1984', author: 'George Orwell' },
            { id: 'OL471463W', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
            { id: 'OL45804W', title: 'Moby-Dick', author: 'Herman Melville' },
            { id: 'OL19828W', title: 'War and Peace', author: 'Leo Tolstoy' },
            { id: 'OL108561W', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
            { id: 'OL24180W', title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 'OL456638W', title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
            { id: 'OL1099529W', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde' },
            { id: 'OL77908W', title: 'Frankenstein', author: 'Mary Shelley' }
        ],
        'mystery-&-thriller': [
            { id: 'OL262758W', title: 'The Da Vinci Code', author: 'Dan Brown' },
            { id: 'OL2662457W', title: 'Gone Girl', author: 'Gillian Flynn' },
            { id: 'OL262224W', title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson' },
            { id: 'OL24712W', title: 'Murder on the Orient Express', author: 'Agatha Christie' },
            { id: 'OL24203W', title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle' },
            { id: 'OL1169138W', title: 'The Silence of the Lambs', author: 'Thomas Harris' },
            { id: 'OL22914367W', title: 'The Woman in the Window', author: 'A.J. Finn' },
            { id: 'OL20204278W', title: 'Big Little Lies', author: 'Liane Moriarty' },
            { id: 'OL20663270W', title: 'The Guest List', author: 'Lucy Foley' },
            { id: 'OL386030W', title: 'Rebecca', author: 'Daphne du Maurier' }
        ],
        'historical-fiction': [
            { id: 'OL5735363W', title: 'The Book Thief', author: 'Markus Zusak' },
            { id: 'OL45804W', title: 'All the Light We Cannot See', author: 'Anthony Doerr' },
            { id: 'OL1397746W', title: 'The Pillars of the Earth', author: 'Ken Follett' },
            { id: 'OL53919W', title: 'The Nightingale', author: 'Kristin Hannah' },
            { id: 'OL66554W', title: 'Wolf Hall', author: 'Hilary Mantel' },
            { id: 'OL26320742W', title: 'The Alice Network', author: 'Kate Quinn' },
            { id: 'OL1531025W', title: 'The Other Boleyn Girl', author: 'Philippa Gregory' },
            { id: 'OL7353617W', title: 'The Help', author: 'Kathryn Stockett' },
            { id: 'OL262224W', title: 'Memoirs of a Geisha', author: 'Arthur Golden' },
            { id: 'OL16803403W', title: 'The Tattooist of Auschwitz', author: 'Heather Morris' }
        ]
    };

    // Capitalize genre name for display
    const genreDisplayName = genre
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    useDocumentTitle(`${genreDisplayName} Books - Bookish`);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const bookList = genreBooks[genre];

                if (!bookList) {
                    setError('Genre not found');
                    setLoading(false);
                    return;
                }

                // Fetch book details for each book
                const bookPromises = bookList.map(async (book) => {
                    try {
                        const response = await axios.get(`https://openlibrary.org/works/${book.id}.json`);
                        const bookData = response.data;

                        // Get cover image
                        let coverImage = 'https://placehold.co/200x300/png?text=No+Cover';
                        if (bookData.covers && bookData.covers.length > 0) {
                            coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-M.jpg`;
                        }

                        // Get description
                        let description = 'No description available';
                        if (bookData.description) {
                            const fullDescription = typeof bookData.description === 'string'
                                ? bookData.description
                                : bookData.description.value || bookData.description;

                            // Truncate description
                            description = fullDescription.length > 200
                                ? fullDescription.substring(0, 200) + '...'
                                : fullDescription;
                        }

                        return {
                            id: book.id,
                            title: bookData.title || book.title,
                            author: book.author,
                            coverImage,
                            description,
                            publicationYear: bookData.first_publish_date
                        };
                    } catch (err) {
                        console.error(`Error fetching book ${book.id}:`, err);
                        // Return basic info if fetch fails
                        return {
                            id: book.id,
                            title: book.title,
                            author: book.author,
                            coverImage: 'https://placehold.co/200x300/png?text=No+Cover',
                            description: 'Description not available',
                            publicationYear: null
                        };
                    }
                });

                const fetchedBooks = await Promise.all(bookPromises);
                setBooks(fetchedBooks);
            } catch (err) {
                setError('Failed to fetch books');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [genre]);

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const handleRetry = () => {
        window.location.reload();
    };

    if (loading) {
        return <LoadingSpinner message="Loading books..." />;
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={handleRetry} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/discover')}
                        className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
                    >
                        <span>←</span> Back to Discover
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {genreDisplayName} Books
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Popular books in the {genreDisplayName.toLowerCase()} genre
                    </p>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            onClick={() => handleBookClick(book.id)}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="aspect-[2/3] w-full">
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {book.author}
                                </p>
                                {book.publicationYear && (
                                    <p className="text-xs text-gray-500">
                                        {book.publicationYear}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreBooks;