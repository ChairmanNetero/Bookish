import React, { useState, useEffect, useRef } from 'react'
import { User, ChevronDown, Search, X, Book } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom'
import {removeAuthToken} from "../api/api.js";

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchTimeoutRef = useRef(null);
    const searchContainerRef = useRef(null);

    // Initialize useNavigate
    const navigate = useNavigate();

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    // Handle logout function
    const handleLogout = () => {
        // Clear all items from local storage
        localStorage.clear();

        removeAuthToken();

        // Close the profile dropdown
        setIsProfileOpen(false);

        // Navigate to the login page
        navigate('/login');

        console.log('User logged out and redirected to login.');
    };

    // Navigate to book details page
    const handleBookSelect = (book) => {
        // Clear search and close results
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);

        // Extract book ID from the key (e.g., "/works/OL45804W" -> "OL45804W")
        const bookId = book.key ? book.key.split('/').pop() : null;

        if (bookId) {
            // Navigate to book details page with the book ID
            navigate(`/books/${bookId}`, {
                state: {
                    bookData: book
                }
            });
        } else {
            console.error('No valid book ID found');
        }
    };

    // Debounced search function
    const searchBooks = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8&fields=key,title,author_name,first_publish_year,cover_i,isbn`);
            const data = await response.json();

            if (data.docs) {
                setSearchResults(data.docs);
                setShowResults(true);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search input changes with debouncing
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchBooks(value);
        }, 300);
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    };

    // Handle click outside to close search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

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
                        <NavLink to={'/home'}
                                 className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">Home</NavLink>
                        <NavLink to={'/mybooks'} className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">My
                            Books</NavLink>
                        <NavLink to={'/discover'}
                                 className="px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors">Discover</NavLink>
                    </div>
                </div>

                {/* Enhanced Search bar with dropdown results */}
                <div className="flex-1 px-10 relative" ref={searchContainerRef}>
                    <div className="relative max-w-md mx-auto">
                        <div className="flex items-center">
                            <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => searchQuery && setShowResults(true)}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="h-4 w-4 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Search Results Dropdown */}
                        {showResults && (searchResults.length > 0 || isSearching) && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                                {isSearching && (
                                    <div className="p-4 text-center text-gray-500">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                                        <p className="mt-2">Searching...</p>
                                    </div>
                                )}

                                {!isSearching && searchResults.length > 0 && (
                                    <div className="py-2">
                                        {searchResults.map((book, index) => (
                                            <div
                                                key={book.key || index}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                                onClick={() => handleBookSelect(book)}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0">
                                                        {book.cover_i ? (
                                                            <img
                                                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                                                                alt={book.title}
                                                                className="w-10 h-14 object-cover rounded"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center">
                                                                <Book className="h-4 w-4 text-gray-400" />
                                                            </div>
                                                        )}
                                                        <div className="w-10 h-14 bg-gray-200 rounded items-center justify-center hidden">
                                                            <Book className="h-4 w-4 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {book.title}
                                                        </p>
                                                        {book.author_name && book.author_name.length > 0 && (
                                                            <p className="text-xs text-gray-600 truncate">
                                                                by {book.author_name.slice(0, 2).join(', ')}
                                                                {book.author_name.length > 2 && ' & others'}
                                                            </p>
                                                        )}
                                                        {book.first_publish_year && (
                                                            <p className="text-xs text-gray-500">
                                                                Published: {book.first_publish_year}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!isSearching && searchResults.length === 0 && searchQuery && (
                                    <div className="p-4 text-center text-gray-500">
                                        <Book className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                        <p>No books found for "{searchQuery}"</p>
                                        <p className="text-xs mt-1">Try searching with different keywords</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
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
                                to="/user/me"
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
                                onClick={handleLogout}
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