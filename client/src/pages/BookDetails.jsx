import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

const BookDetails = () => {
    const {bookID} = useParams();
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                // Fetch data by replacing with the actual API endpoint
                const response = await axios.get(`https://openlibrary.org/works/${bookID}.json`);
                const bookData = response.data;

                // Extract needed information for BookDetails Page
                const title = bookData.title;
                const publicationYear = bookData.first_publish_date;
                console.log(bookData);
                console.log(publicationYear);

                // Fetch author data
                let authorName = "Unknown Author";
                if (bookData.authors && bookData.authors.length > 0) {
                    try {
                        const authorKey = bookData.authors[0].author.key;
                        const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                        authorName = authorResponse.data.name;
                    } catch (authorError) {
                        console.warn('Could not fetch author data:', authorError);
                    }
                }

                // Fetch description
                const fullDescription = bookData.description;

                const separator = '--';
                const endIndex = fullDescription.indexOf(separator);
                const description = fullDescription.slice(0, endIndex);
                console.log(description);

                // Fetch cover image
                let coverImage = null;
                if (bookData.covers && bookData.covers.length > 0) {
                    coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`;
                } else {
                    coverImage = `'https://placehold.co/200x300/png?text=No+Cover`;
                }

                // Fetch the book genre
                const genres = bookData.subjects.slice(0, 6)
                console.log(genres);


                // Set the final book state
                setBook({
                    title: title,
                    authorName: authorName,
                    description: description,
                    publicationYear: publicationYear,
                    coverImage: coverImage,
                    genres: genres,

                });

            } catch (err) {
                setError('Failed to fetch book details');
                console.error('Error fetching book:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookID])



    return (
        <div>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Book Cover */}
                            <div className="lg:w-1/3 p-8 bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start">
                                <div className="relative group">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-64 h-96 object-cover rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/256x384/e5e7eb/6b7280?text=No+Cover';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Book Information */}
                            <div className="lg:w-2/3 p-8">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                                        {book.title}
                                    </h1>
                                    <p className="text-xl text-gray-600 mb-4">
                                        by <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">{book.authorName}</span>
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <StarRating rating={3.64} />
                                        <span className="text-gray-500">75 ratings · 9 reviews</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                        {showFullDescription ? book.description : truncatedDescription}
                                    </div>
                                    {book.description && book.description.length > 300 && (
                                        <button
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                            className="mt-3 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                        >
                                            {showFullDescription ? 'Show less' : 'Show more'}
                                        </button>
                                    )}
                                </div>

                                {/* Publication Year */}
                                {book.publicationYear && (
                                    <div className="mb-6">
                                        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">First Published</span>
                                        <p className="text-lg text-gray-800 font-medium">{book.publicationYear}</p>
                                    </div>
                                )}

                                {/* Genres */}
                                {book.genres && book.genres.length > 0 && (
                                    <div className="mb-8">
                                        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium block mb-3">Genres</span>
                                        <div className="flex flex-wrap gap-2">
                                            {book.genres.map((genre, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                                                >
                                                {genre}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Want to Read
                                    </button>
                                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Add to Shelf
                                    </button>
                                    <button className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Rate this book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Title</dt>
                                <dd className="text-lg text-gray-900">{book.title}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Author</dt>
                                <dd className="text-lg text-gray-900">{book.authorName}</dd>
                            </div>
                            {book.publicationYear && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">First Published</dt>
                                    <dd className="text-lg text-gray-900">{book.publicationYear}</dd>
                                </div>
                            )}
                            {book.genres && book.genres.length > 0 && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Primary Genre</dt>
                                    <dd className="text-lg text-gray-900">{book.genres[0]}</dd>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default BookDetails;