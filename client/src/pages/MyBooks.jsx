import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendAPI } from '../api/api';
import { useBookData } from '../hooks/useBookData';
import BookCover from '../components/BookCover';
import StarRating from '../components/StarRating';
import { Loader2, AlertCircle, BookOpen } from 'lucide-react';

const MyBooks = () => {
    const [reviews, setReviews] = useState([]);
    const [bookDetails, setBookDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { fetchBookDetails } = useBookData();

    useEffect(() => {
        fetchUserReviews();
    }, []);

    const fetchUserReviews = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch user profile to get their reviews
            const response = await backendAPI.get('/user/me');
            const userId = response.data.user.id;

            // Fetch all reviews
            const reviewsResponse = await backendAPI.get(`/reviews/user/${userId}`);
            const userReviews = reviewsResponse.data;

            setReviews(userReviews);

            // Fetch book details for each review
            const detailsPromises = userReviews.map(async (review) => {
                try {
                    const details = await fetchBookDetails(review.bookId);
                    return { bookId: review.bookId, details };
                } catch (err) {
                    console.error(`Failed to fetch details for book ${review.bookId}:`, err);
                    return {
                        bookId: review.bookId,
                        details: {
                            title: 'Unknown Title',
                            author: 'Unknown Author',
                            coverImage: null
                        }
                    };
                }
            });

            const detailsArray = await Promise.all(detailsPromises);
            const detailsMap = {};
            detailsArray.forEach(({ bookId, details }) => {
                detailsMap[bookId] = details;
            });

            setBookDetails(detailsMap);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to load your books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const handleEditClick = (e, reviewId) => {
        e.stopPropagation();
        // TODO: Implement edit functionality
        console.log('Edit review:', reviewId);
    };

    const truncateText = (text, maxLength = 200) => {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading your books...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Books</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchUserReviews}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Books Yet</h2>
                    <p className="text-gray-600 mb-6">
                        You haven't reviewed any books yet. Start exploring and share your thoughts!
                    </p>
                    <button
                        onClick={() => navigate('/home')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Discover Books
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Books</h1>
                    <p className="text-gray-600">
                        {reviews.length} {reviews.length === 1 ? 'book' : 'books'} reviewed
                    </p>
                </div>

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
                                    {/* Book Cover */}
                                    <div className="flex-shrink-0">
                                        <BookCover
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-20 h-28 object-cover rounded shadow-sm"
                                        />
                                    </div>

                                    {/* Book Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-2">
                                            <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors mb-1">
                                                {book.title || 'Loading...'}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {book.author || 'Loading...'}
                                            </p>
                                        </div>

                                        {/* Rating */}
                                        <div className="mb-3">
                                            <StarRating
                                                rating={review.rating}
                                                maxRating={5}
                                                size="w-5 h-5"
                                                label=""
                                                className="flex items-center gap-1"
                                            />
                                        </div>

                                        {/* Review Status */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                read
                                            </span>
                                            <button
                                                onClick={(e) => handleEditClick(e, review.id)}
                                                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                            >
                                                [edit]
                                            </button>
                                        </div>

                                        {/* Review Content */}
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

                                        {/* Date */}
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
            </div>
        </div>
    );
};

export default MyBooks;