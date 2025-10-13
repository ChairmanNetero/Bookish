import React from 'react';
import GenreCard from '../components/discover/GenreCard.jsx';
import {useDocumentTitle} from "../hooks/useDocumentTitle.js";

const Discover = () => {
    useDocumentTitle("Discover");

    const genres = [
        {
            name: 'Romance',
            image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80',
            description: 'Heartwarming love stories and passionate tales'
        },
        {
            name: 'Science Fiction',
            image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
            description: 'Explore futuristic worlds and advanced technology'
        },
        {
            name: 'Fantasy',
            image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80',
            description: 'Magical realms and epic adventures await'
        },
        {
            name: 'Classics',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
            description: 'Timeless literature that shaped generations'
        },
        {
            name: 'Mystery & Thriller',
            image: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=800&q=80',
            description: 'Suspenseful plots that keep you on edge'
        },
        {
            name: 'Historical Fiction',
            image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&q=80',
            description: 'Journey through time with captivating stories'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Books</h1>
                    <p className="text-gray-600 text-lg">Explore your favorite genres and find your next great read</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {genres.map((genre, index) => (
                        <GenreCard
                            key={index}
                            genre={genre.name}
                            image={genre.image}
                            description={genre.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discover;