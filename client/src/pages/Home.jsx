import React from 'react';
import BookOfTheWeek from "../components/BookOfTheWeek.jsx";
import TrendingNow from "../components/TrendingNow.jsx";
import MastersOfLiterature from "../components/MastersOfLiterature.jsx";
import {useDocumentTitle} from "../hooks/useDocumentTitle.js";

const Home = () => {

    useDocumentTitle("Home");
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Fixed layout with proper alignment and equal heights */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Left side - Trending Now */}
                <div className="flex-1 lg:w-2/3">
                    <div className="h-full">
                        <TrendingNow/>
                    </div>
                </div>

                {/* Right side - Book of the Week */}
                <div className="lg:w-1/3">
                    <div className="h-full w-full">
                        {/* Override the max-width constraint from BookOfTheWeek */}
                        <div className="w-full max-w-none">
                            <BookOfTheWeek/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Masters of Literature Section */}
            <div className="mt-12">
                <MastersOfLiterature />
            </div>
        </div>
    );
};

export default Home;