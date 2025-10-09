import React from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveStarRating from './InteractiveStarRating';
import LoadingSpinner from '../LoadingSpinner';

const ReviewsSection = ({ reviews, reviewsLoading }) => {
    const navigate = useNavigate();

    // Helper function to get display name
    const getDisplayName = (user) => {
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        return user.email;
    };

    // Navigate to user profile
    const handleUserClick = (userId) => {
        navigate(`/users/${userId}`);
    };

    if (reviewsLoading) {
        return (
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
                <LoadingSpinner message="Loading reviews..." />
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
            {reviews.length === 0 ? (
                <p className="text-gray-600">
                    No reviews yet. Be the first to review this book!
                </p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="flex items-center gap-2 mb-2">
                                <InteractiveStarRating
                                    rating={review.rating}
                                    interactive={false}
                                    size="text-lg"
                                />
                                <button
                                    onClick={() => handleUserClick(review.user.id)}
                                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                                >
                                    {getDisplayName(review.user)}
                                </button>
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
    );
};

export default ReviewsSection;