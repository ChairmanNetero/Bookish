import React from 'react';
import Navbar from './Navbar.jsx';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;