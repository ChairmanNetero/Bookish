import React, { useState, useEffect } from 'react';
import { backendAPI } from '../api/api.js';
import { countryOptions, genderOptions } from '../utils/countryOptions.js';
import ImageUploader from './ImageUploader';

const PlaceholderIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
);

const ProfileModal = ({ isOpen, onClose, userData, onUpdateSuccess }) => {
    const [saving, setSaving] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [editedData, setEditedData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        country: '',
        bio: ''
    });

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        if (isOpen && userData) {
            setEditedData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                gender: userData.gender || '',
                country: userData.country || '',
                bio: userData.bio || ''
            });
            setProfileImage(userData.profileImage || null);
        }
    }, [isOpen, userData]);

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUploadSuccess = (data) => {
        // Update the profile image with the response from the server
        setProfileImage(data.imageUrl || data.url);
        alert('Profile image uploaded successfully!');
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await backendAPI.put('/user/me', editedData);
            if (onUpdateSuccess) {
                onUpdateSuccess({
                    ...response.data.user,
                    profileImage: profileImage
                });
            }
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditedData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            gender: userData.gender || '',
            country: userData.country || '',
            bio: userData.bio || ''
        });
        setProfileImage(userData.profileImage || null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans max-w-7xl w-full max-h-[95vh] overflow-y-auto rounded-lg">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Welcome Header */}
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Profile - {editedData.firstName || 'User'}
                        </h1>
                        <h3 className="text-md text-gray-500">{currentDate}</h3>
                    </div>

                    {/* Hero Banner */}
                    <div className="w-full h-40 rounded-lg bg-gradient-to-r from-[#d4e2ff] via-[#fde2e4] to-[#fff1c1] [clip-path:polygon(0%_0,_100%_0,_100%_100%,_0%_100%)]">
                    </div>

                    {/* Profile Picture Upload and Action Buttons */}
                    <div className="p-6 flex justify-between items-start">
                        <div className="flex-1">
                            <ImageUploader
                                currentImage={profileImage}
                                onUploadSuccess={handleImageUploadSuccess}
                                apiEndpoint="/upload/profile"
                            />
                        </div>
                        <div className="flex gap-2 ml-4">
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2"
                            >
                                {saving && (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                )}
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* User Information - Edit Mode */}
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
                                {/* Email (Read-only) */}
                                <div className="space-y-3">
                                    {isOwnProfile && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-medium">Email:</span>
                                            <span className="text-gray-800">{userData.email}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">

                                {/* First Name */}
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">First Name:</span>
                                    <input
                                        type="text"
                                        value={editedData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="text-gray-800 bg-white border border-gray-200 rounded px-3 py-1 text-right max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter first name"
                                        disabled={saving}
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Last Name:</span>
                                    <input
                                        type="text"
                                        value={editedData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="text-gray-800 bg-white border border-gray-200 rounded px-3 py-1 text-right max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter last name"
                                        disabled={saving}
                                    />
                                </div>

                                {/* Gender */}
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Gender:</span>
                                    <select
                                        value={editedData.gender}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                        className="text-gray-800 bg-white border border-gray-200 rounded px-3 py-1 text-right max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={saving}
                                    >
                                        {genderOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Country */}
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Country:</span>
                                    <select
                                        value={editedData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="text-gray-800 bg-white border border-gray-200 rounded px-3 py-1 text-right max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={saving}
                                    >
                                        {countryOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Bio */}
                                <div className="py-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-gray-600 font-medium">Bio:</span>
                                        <span className="text-xs text-gray-500">
                                            {editedData.bio.length}/500 characters
                                        </span>
                                    </div>
                                    <textarea
                                        value={editedData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        className="w-full text-gray-800 bg-white border border-gray-200 rounded px-3 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Tell us about yourself..."
                                        disabled={saving}
                                        maxLength={500}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;