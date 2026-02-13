const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Car {
    _id: string;
    id: number;
    brand: string;
    model: string;
    seats: number;
    transmission: string;
    pricePerDay: number;
    available: boolean;
    imageUrl?: string; // Optional: URL to car image
}

export const carService = {
    async getAllCars(): Promise<Car[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cars`);
            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    async getCarById(id: number): Promise<Car> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cars/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch car');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching car:', error);
            throw error;
        }
    }
};
