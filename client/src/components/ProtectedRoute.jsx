import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Function to decode JWT token and check if it's expired
    const isTokenValid = () => {
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token || token === null || token === undefined || token === '') {
            return false;
        }

        try {
            // Decode JWT token (assuming it's a JWT)
            // JWT has 3 parts separated by dots: header.payload.signature
            const tokenParts = token.split('.');

            if (tokenParts.length !== 3) {
                // Not a valid JWT format
                localStorage.removeItem('token');
                return false;
            }

            // Decode the payload (second part)
            const payload = JSON.parse(atob(tokenParts[1]));

            // Check if token has expiration time
            if (!payload.exp) {
                // Token doesn't have expiration, consider it valid
                return true;
            }

            // Get current time in seconds (JWT exp is in seconds)
            const currentTime = Math.floor(Date.now() / 1000);

            // Check if token is expired
            if (payload.exp < currentTime) {
                // Token is expired, remove it from localStorage
                localStorage.removeItem('token');
                return false;
            }

            // Token is valid and not expired
            return true;

        } catch (error) {
            // Error decoding token, consider it invalid
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
            return false;
        }
    };

    // If user has valid token, render the protected component
    // If not, redirect to login page
    return isTokenValid() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;