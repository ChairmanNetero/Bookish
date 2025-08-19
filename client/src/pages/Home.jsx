import React from 'react';
import Navbar from "../components/Navbar.jsx";
import BookOfTheWeek from "../components/BookOfTheWeek.jsx";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <BookOfTheWeek/>
        </div>
    );
};

export default Home;