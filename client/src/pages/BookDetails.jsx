import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useBookData } from "../hooks/useBookData.js";
import { useReviews } from "../components/bookDetails/useReview.js";
import axios from 'axios';

// Components
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorDisplay from '../components/ErrorDisplay.jsx';
import BookCoverDisplay from '../components/bookDetails/BookCoverDisplay.jsx';
import BookInfoSection from '../components/bookDetails/BookInfoSection.jsx';
import ReviewsSection from '../components/bookDetails/ReviewsSection.jsx';
import BookRatingModal from '../components/bookDetails/BookRatingModal.jsx';

const BookDetails = () => {
    const { bookID } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Rating modal state
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // Use custom hooks
    const {
        reviews,
        reviewsLoading,
        userReview,
        submittingReview,
        submitReview,
        calculateAverageRating
    } = useReviews(bookID);

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

                // Fetch cover image
                let coverImage = null;
                if (bookData.covers && bookData.covers.length > 0) {
                    coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`;
                } else {
                    coverImage = `https://placehold.co/200x300/png?text=No+Cover`;
                }

                // Fetch the book genre - add null check
                const genres = bookData.subjects ? bookData.subjects.slice(0, 10) : [];

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
        const success = await submitReview(rating, reviewText);
        if (success) {
            // Reset form
            setRating(0);
            setReviewText('');
            setShowRatingModal(false);
        }
    };

    const handleRetry = () => {
        window.location.reload();
    };

    // Show loading state
    if (loading) {
        return <LoadingSpinner message="Loading book details..." />;
    }

    // Show error state
    if (error) {
        return <ErrorDisplay error={error} onRetry={handleRetry} />;
    }

    // Show message if no book data
    if (!book) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">No book data found.</p>
            </div>
        );
    }

    const averageRating = calculateAverageRating();
    const reviewCount = reviews.length;

    return (
        <div>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Book Cover */}
                            <BookCoverDisplay
                                coverImage={book.coverImage}
                                title={book.title}
                            />

                            {/* Book Information */}
                            <BookInfoSection
                                book={book}
                                averageRating={averageRating}
                                reviewCount={reviewCount}
                                onRateBookClick={handleRateBookClick}
                                userReview={userReview}
                            />
                        </div>

                        {/* Reviews Section */}
                        <div className="px-8 pb-8">
                            <ReviewsSection
                                reviews={reviews}
                                reviewsLoading={reviewsLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating Modal */}
            <BookRatingModal
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                bookTitle={book.title}
                rating={rating}
                setRating={setRating}
                reviewText={reviewText}
                setReviewText={setReviewText}
                onSubmitReview={handleSubmitReview}
                submittingReview={submittingReview}
            />
        </div>
    );
};

export default BookDetails;