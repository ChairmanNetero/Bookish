import React from 'react';
import InteractiveStarRating from './InteractiveStarRating';

const BookRatingModal = ({
                             isOpen,
                             onClose,
                             bookTitle,
                             rating,
                             setRating,
                             reviewText,
                             setReviewText,
                             onSubmitReview,
                             submittingReview
                         }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rate "{bookTitle}"</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating
                    </label>
                    <InteractiveStarRating
                        rating={rating}
                        onRatingChange={setRating}
                    />
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
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        disabled={submittingReview}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmitReview}
                        disabled={submittingReview || rating === 0}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookRatingModal;