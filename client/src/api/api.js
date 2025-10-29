import axios from 'axios';

// Create an axios instance for your backend API
export const backendAPI = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
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
        localStorage.setItem('authToken', token); // Store token in localStorage
    } else {
        delete backendAPI.defaults.headers.common['Authorization'];
        localStorage.removeItem('authToken'); // Remove token from localStorage
    }
};

// Function to remove auth token
export const removeAuthToken = () => {
    delete backendAPI.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken'); // Remove token from localStorage
};

// Function to load token from localStorage on app start
export const loadAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        backendAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token;
};

// Initialize token from localStorage when the module loads
loadAuthToken();