import { LucideIcon, Wifi, Coffee, Waves, UtensilsCrossed } from 'lucide-react';
import { BackendHotel } from '@/app/services/api';

// Frontend Hotel Interface (includes UI-specific fields)
export interface FrontendHotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  features: string[];
  amenities: LucideIcon[];
  services: {
    name: string;
    price: number;
    type: 'food' | 'activity' | 'other';
  }[];
}

/* 
  Transform backend hotel data to frontend format
  Adds default values for missing fields like category, features, and amenities
 */
export function transformHotelData(backendHotel: BackendHotel): FrontendHotel {
  // Determine category based on location and name
  let category = 'All Hotels';
  const locationLower = backendHotel.location.toLowerCase();
  const nameLower = backendHotel.name.toLowerCase();
  
  if (locationLower.includes('beach') || locationLower.includes('saidia')) {
    category = 'Beach Resorts';
  } else if (nameLower.includes('riad') || locationLower.includes('medina')) {
    category = 'Riads';
  } else if (locationLower.includes('desert') || locationLower.includes('figuig')) {
    category = 'Desert Camps';
  } else if (locationLower.includes('mountain') || locationLower.includes('atlas')) {
    category = 'Mountain Lodges';
  }
  
  // Use features from backend
  const features = backendHotel.features || [];
  
  // Default amenities (icons)
  const amenities: LucideIcon[] = [Wifi, Coffee, UtensilsCrossed];
  if (category === 'Beach Resorts' || category === 'Riads') {
    amenities.push(Waves);
  }
  
  return {
    id: (backendHotel.id || backendHotel._id || Math.random().toString()).toString(),
    name: backendHotel.name,
    location: backendHotel.location,
    price: backendHotel.pricePerNight,
    rating: backendHotel.rating,
    category,
    image: backendHotel.image || '',
    features,
    amenities,
    services: backendHotel.services || [],
  };
}
