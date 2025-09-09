import axios from 'axios';

// Create an axios instance for your backend API
export const backendAPI = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
});

// Create an axios instance for external APIs (like OpenLibrary)
export const externalAPI = axios.create({
    timeout: 25000,
});

// Function to set the auth token for backend requests
export const setAuthToken = (token) => {
    if (token) {
        backendAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete backendAPI.defaults.headers.common['Authorization'];
    }
};

// Function to remove auth token
export const removeAuthToken = () => {
    delete backendAPI.defaults.headers.common['Authorization'];
};