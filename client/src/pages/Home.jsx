import React from 'react';
import Navbar from "../components/Navbar.jsx";
import BookOfTheWeek from "../components/BookOfTheWeek.jsx";
import TrendingNow from "../components/TrendingNow.jsx";

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar/>
            <div className="container mx-auto px-4 py-8">
                {/* 👇 The only change is here: removed "items-start" */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left side - Trending Now */}
                    <div className="flex-1 lg:w-2/3 h-full">
                        <TrendingNow/>
                    </div>

                    {/* Right side - Book of the Week */}
                    <div className="lg:w-1/3 h-full">
                        <BookOfTheWeek/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Home;