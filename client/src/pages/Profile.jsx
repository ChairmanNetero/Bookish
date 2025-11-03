import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../api/api.js';
import ProfileModal from '../components/ProfileModal.jsx';
import {useDocumentTitle} from "../hooks/useDocumentTitle.js";

const Profile = () => {

    useDocumentTitle("Profile");

    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        country: '',
        bio: '',
        email: '',
        profileImage: null
    });

    const isOwnProfile = !userId;

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

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            let response;

            if (isOwnProfile) {
                response = await backendAPI.get('user/me');
            } else {
                response = await backendAPI.get(`users/${userId}`);
            }

            const user = response.data.user;

            setUserData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                gender: user.gender || '',
                country: user.country || '',
                bio: user.bio || '',
                email: user.email || null,
                profileImage: user.profileImage || null
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (error.response?.status === 404) {
                alert('User not found');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleUpdateSuccess = (updatedUser) => {
        setUserData(prev => ({
            ...prev,
            ...updatedUser
        }));
    };

    const genderOptions = [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' },
        { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' }
    ];

    const getGenderLabel = (genderValue) => {
        const option = genderOptions.find(opt => opt.value === genderValue);
        return option ? option.label : genderValue;
    };

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl bg-white rounded-lg mx-auto shadow-md overflow-hidden">
                {/* Welcome Header */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isOwnProfile
                            ? `Welcome, ${userData.firstName || 'User'}!`
                            : `${userData.firstName || 'User'}'s Profile`
                        }
                    </h1>
                    <h3 className="text-md text-gray-500">{currentDate}</h3>
                </div>

                {/* Hero Banner */}
                <div className="w-full h-40 rounded-lg bg-gradient-to-r from-[#d4e2ff] via-[#fde2e4] to-[#fff1c1] [clip-path:polygon(0%_0,_100%_0,_100%_100%,_0%_100%)]">
                </div>

                {/* Profile Picture and Edit Button */}
                <div className="p-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border-4 border-white -mt-0 shadow-lg">
                            {userData.profileImage ? (
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <PlaceholderIcon className="w-16 h-16 rounded-full" />
                            )}
                        </div>
                    </div>
                    {isOwnProfile && (
                        <button
                            onClick={handleEditProfile}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* User Information */}
                <div className="px-6 pb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Personal Information
                        </h3>
                        <div className="space-y-3">
                            {/* Only show email if it exists (own profile only) */}
                            {userData.email && (
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Email:</span>
                                    <span className="text-gray-800">{userData.email}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">First Name:</span>
                                <span className="text-gray-800">{userData.firstName || 'Not provided'}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Last Name:</span>
                                <span className="text-gray-800">{userData.lastName || 'Not provided'}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Gender:</span>
                                <span className="text-gray-800">
                                    {userData.gender ? getGenderLabel(userData.gender) : 'Not provided'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Country:</span>
                                <span className="text-gray-800">{userData.country || 'Not provided'}</span>
                            </div>

                            <div className="py-2">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-gray-600 font-medium">Bio:</span>
                                </div>
                                <p className="text-gray-800 bg-gray-50 rounded p-3 min-h-[6rem] whitespace-pre-wrap">
                                    {userData.bio || (isOwnProfile
                                            ? 'No bio provided yet. Click "Edit Profile" to add one!'
                                            : 'No bio provided.'
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOwnProfile && (
                <ProfileModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    userData={userData}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default Profile;