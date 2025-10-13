import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenreCard = ({ genre, image, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to genre-specific page (to be implemented)
        navigate(`/discover/${genre.toLowerCase().replace(/\s+/g, '-')}`);
    };

    return (
        <div
            onClick={handleClick}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
            <div className="aspect-square w-full">
                <img
                    src={image}
                    alt={genre}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">{genre}</h3>
                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default GenreCard;