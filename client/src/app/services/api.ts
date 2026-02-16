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

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
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
    getAll: async (params?: { available?: boolean }) => {
        const response = await api.get('/cars', { params });
        return response.data.data || response.data;
    },
    create: async (data: any) => {
        const response = await api.post('/cars', data);
        return response.data;
    },
    update: async (id: string | number, data: any) => {
        const response = await api.put(`/cars/${id}`, data);
        return response.data;
    },
    delete: async (id: string | number) => {
        const response = await api.delete(`/cars/${id}`);
        return response.data;
    }
};

export const paymentApi = {
    checkout: async (data: { cart: any[], amount: number, customerName: string, paymentMethod: string }) => {
        const response = await api.post('/payments/checkout', data);
        return response.data;
    }
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
    forgotPassword: async (email: string) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },
    resetPassword: async (token: string, password: any) => {
        const response = await api.post(`/auth/reset-password/${token}`, { password });
        return response.data;
    },
};

export default api;
