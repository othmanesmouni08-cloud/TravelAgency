<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Building2, Star, Wifi, Coffee, Waves, UtensilsCrossed, MapPin, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { hotelApi } from '@/app/services/api';
import { CartItem } from '@/app/App';

const AMENITY_MAP: { [key: string]: any } = {
  Wifi,
  Coffee,
  UtensilsCrossed,
  Waves,
};

interface Hotel {
  id: string | number;
  name: string;
  location: string;
  price?: number;
  pricePerNight?: number;
  rating: number;
  category: string;
  image: string;
  features: string[];
  amenities: string[];
}

=======
import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Building2, Star, Wifi, Coffee, Waves, UtensilsCrossed, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';

const hotelOptions = [
  {
    id: 'budget',
    name: 'Comfort Hotel Oujda',
    location: 'Oujda City Center',
    price: 450,
    rating: 4.2,
    category: 'All Hotels',
    image: 'https://images.unsplash.com/photo-1760681556948-40cd26936ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwcmlhZCUyMGhvdGVsJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY5NzAyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Free Breakfast', 'WiFi', 'City Center', 'Airport Shuttle'],
    amenities: [Wifi, Coffee, UtensilsCrossed]
  },
  {
    id: 'riad-oujda',
    name: 'Traditional Riad Oujda',
    location: 'Oujda Medina',
    price: 750,
    rating: 4.7,
    category: 'Riads',
    image: 'https://images.unsplash.com/photo-1760681556948-40cd26936ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwcmlhZCUyMGhvdGVsJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY5NzAyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Authentic Experience', 'Rooftop Terrace', 'Traditional Breakfast', 'Courtyard Pool'],
    amenities: [Coffee, UtensilsCrossed, Waves]
  },
  {
    id: 'saidia-resort',
    name: 'Saidia Beach Resort',
    location: 'Saidia Beach',
    price: 120,
    rating: 4.8,
    category: 'Beach Resorts',
    image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmx1ZSUyMGNpdHklMjBjaGVmY2hhb3VlbnxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Beachfront', 'Spa & Wellness', 'Pool & Bar', 'Water Sports'],
    amenities: [Wifi, Waves, UtensilsCrossed, Coffee]
  },
  {
    id: 'luxury-oujda',
    name: 'Luxury Hotel Oujda',
    location: 'Oujda Business District',
    price: 1500,
    rating: 4.9,
    category: 'All Hotels',
    image: 'https://images.unsplash.com/photo-1760681556948-40cd26936ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwcmlhZCUyMGhvdGVsJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY5NzAyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['5-Star Service', 'Spa Access', 'Fine Dining', 'Concierge', 'Business Center'],
    amenities: [Wifi, Coffee, UtensilsCrossed, Waves]
  },
  {
    id: 'desert-camp',
    name: 'Luxury Desert Camp Figuig',
    location: 'Figuig Oasis',
    price: 1200,
    rating: 5.0,
    category: 'Desert Camps',
    image: 'https://images.unsplash.com/photo-1644028735064-4b124c4f7f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZmlndWlnJTIwb2FzaXMlMjBwYWxtfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Luxury Tents', 'Traditional Dinner', 'Stargazing', 'Camel Ride Included'],
    amenities: [Coffee, UtensilsCrossed]
  },
  {
    id: 'mountain-lodge',
    name: 'Atlas Mountain Lodge',
    location: 'Middle Atlas',
    price: 900,
    rating: 4.6,
    category: 'Mountain Lodges',
    image: 'https://images.unsplash.com/photo-1762059063714-d3ea86a09d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWlkZGxlJTIwYXRsYXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NzAyNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Mountain Views', 'Hiking Access', 'Traditional Food', 'Fireplace', 'Terrace'],
    amenities: [Wifi, Coffee, UtensilsCrossed]
  }
];

import { CartItem } from '@/app/App';

