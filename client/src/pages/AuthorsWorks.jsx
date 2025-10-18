import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { externalAPI } from '../api/api.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { BookOpen, ArrowLeft, Calendar, Loader2 } from 'lucide-react';

const AuthorWorks = () => {
    const { authorId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [authorData, setAuthorData] = useState(null);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const authorName = location.state?.authorName || 'Author';
    const authorEra = location.state?.authorEra || '';
    const authorImage = location.state?.authorImage || '';

    useDocumentTitle(`${authorName} - Works`);

    useEffect(() => {
        fetchAuthorWorks();
    }, [authorId]);

    const fetchAuthorWorks = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch author details
            const authorResponse = await externalAPI.get(
                `https://openlibrary.org/authors/${authorId}.json`
            );
            setAuthorData(authorResponse.data);

            // Fetch author's works
            const worksResponse = await externalAPI.get(
                `https://openlibrary.org/authors/${authorId}/works.json?limit=50`
            );

            // Sort works by first publish date (most recent first)
            const sortedWorks = worksResponse.data.entries.sort((a, b) => {
                const dateA = a.first_publish_date ? new Date(a.first_publish_date) : new Date(0);
                const dateB = b.first_publish_date ? new Date(b.first_publish_date) : new Date(0);
                return dateB - dateA;
            });

            setWorks(sortedWorks);
        } catch (err) {
            console.error('Error fetching author works:', err);
            setError('Failed to load author works. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getCoverUrl = (work) => {
        if (work.covers && work.covers.length > 0) {
            return `https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`;
        }
        return null;
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Loading author works...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go Back Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
            </button>

            {/* Author Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8 shadow-md">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    {authorImage && (
                        <img
                            src={authorImage}
                            alt={authorName}
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                    )}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{authorName}</h1>
                        <p className="text-lg text-gray-600 mb-4">{authorEra}</p>
                        {authorData?.bio && (
                            <p className="text-gray-700 leading-relaxed">
                                {typeof authorData.bio === 'string'
                                    ? authorData.bio
                                    : authorData.bio.value}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Works Section */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        Works ({works.length})
                    </h2>
                </div>

                {works.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No works found for this author.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {works.map((work) => (
                            <div
                                key={work.key}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
                                onClick={() => window.open(`https://openlibrary.org${work.key}`, '_blank')}
                            >
                                {/* Book Cover */}
                                <div className="aspect-[2/3] bg-gray-200 overflow-hidden">
                                    {getCoverUrl(work) ? (
                                        <img
                                            src={getCoverUrl(work)}
                                            alt={work.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                                            <BookOpen className="w-16 h-16 text-blue-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Book Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {work.title}
                                    </h3>
                                    {work.first_publish_date && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{work.first_publish_date}</span>
                                        </div>
                                    )}
                                    {work.subjects && work.subjects.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {work.subjects.slice(0, 2).map((subject, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorWorks;