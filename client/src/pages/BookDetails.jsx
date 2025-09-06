import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDocumentTitle} from "../hooks/useDocumentTitle.js";
import axios from 'axios';

const BookDetails = () => {

    const {bookID} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Reviews state
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [userReview, setUserReview] = useState(null);

    useDocumentTitle(
        book?.title ? `${book.title} - Bookish` :
            loading ? 'Loading... - Bookish' :
                error ? 'Error - Bookish' :
                    'Bookish'
    );

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                // Fetch data by replacing with the actual API endpoint
                const response = await axios.get(`https://openlibrary.org/works/${bookID}.json`);
                const bookData = response.data;

                // Extract needed information for BookDetails Page
                const title = bookData.title || "Unknown Title";
                const publicationYear = bookData.first_publish_date;
                console.log(bookData);
                console.log(publicationYear);

                // Fetch author data
                let authorName = "Unknown Author";
                if (bookData.authors && bookData.authors.length > 0) {
                    try {
                        const authorKey = bookData.authors[0].author.key;
                        const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                        authorName = authorResponse.data.name || "Unknown Author";
                    } catch (authorError) {
                        console.warn('Could not fetch author data:', authorError);
                    }
                }

                // Fetch description - add null checks
                let description = "No description available";
                if (bookData.description) {
                    const fullDescription = typeof bookData.description === 'string'
                        ? bookData.description
                        : bookData.description.value || bookData.description;

                    const separator = '--';
                    const endIndex = fullDescription.indexOf(separator);
                    description = endIndex !== -1 ? fullDescription.slice(0, endIndex) : fullDescription;
                }
                console.log(description);

                // Fetch cover image
                let coverImage = null;
                if (bookData.covers && bookData.covers.length > 0) {
                    coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`;
                } else {
                    coverImage = `https://placehold.co/200x300/png?text=No+Cover`;
                }

                // Fetch the book genre - add null check
                const genres = bookData.subjects ? bookData.subjects.slice(0, 10) : [];
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

        const fetchReviews = async () => {
            try {
                setReviewsLoading(true);
                const response = await axios.get(`http://localhost:3000/api/books/${bookID}`);
                setReviews(response.data);

                // Check if current user has already reviewed this book
                const token = localStorage.getItem('token');
                if (token) {
                    const userInfo = JSON.parse(atob(token.split('.')[1]));
                    const existingReview = response.data.find(review => review.userId === userInfo.id);
                    setUserReview(existingReview);
                }
            } catch (err) {
                console.error('Error fetching reviews:', err);
            } finally {
                setReviewsLoading(false);
            }
        }

        fetchBookDetails();
        fetchReviews()
    }, [bookID]);

    const handleRateBookClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to rate this book');
            return;
        }

        if (userReview) {
            alert('You have already reviewed this book');
            return;
        }

        setShowRatingModal(true);
    };

    const handleSubmitReview = async () => {
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        try {
            setSubmittingReview(true);
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:3000/api/reviews',
                {
                    bookID: bookID,
                    rating: rating,
                    content: reviewText.trim() || null
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update reviews list with new review
            setReviews(prev => [response.data.review, ...prev]);
            setUserReview(response.data.review);

            // Reset form
            setRating(0);
            setReviewText('');
            setShowRatingModal(false);

            alert('Review submitted successfully!');
        } catch (err) {
            console.error('Error submitting review:', err);
            if (err.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert('Failed to submit review. Please try again.');
            }
        } finally {
            setSubmittingReview(false);
        }
    };

    const renderStars = (currentRating, interactive = false, onStarClick = null) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={index}
                    className={`text-2xl cursor-pointer transition-colors duration-200 ${
                        starValue <= currentRating
                            ? 'text-yellow-400'
                            : interactive
                                ? 'text-gray-300 hover:text-yellow-300'
                                : 'text-gray-300'
                    }`}
                    onClick={() => interactive && onStarClick && onStarClick(starValue)}
                >
                    ★
                </span>
            );
        });
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };



    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading book details...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Show message if no book data
    if (!book) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">No book data found.</p>
            </div>
        );
    }

    // Calculate truncated description
    const truncatedDescription = book.description && book.description.length > 300
        ? book.description.substring(0, 300) + "..."
        : book.description;

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
                                </div>

                                {/* Rating Display */}
                                {reviews.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            {renderStars(Math.round(calculateAverageRating()))}
                                            <span className="text-lg font-semibold text-gray-700">
                                                {calculateAverageRating()}
                                            </span>
                                            <span className="text-gray-500">
                                                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                                            </span>
                                        </div>
                                    </div>
                                )}

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
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Want to Read
                                    </button>
                                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Add to Shelf
                                    </button>
                                    <button
                                        onClick={handleRateBookClick}
                                        className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                        {userReview ? 'Already Reviewed' : 'Rate this book'}
                                    </button>
                                </div>

                                {/* Reviews Section */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
                                    {reviewsLoading ? (
                                        <p className="text-gray-600">Loading reviews...</p>
                                    ) : reviews.length === 0 ? (
                                        <p className="text-gray-600">No reviews yet. Be the first to review this book!</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {renderStars(review.rating)}
                                                        <span className="font-medium text-gray-700">{review.user.email}</span>
                                                        <span className="text-gray-500 text-sm">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {review.content && (
                                                        <p className="text-gray-700 leading-relaxed">{review.content}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating Modal */}
            {showRatingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Rate "{book.title}"</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Rating
                            </label>
                            <div className="flex gap-1">
                                {renderStars(rating, true, setRating)}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Review (Optional)
                            </label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Write your review here..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                disabled={submittingReview}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                disabled={submittingReview || rating === 0}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;