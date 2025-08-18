import React, {useState} from 'react'
import { User, ChevronDown } from 'lucide-react';
import {NavLink} from 'react-router-dom'

const Navbar = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className='bg-gray-50 p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center space-x-20'>
                    {/* The logo in the left position */}
                    <h1 className="text-3xl font-family-display font-bold text-indigo-600 tracking-wide">
                        Bookish
                    </h1>

                    {/* The navigation links */}
                    <div className='flex space-x-12'>
                        <NavLink to={'/'}
                                 className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">Home</NavLink>
                        <NavLink to={'/mybooks'} className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">My
                            Books</NavLink>
                        <NavLink to={'/discover'}
                                 className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">Discover</NavLink>
                    </div>
                </div>

                {/* Center: Search bar (not handing the api calls from back for now */}
                <div className="flex-1 px-10">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleProfile}
                        className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md p-2"
                    >
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            <NavLink
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                to="/accountsettings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                Account Settings
                            </NavLink>
                            <hr className="my-1 border-gray-200" />
                            <button
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    // Add logout logic here
                                    console.log('Logout clicked');
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Click outside to close dropdown */}
                {isProfileOpen && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                    />
                )}
            </div>



        </nav>
    )
};

export default Navbar;
