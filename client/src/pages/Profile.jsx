import React from 'react';

const Profile = () => {

    // A simple placeholder for an icon or image
    const PlaceholderIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
    );

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl bg-white rounded-lg mx-auto shadow-md overflow-hidden">
                {/* Welcome Header */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, Mazen!</h1>
                    <h3 className="text-md text-gray-500">{currentDate}</h3>
                </div>

                {/* Hero Banner */}
                <div className="w-full h-40 rounded-lg
              bg-gradient-to-r from-[#d4e2ff] via-[#fde2e4] to-[#fff1c1]
              [clip-path:polygon(0%_0,_100%_0,_100%_100%,_0%_100%)]">
                </div>

                {/* 3. Profile Picture and Edit Button */}
                <div className="p-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border-4 border-white -mt-0 shadow-lg">
                            <PlaceholderIcon className="w-16 h-16 rounded-full" />
                        </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                        Edit Profile
                    </button>
                </div>

                {/* 4. User Information */}
                <div className="px-6 pb-8">
                        {/* Personal Information Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Personal Information
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                <span className="text-gray-600 font-medium">First Name:</span>
                                <span className="text-gray-800"></span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                <span className="text-gray-600 font-medium">Last Name:</span>
                                <span className="text-gray-800"></span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                <span className="text-gray-600 font-medium">Gender:</span>
                                <span className="text-gray-800"></span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 font-medium">Country:</span>
                                <span className="text-gray-800"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;