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

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white bg-black/50 px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                    Welcome to Bookish 📚
                </h1>
                <p className="mb-6 text-lg text-center max-w-xl">
                    Discover, track, and share your favorite reads with a vibrant community of book lovers.
                </p>
                <div className="flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl">
                        Sign Up
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-2 px-6 rounded-xl">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;