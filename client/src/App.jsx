import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import './index.css'

const App = () => {
    return (
        <div>
           <Routes>
               <Route path="/" element={<LandingPage />} />
               <Route path="/Login" element={<Login />} />
           </Routes>
        </div>
    );
};

export default App;
