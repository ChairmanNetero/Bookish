import React from 'react';

const Profile = () => {

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-8x`xxl bg-white rounder-lg mx-auto shadow-md overflow-hidden">
                {/* Welcome Header */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, Mazen!</h1>
                    <h3 className="text-md text-gray-500">{currentDate}</h3>
                </div>

                {/* Hero Banner */}
                <div className="bg-blue-500 h-48 w-full">
                </div>
            </div>

        </div>
    );
};

export default Profile;