>>>>>>> Taoufiq
interface HotelsPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function HotelsPage({ addToCart, cart }: HotelsPageProps) {
  const [activeFilter, setActiveFilter] = useState('All Hotels');
<<<<<<< HEAD
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await hotelApi.getAll();
        setHotels(Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hotels');
        toast.error('Could not load hotels from server');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleReserve = (hotel: Hotel) => {
    if (cart.some(item => String(item.id) === String(hotel.id) && item.type === 'hotel')) {
      toast.info('This hotel is already in your basket');
      return;
    }
    const price = hotel.price || hotel.pricePerNight || 0;
    addToCart({
      id: String(hotel.id),
      name: hotel.name,
      price: price,
=======

  const handleReserve = (hotel: any) => {
    if (cart.some(item => item.id === hotel.id && item.type === 'hotel')) {
      toast.info('This hotel is already in your basket');
      return;
    }
    addToCart({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price,
>>>>>>> Taoufiq
      type: 'hotel',
      image: hotel.image,
      details: hotel.location
    });
    toast.success('Hotel added to basket!');
  };

<<<<<<< HEAD
  const safeHotels = Array.isArray(hotels) ? hotels.filter(h => !!h && !!h.id) : [];

  const filteredHotels = activeFilter === 'All Hotels'
    ? safeHotels
    : safeHotels.filter(hotel => hotel.category === activeFilter);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Accommodations</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Find Your Perfect Stay</h1>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
=======
  const filteredHotels = activeFilter === 'All Hotels'
    ? hotelOptions
    : hotelOptions.filter(hotel => hotel.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 uppercase tracking-wider">Accommodations</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-teal-900">Find Your Perfect Stay</h1>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
>>>>>>> Taoufiq
            From authentic riads to luxury resorts - discover the best accommodations in Eastern Morocco
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All Hotels', 'Riads', 'Beach Resorts', 'Desert Camps', 'Mountain Lodges'].map((filter) => (
            <Badge
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? 'default' : 'outline'}
<<<<<<< HEAD
              className={`${activeFilter === filter
                ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-none shadow-lg shadow-teal-500/20'
                : 'border-white/10 text-teal-100/60 hover:bg-white/5 hover:border-teal-500/30'
                } cursor-pointer transition-all px-6 py-2.5 text-sm rounded-full`}
=======
              className={`${activeFilter === filter ? 'bg-teal-600 text-white' : 'border-teal-300 text-teal-700 hover:bg-teal-50'} cursor-pointer transition-all px-4 py-2 text-sm`}
>>>>>>> Taoufiq
            >
              {filter}
            </Badge>
          ))}
        </div>

<<<<<<< HEAD
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
            <p className="text-teal-100/60 text-lg">Finding the best rooms for you...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" className="text-white border-white/20">
              Retry Connection
            </Button>
          </div>
        )}

=======
>>>>>>> Taoufiq
        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <Card
              key={hotel.id}
<<<<<<< HEAD
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden group"
=======
              className="border-teal-200 hover:shadow-xl overflow-hidden transition-all"
>>>>>>> Taoufiq
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
<<<<<<< HEAD
                  <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-lg px-3 py-1 border-none shadow-lg">
                    {hotel.price || hotel.pricePerNight} MAD/night
=======
                  <Badge className="bg-teal-600 text-white text-lg px-3 py-1">
                    {hotel.price} MAD/night
>>>>>>> Taoufiq
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-teal-900 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl text-white mb-1">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Amenities Icons */}
<<<<<<< HEAD
                <div className="flex gap-4 mb-4 pb-4 border-b border-white/5">
                  {hotel.amenities?.map((amenityName, idx) => {
                    const Icon = AMENITY_MAP[amenityName] || Building2;
                    return <Icon key={idx} className="w-5 h-5 text-cyan-400" />;
                  })}
=======
                <div className="flex gap-3 mb-4 pb-4 border-b border-teal-100">
                  {hotel.amenities.map((Icon, idx) => (
                    <Icon key={idx} className="w-5 h-5 text-teal-600" />
                  ))}
>>>>>>> Taoufiq
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
<<<<<<< HEAD
                  {hotel.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-teal-100/60">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
=======
                  {hotel.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-teal-700">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
>>>>>>> Taoufiq
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleReserve(hotel)}
<<<<<<< HEAD
                  className={`w-full ${cart.some(item => String(item.id) === String(hotel.id))
=======
                  className={`w-full ${cart.some(item => item.id === hotel.id)
>>>>>>> Taoufiq
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700'
                    }`}
                >
<<<<<<< HEAD
                  {cart.some(item => String(item.id) === String(hotel.id)) ? 'In Basket ✓' : 'Reserve Now'}
=======
                  {cart.some(item => item.id === hotel.id) ? 'In Basket ✓' : 'Reserve Now'}
>>>>>>> Taoufiq
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
<<<<<<< HEAD
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              <h3 className="text-2xl text-white mb-8 text-center font-bold">Why Book With Us?</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-500/30">
                    <Star className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Best Price Guarantee</h4>
                  <p className="text-sm text-teal-100/60 leading-relaxed">Lowest rates guaranteed with direct hotel partnerships</p>
                </div>
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-500/30">
                    <Building2 className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Verified Properties</h4>
                  <p className="text-sm text-teal-100/60 leading-relaxed">All properties personally inspected for quality and authenticity</p>
                </div>
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-500/30">
                    <Wifi className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
                  <p className="text-sm text-teal-100/60 leading-relaxed">Dedicated regional support team available around the clock</p>
=======
          <Card className="border-teal-200">
            <CardContent className="p-8">
              <h3 className="text-2xl text-teal-900 mb-6 text-center">Why Book With Us?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="text-teal-900 mb-2">Best Price Guarantee</h4>
                  <p className="text-sm text-teal-700">Lowest rates guaranteed</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="text-teal-900 mb-2">Verified Properties</h4>
                  <p className="text-sm text-teal-700">All hotels personally inspected</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wifi className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="text-teal-900 mb-2">24/7 Support</h4>
                  <p className="text-sm text-teal-700">We're here to help anytime</p>
>>>>>>> Taoufiq
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
