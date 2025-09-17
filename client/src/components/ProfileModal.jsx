import React, { useState, useEffect } from 'react';
import { backendAPI } from '../api/api.js';

const ProfileModal = ({ isOpen, onClose, userData, onUpdateSuccess }) => {
    const [saving, setSaving] = useState(false);
    const [editedData, setEditedData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        country: '',
        bio: ''
    });

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

    // Initialize form data when modal opens or userData changes
    useEffect(() => {
        if (isOpen && userData) {
            setEditedData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                gender: userData.gender || '',
                country: userData.country || '',
                bio: userData.bio || ''
            });
        }
    }, [isOpen, userData]);

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await backendAPI.put('/profile', editedData);

            // Call the success callback to update parent component
            if (onUpdateSuccess) {
                onUpdateSuccess(response.data.user);
            }

            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            // You might want to show an error toast here
            alert('Error updating profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        // Reset form data to original values
        setEditedData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            gender: userData.gender || '',
            country: userData.country || '',
            bio: userData.bio || ''
        });
        onClose();
    };

    const genderOptions = [
        { value: '', label: 'Select Gender' },
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' },
        { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' }
    ];

    const countryOptions = [
        { value: '', label: 'Select Country' },
        { value: 'AF', label: 'Afghanistan' },
        { value: 'AL', label: 'Albania' },
        { value: 'DZ', label: 'Algeria' },
        { value: 'AS', label: 'American Samoa' },
        { value: 'AD', label: 'Andorra' },
        { value: 'AO', label: 'Angola' },
        { value: 'AI', label: 'Anguilla' },
        { value: 'AQ', label: 'Antarctica' },
        { value: 'AG', label: 'Antigua and Barbuda' },
        { value: 'AR', label: 'Argentina' },
        { value: 'AM', label: 'Armenia' },
        { value: 'AW', label: 'Aruba' },
        { value: 'AU', label: 'Australia' },
        { value: 'AT', label: 'Austria' },
        { value: 'AZ', label: 'Azerbaijan' },
        { value: 'BS', label: 'Bahamas' },
        { value: 'BH', label: 'Bahrain' },
        { value: 'BD', label: 'Bangladesh' },
        { value: 'BB', label: 'Barbados' },
        { value: 'BY', label: 'Belarus' },
        { value: 'BE', label: 'Belgium' },
        { value: 'BZ', label: 'Belize' },
        { value: 'BJ', label: 'Benin' },
        { value: 'BM', label: 'Bermuda' },
        { value: 'BT', label: 'Bhutan' },
        { value: 'BO', label: 'Bolivia' },
        { value: 'BQ', label: 'Bonaire, Sint Eustatius and Saba' },
        { value: 'BA', label: 'Bosnia and Herzegovina' },
        { value: 'BW', label: 'Botswana' },
        { value: 'BV', label: 'Bouvet Island' },
        { value: 'BR', label: 'Brazil' },
        { value: 'IO', label: 'British Indian Ocean Territory' },
        { value: 'BN', label: 'Brunei Darussalam' },
        { value: 'BG', label: 'Bulgaria' },
        { value: 'BF', label: 'Burkina Faso' },
        { value: 'BI', label: 'Burundi' },
        { value: 'CV', label: 'Cabo Verde' },
        { value: 'KH', label: 'Cambodia' },
        { value: 'CM', label: 'Cameroon' },
        { value: 'CA', label: 'Canada' },
        { value: 'KY', label: 'Cayman Islands' },
        { value: 'CF', label: 'Central African Republic' },
        { value: 'TD', label: 'Chad' },
        { value: 'CL', label: 'Chile' },
        { value: 'CN', label: 'China' },
        { value: 'CX', label: 'Christmas Island' },
        { value: 'CC', label: 'Cocos (Keeling) Islands' },
        { value: 'CO', label: 'Colombia' },
        { value: 'KM', label: 'Comoros' },
        { value: 'CG', label: 'Congo' },
        { value: 'CD', label: 'Congo, Democratic Republic of the' },
        { value: 'CK', label: 'Cook Islands' },
        { value: 'CR', label: 'Costa Rica' },
        { value: 'CI', label: 'Côte d\'Ivoire' },
        { value: 'HR', label: 'Croatia' },
        { value: 'CU', label: 'Cuba' },
        { value: 'CW', label: 'Curaçao' },
        { value: 'CY', label: 'Cyprus' },
        { value: 'CZ', label: 'Czechia' },
        { value: 'DK', label: 'Denmark' },
        { value: 'DJ', label: 'Djibouti' },
        { value: 'DM', label: 'Dominica' },
        { value: 'DO', label: 'Dominican Republic' },
        { value: 'EC', label: 'Ecuador' },
        { value: 'EG', label: 'Egypt' },
        { value: 'SV', label: 'El Salvador' },
        { value: 'GQ', label: 'Equatorial Guinea' },
        { value: 'ER', label: 'Eritrea' },
        { value: 'EE', label: 'Estonia' },
        { value: 'SZ', label: 'Eswatini' },
        { value: 'ET', label: 'Ethiopia' },
        { value: 'FK', label: 'Falkland Islands (Malvinas)' },
        { value: 'FO', label: 'Faroe Islands' },
        { value: 'FJ', label: 'Fiji' },
        { value: 'FI', label: 'Finland' },
        { value: 'FR', label: 'France' },
        { value: 'GF', label: 'French Guiana' },
        { value: 'PF', label: 'French Polynesia' },
        { value: 'TF', label: 'French Southern Territories' },
        { value: 'GA', label: 'Gabon' },
        { value: 'GM', label: 'Gambia' },
        { value: 'GE', label: 'Georgia' },
        { value: 'DE', label: 'Germany' },
        { value: 'GH', label: 'Ghana' },
        { value: 'GI', label: 'Gibraltar' },
        { value: 'GR', label: 'Greece' },
        { value: 'GL', label: 'Greenland' },
        { value: 'GD', label: 'Grenada' },
        { value: 'GP', label: 'Guadeloupe' },
        { value: 'GU', label: 'Guam' },
        { value: 'GT', label: 'Guatemala' },
        { value: 'GG', label: 'Guernsey' },
        { value: 'GN', label: 'Guinea' },
        { value: 'GW', label: 'Guinea-Bissau' },
        { value: 'GY', label: 'Guyana' },
        { value: 'HT', label: 'Haiti' },
        { value: 'HM', label: 'Heard Island and McDonald Islands' },
        { value: 'VA', label: 'Holy See (Vatican City State)' },
        { value: 'HN', label: 'Honduras' },
        { value: 'HK', label: 'Hong Kong' },
        { value: 'HU', label: 'Hungary' },
        { value: 'IS', label: 'Iceland' },
        { value: 'IN', label: 'India' },
        { value: 'ID', label: 'Indonesia' },
        { value: 'IR', label: 'Iran, Islamic Republic of' },
        { value: 'IQ', label: 'Iraq' },
        { value: 'IE', label: 'Ireland' },
        { value: 'IM', label: 'Isle of Man' },
        { value: 'IL', label: 'Israel' },
        { value: 'IT', label: 'Italy' },
        { value: 'JM', label: 'Jamaica' },
        { value: 'JP', label: 'Japan' },
        { value: 'JE', label: 'Jersey' },
        { value: 'JO', label: 'Jordan' },
        { value: 'KZ', label: 'Kazakhstan' },
        { value: 'KE', label: 'Kenya' },
        { value: 'KI', label: 'Kiribati' },
        { value: 'KP', label: 'Korea, Democratic People\'s Republic of' },
        { value: 'KR', label: 'Korea, Republic of' },
        { value: 'KW', label: 'Kuwait' },
        { value: 'KG', label: 'Kyrgyzstan' },
        { value: 'LA', label: 'Lao People\'s Democratic Republic' },
        { value: 'LV', label: 'Latvia' },
        { value: 'LB', label: 'Lebanon' },
        { value: 'LS', label: 'Lesotho' },
        { value: 'LR', label: 'Liberia' },
        { value: 'LY', label: 'Libya' },
        { value: 'LI', label: 'Liechtenstein' },
        { value: 'LT', label: 'Lithuania' },
        { value: 'LU', label: 'Luxembourg' },
        { value: 'MO', label: 'Macao' },
        { value: 'MK', label: 'Macedonia, the Former Yugoslav Republic of' },
        { value: 'MG', label: 'Madagascar' },
        { value: 'MW', label: 'Malawi' },
        { value: 'MY', label: 'Malaysia' },
        { value: 'MV', label: 'Maldives' },
        { value: 'ML', label: 'Mali' },
        { value: 'MT', label: 'Malta' },
        { value: 'MH', label: 'Marshall Islands' },
        { value: 'MQ', label: 'Martinique' },
        { value: 'MR', label: 'Mauritania' },
        { value: 'MU', label: 'Mauritius' },
        { value: 'YT', label: 'Mayotte' },
        { value: 'MX', label: 'Mexico' },
        { value: 'FM', label: 'Micronesia, Federated States of' },
        { value: 'MD', label: 'Moldova, Republic of' },
        { value: 'MC', label: 'Monaco' },
        { value: 'MN', label: 'Mongolia' },
        { value: 'ME', label: 'Montenegro' },
        { value: 'MS', label: 'Montserrat' },
        { value: 'MA', label: 'Morocco' },
        { value: 'MZ', label: 'Mozambique' },
        { value: 'MM', label: 'Myanmar' },
        { value: 'NA', label: 'Namibia' },
        { value: 'NR', label: 'Nauru' },
        { value: 'NP', label: 'Nepal' },
        { value: 'NL', label: 'Netherlands' },
        { value: 'NC', label: 'New Caledonia' },
        { value: 'NZ', label: 'New Zealand' },
        { value: 'NI', label: 'Nicaragua' },
        { value: 'NE', label: 'Niger' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'NU', label: 'Niue' },
        { value: 'NF', label: 'Norfolk Island' },
        { value: 'MP', label: 'Northern Mariana Islands' },
        { value: 'NO', label: 'Norway' },
        { value: 'OM', label: 'Oman' },
        { value: 'PK', label: 'Pakistan' },
        { value: 'PW', label: 'Palau' },
        { value: 'PS', label: 'Palestine, State of' },
        { value: 'PA', label: 'Panama' },
        { value: 'PG', label: 'Papua New Guinea' },
        { value: 'PY', label: 'Paraguay' },
        { value: 'PE', label: 'Peru' },
        { value: 'PH', label: 'Philippines' },
        { value: 'PN', label: 'Pitcairn' },
        { value: 'PL', label: 'Poland' },
        { value: 'PT', label: 'Portugal' },
        { value: 'PR', label: 'Puerto Rico' },
        { value: 'QA', label: 'Qatar' },
        { value: 'RE', label: 'Réunion' },
        { value: 'RO', label: 'Romania' },
        { value: 'RU', label: 'Russian Federation' },
        { value: 'RW', label: 'Rwanda' },
        { value: 'BL', label: 'Saint Barthélemy' },
        { value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha' },
        { value: 'KN', label: 'Saint Kitts and Nevis' },
        { value: 'LC', label: 'Saint Lucia' },
        { value: 'MF', label: 'Saint Martin (French part)' },
        { value: 'PM', label: 'Saint Pierre and Miquelon' },
        { value: 'VC', label: 'Saint Vincent and the Grenadines' },
        { value: 'WS', label: 'Samoa' },
        { value: 'SM', label: 'San Marino' },
        { value: 'ST', label: 'Sao Tome and Principe' },
        { value: 'SA', label: 'Saudi Arabia' },
        { value: 'SN', label: 'Senegal' },
        { value: 'RS', label: 'Serbia' },
        { value: 'SC', label: 'Seychelles' },
        { value: 'SL', label: 'Sierra Leone' },
        { value: 'SG', label: 'Singapore' },
        { value: 'SX', label: 'Sint Maarten (Dutch part)' },
        { value: 'SK', label: 'Slovakia' },
        { value: 'SI', label: 'Slovenia' },
        { value: 'SB', label: 'Solomon Islands' },
        { value: 'SO', label: 'Somalia' },
        { value: 'ZA', label: 'South Africa' },
        { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
        { value: 'SS', label: 'South Sudan' },
        { value: 'ES', label: 'Spain' },
        { value: 'LK', label: 'Sri Lanka' },
        { value: 'SD', label: 'Sudan' },
        { value: 'SR', label: 'Suriname' },
        { value: 'SJ', label: 'Svalbard and Jan Mayen' },
        { value: 'SE', label: 'Sweden' },
        { value: 'CH', label: 'Switzerland' },
        { value: 'SY', label: 'Syrian Arab Republic' },
        { value: 'TW', label: 'Taiwan, Province of China' },
        { value: 'TJ', label: 'Tajikistan' },
        { value: 'TZ', label: 'Tanzania, United Republic of' },
        { value: 'TH', label: 'Thailand' },
        { value: 'TL', label: 'Timor-Leste' },
        { value: 'TG', label: 'Togo' },
        { value: 'TK', label: 'Tokelau' },
        { value: 'TO', label: 'Tonga' },
        { value: 'TT', label: 'Trinidad and Tobago' },
        { value: 'TN', label: 'Tunisia' },
        { value: 'TR', label: 'Turkey' },
        { value: 'TM', label: 'Turkmenistan' },
        { value: 'TC', label: 'Turks and Caicos Islands' },
        { value: 'TV', label: 'Tuvalu' },
        { value: 'UG', label: 'Uganda' },
        { value: 'UA', label: 'Ukraine' },
        { value: 'AE', label: 'United Arab Emirates' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'US', label: 'United States' },
        { value: 'UM', label: 'United States Minor Outlying Islands' },
        { value: 'UY', label: 'Uruguay' },
        { value: 'UZ', label: 'Uzbekistan' },
        { value: 'VU', label: 'Vanuatu' },
        { value: 'VE', label: 'Venezuela' },
        { value: 'VN', label: 'Viet Nam' },
        { value: 'VG', label: 'Virgin Islands, British' },
        { value: 'VI', label: 'Virgin Islands, U.S.' },
        { value: 'WF', label: 'Wallis and Futuna' },
        { value: 'EH', label: 'Western Sahara' },
        { value: 'YE', label: 'Yemen' },
        { value: 'ZM', label: 'Zambia' },
        { value: 'ZW', label: 'Zimbabwe' }
    ];

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

                    {/* Profile Picture and Action Buttons */}
                    <div className="p-6 flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border-4 border-white -mt-0 shadow-lg">
                                <PlaceholderIcon className="w-16 h-16 rounded-full" />
                            </div>
                        </div>
                        <div className="flex gap-2">
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
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Email:</span>
                                    <span className="text-gray-800">{userData?.email}</span>
                                </div>

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