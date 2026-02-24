import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Backend Hotel Interface (matches backend model)
export interface BackendHotel {
    _id?: string;
    id: number;
    name: string;
    location: string;
    image: string;
    pricePerNight: number;
    rating: number;
    available: boolean;
    features: string[];
    services: {
        name: string;
        price: number;
        type: 'food' | 'activity' | 'other';
    }[];
    createdAt?: string;
    updatedAt?: string;
}


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
    create: async (data: any) => {
        const response = await api.post('/activities', data);
        return response.data;
    },
    update: async (id: string | number, data: any) => {
        const response = await api.put(`/activities/${id}`, data);
        return response.data;
    },
    delete: async (id: string | number) => {
        const response = await api.delete(`/activities/${id}`);
        return response.data;
    }
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
    checkout: async (data: { cart: any[], customerName: string, emailAddress: string, phoneNumber: string, specialRequest?: string, paymentMethod: string }) => {
        const response = await api.post('/payments/checkout', data);
        return response.data.data; // Expected { clientSecret, paymentId, amount }
    },
    confirmPayment: async (data: { paymentIntentId: string, paymentId: string }) => {
        const response = await api.post('/payments/confirm-payment', data);
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

export const bookingApi = {
    getAll: async () => {
        const response = await api.get('/bookings');
        console.log("Bookings API Response:", response); // Log the full response
        // Handle cases where response.data is the array or response.data.data is the array
        const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
        return data;
    },
    getMyBookings: async () => {
        const response = await api.get('/bookings/my-bookings');
        const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
        return data;
    },
    updateStatus: async (id: string, status: string) => {
        const response = await api.put(`/bookings/${id}/status`, { status });
        return response.data;
    },
    requestCancellation: async (id: string) => {
        const response = await api.put(`/bookings/${id}/request-cancel`);
        return response.data;
    },
    requestChange: async (id: string, changeDetails: string) => {
        const response = await api.put(`/bookings/${id}/request-change`, { changeDetails });
        return response.data;
    }
};

export const adminApi = {
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    }
};

export default api;
