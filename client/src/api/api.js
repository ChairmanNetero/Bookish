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

// Add retry logic for timeout errors (especially for first request after cold start)
backendAPI.interceptors.response.use(
    response => response,
    async error => {
        const config = error.config;

        // Retry on timeout if this is the first attempt
        if (error.code === 'ECONNABORTED' && !config._retry) {
            config._retry = true;
            config.timeout = 30000; // Increase timeout to 30 seconds for retry

            try {
                return await backendAPI(config);
            } catch (retryError) {
                return Promise.reject(retryError);
            }
        }

        return Promise.reject(error);
    }
);

// Function to set the auth token for backend requests
export const setAuthToken = (token) => {
    if (token) {
        backendAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('authToken', token);
    } else {
        delete backendAPI.defaults.headers.common['Authorization'];
        localStorage.removeItem('authToken');
    }
};

// Function to remove auth token
export const removeAuthToken = () => {
    delete backendAPI.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
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