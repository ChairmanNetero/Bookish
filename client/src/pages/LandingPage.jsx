import React from 'react';
import video from '../assets/books.mp4'

const LandingPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50 px-4 text-white text-center">
                <h1 className="text-5xl md:text-6xl font-display font-bold">
                    Welcome to <span className="text-indigo-400">Bookish</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Discover your next favorite read.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;