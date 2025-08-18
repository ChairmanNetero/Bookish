import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../assets/BookishLogo.png'

const Navbar = () => {
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
                        <NavLink to={'/'} className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">Home</NavLink>
                        <NavLink to={'/mybooks'} className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">My Books</NavLink>
                        <NavLink to={'/discover'} className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">Discover</NavLink>
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
            </div>

        </nav>
    )
};

export default Navbar;
