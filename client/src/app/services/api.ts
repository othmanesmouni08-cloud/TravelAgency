import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

export const activityApi = {
    getAll: async () => {
        const response = await api.get('/activities');
        return response.data.data || response.data;
    },
    getById: async (id: string | number) => {
        const response = await api.get(`/activities/${id}`);
        return response.data.data || response.data;
    },
};

export const hotelApi = {
    getAll: async () => {
        const response = await api.get('/hotels');
        return response.data.data || response.data;
    },
};

export const carApi = {
    getAll: async () => {
        const response = await api.get('/cars');
        return response.data.data || response.data;
    },
};

export const authApi = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        return response.data.data || response.data;
    },
    signup: async (userData: any) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export default api;
