import React from 'react';

const Profile = () => {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    return (
        <div className="flex items-center justify-center p-4">
            <div className="text-left">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, User</h1>
                    <h2 className="mt-2 text-xl font-medium text-gray-500">{formattedDate}</h2>
                </header>
            </div>

        </div>
    );
};

export default Profile;