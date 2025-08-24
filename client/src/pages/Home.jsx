import React from 'react';
import Navbar from "../components/Navbar.jsx";
import BookOfTheWeek from "../components/BookOfTheWeek.jsx";
import TrendingNow from "../components/TrendingNow.jsx";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <BookOfTheWeek/>
            <TrendingNow/>
        </div>
    );
};

export default Home;