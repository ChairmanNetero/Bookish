import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import './index.css'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/home" element={<ProtectedRoute>
                    <Home/>
                </ProtectedRoute>}
                />
                <Route path="/books/:bookID" element={<BookDetails/>}/>
            </Routes>
        </div>
    );
};

export default App;
