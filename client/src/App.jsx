import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import './index.css'

const App = () => {
    return (
        <div>
           <Routes>
               <Route path="/" element={<LandingPage />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/home" element={<Home />} />
           </Routes>
        </div>
    );
};

export default App;
