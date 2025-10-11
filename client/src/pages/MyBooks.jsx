import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendAPI } from '../api/api';
import { useBookData } from '../hooks/useBookData';
import ReadBooks from '../components/myBooks/ReadBooks.jsx';
import WantToRead from '../components/myBooks/WantToRead.jsx';
import { Loader2, AlertCircle } from 'lucide-react';

const MyBooks = () => {
    const [reviews, setReviews] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [bookDetails, setBookDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('read'); // 'read' or 'wantToRead'
    const navigate = useNavigate();
    const { fetchBookDetails } = useBookData();

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch user profile to get their ID
            const response = await backendAPI.get('/user/me');
            const userId = response.data.user.id;

            // Fetch reviews and reading list in parallel
            const [reviewsResponse, readingListResponse] = await Promise.all([
                backendAPI.get(`/reviews/user/${userId}`),
                backendAPI.get('/reading-list')
            ]);

            const userReviews = reviewsResponse.data;
            const userReadingList = readingListResponse.data;

            setReviews(userReviews);
            setReadingList(userReadingList);

            // Collect all unique book IDs
            const reviewBookIds = userReviews.map(review => review.bookId);
            const readingListBookIds = userReadingList.map(item => item.bookId);
            const allBookIds = [...new Set([...reviewBookIds, ...readingListBookIds])];

            // Fetch book details for all books
            const detailsPromises = allBookIds.map(async (bookId) => {
                try {
                    const details = await fetchBookDetails(bookId);
                    return { bookId, details };
                } catch (err) {
                    console.error(`Failed to fetch details for book ${bookId}:`, err);
                    return {
                        bookId,
                        details: {
                            title: 'Unknown Title',
                            author: 'Unknown Author',
                            coverImage: null,
                            description: ''
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
            console.error('Error fetching data:', err);
            setError('Failed to load your books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (e, reviewId) => {
        e.stopPropagation();
        // TODO: Implement edit functionality
        console.log('Edit review:', reviewId);
    };

    const handleRemoveFromReadingList = async (e, bookId) => {
        e.stopPropagation();
        try {
            await backendAPI.delete(`/reading-list/${bookId}`);
            setReadingList(readingList.filter(item => item.bookId !== bookId));
        } catch (err) {
            console.error('Error removing from reading list:', err);
            alert('Failed to remove book from reading list');
        }
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
                        onClick={fetchAllData}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const totalBooks = reviews.length + readingList.length;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Books</h1>
                    <p className="text-gray-600">
                        {totalBooks} {totalBooks === 1 ? 'book' : 'books'} total
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('read')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'read'
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Read ({reviews.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('wantToRead')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'wantToRead'
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Want to Read ({readingList.length})
                        </button>
                    </nav>
                </div>

                {/* Content */}
                {activeTab === 'read' ? (
                    <ReadBooks
                        reviews={reviews}
                        bookDetails={bookDetails}
                        onEditClick={handleEditClick}
                    />
                ) : (
                    <WantToRead
                        readingList={readingList}
                        bookDetails={bookDetails}
                        onRemoveClick={handleRemoveFromReadingList}
                    />
                )}
            </div>
        </div>
    );
};

export default MyBooks;