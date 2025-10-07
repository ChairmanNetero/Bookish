import { useState } from 'react';
import axios from 'axios';
import { Upload, X, User } from 'lucide-react';

const ImageUploader = ({ currentImage, onUploadSuccess, apiEndpoint = '/api/upload/profile' }) => {
    const [preview, setPreview] = useState(currentImage || null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return

        // Validate file size (5MB max)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setFile(selectedFile);
        setError(null);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Call success callback with response data
            if (onUploadSuccess) {
                onUploadSuccess(response.data);
            }

            setFile(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(currentImage || null);
        setFile(null);
        setError(null);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Image Preview */}
            <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    {preview ? (
                        <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <User className="w-16 h-16 text-gray-500" />
                        </div>
                    )}
                </div>

                {/* Remove button (only show if there's a new file selected) */}
                {file && (
                    <button
                        onClick={handleRemove}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* File Input */}
            <div className="flex flex-col items-center space-y-2">
                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <Upload className="w-4 h-4" />
                        <span>Choose Image</span>
                    </div>
                </label>

                {file && (
                    <div className="text-sm text-gray-600">
                        {file.name}
                    </div>
                )}
            </div>

            {/* Upload Button */}
            {file && (
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            )}

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-sm text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;