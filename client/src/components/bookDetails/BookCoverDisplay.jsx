import React from 'react';

const BookCoverDisplay = ({ coverImage, title }) => {
    return (
        <div className="lg:w-1/3 p-8 bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start">
            <div className="relative group">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-64 h-96 object-cover rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/256x384/e5e7eb/6b7280?text=No+Cover';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </div>
    );
};

export default BookCoverDisplay;