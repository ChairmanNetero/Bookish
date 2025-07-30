import React from 'react';
import video from '../assets/books.mp4'
import {Link} from 'react-router-dom'

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
                <Link
                    to="/login"
                    className="mt-8 inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;