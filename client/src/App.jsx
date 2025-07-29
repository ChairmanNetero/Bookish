import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage.jsx";
import Home from './pages/Home';
import Navbar from "./components/Navbar.jsx";
import './index.css'

const App = () => {
    return (
        <div>
           <Routes>
               <Route path="/" element={<LandingPage />} />
           </Routes>
        </div>
    );
};

export default App;
