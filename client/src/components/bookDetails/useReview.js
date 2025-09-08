import { useState, useEffect } from 'react';
import { backendAPI } from '../../api/api.js';

export const useReviews = (bookID) => {
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setReviewsLoading(true);
                const response = await backendAPI.get(`/books/${bookID}`);
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
        };

        if (bookID) {
            fetchReviews();
        }
    }, [bookID]);

    const submitReview = async (rating, reviewText) => {
        if (rating === 0) {
            alert('Please select a rating');
            return false;
        }

        try {
            setSubmittingReview(true);
            const token = localStorage.getItem('token');

            const response = await backendAPI.post(
                '/reviews',
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

            alert('Review submitted successfully!');
            return true;
        } catch (err) {
            console.error('Error submitting review:', err);
            if (err.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert('Failed to submit review. Please try again.');
            }
            return false;
        } finally {
            setSubmittingReview(false);
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    return {
        reviews,
        reviewsLoading,
        userReview,
        submittingReview,
        submitReview,
        calculateAverageRating
    };
};