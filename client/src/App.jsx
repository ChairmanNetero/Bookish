import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Profile from "./pages/Profile.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import './index.css'
import {loadAuthToken} from "./api/api.js";

const App = () => {
    useEffect(() => {
        // Load auth token when app starts
        loadAuthToken();
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/home" element={<ProtectedRoute>
                    <Layout>
                        <Home/>
                    </Layout>
                </ProtectedRoute>}
                />
                <Route path="/books/:bookID" element={<ProtectedRoute>
                    <Layout>
                        <BookDetails/>
                    </Layout>
                </ProtectedRoute>}
                />
                <Route path="/user/me" element={<ProtectedRoute>
                    <Layout>
                        <Profile/>
                    </Layout>
                </ProtectedRoute>}
                />
                <Route path="/users/:userId" element={<ProtectedRoute>
                    <Layout>
                        <Profile/>
                    </Layout>
                </ProtectedRoute>}
                />
                <Route path="/mybooks" element={<ProtectedRoute>
                    <Layout>
                        <MyBooks/>
                    </Layout>
                </ProtectedRoute>}
                />
            </Routes>
        </div>
    );
};

export default App;
