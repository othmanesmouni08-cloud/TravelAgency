<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Car, Check, Users, Gauge, Settings, Shield, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { carApi } from '@/app/services/api';
import { CartItem } from '@/app/App';

interface CarOption {
  id: string | number;
  name: string;
  price?: number;
  pricePerDay?: number;
  image: string;
  features: string[];
  specs: {
    passengers: number;
    luggage: number;
    transmission: string;
    fuel: string;
  };
}
=======
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Slider } from '@/app/components/ui/slider';

import { Car, Check, Users, Gauge, Settings, Shield, Loader2, Calendar as CalendarIcon, MapPin, Filter, X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { carService, Car as BackendCar } from '@/services/api';
import { CartItem } from '@/app/App';
import { differenceInDays, format, addDays } from 'date-fns';
>>>>>>> Taoufiq

interface CarsPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

<<<<<<< HEAD
export function CarsPage({ addToCart, cart }: CarsPageProps) {
  const [cars, setCars] = useState<CarOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

=======
// Helper function to get car image - prioritizes backend imageUrl, falls back to brand mapping
const getCarImage = (brand: string, imageUrl?: string): string => {
  // If backend provides an imageUrl, use it
  if (imageUrl) {
    return imageUrl;
  }

  // Otherwise, fall back to brand-based mapping
  const carImages: Record<string, string> = {
    'dacia': 'https://images.unsplash.com/photo-1632245889029-e406fbdd1992?auto=format&fit=crop&w=800&q=80',
    'volkswagen': 'https://images.unsplash.com/photo-1606016159991-fed45aa70183?auto=format&fit=crop&w=800&q=80',
    'range rover': 'https://images.unsplash.com/photo-1621111624536-6bb83786175e?auto=format&fit=crop&w=800&q=80',
    'mercedes': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    'bmw': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    'audi': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    'toyota': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
    'honda': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    'ford': 'https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=800&q=80',
  };

  const key = brand.toLowerCase();
  return carImages[key] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80';
};

// Helper function to get features based on transmission and seats
const getCarFeatures = (transmission: string, seats: number): string[] => {
  const baseFeatures = ['Air Conditioning', 'GPS Navigation'];
  if (transmission.toLowerCase() === 'automatic') {
    baseFeatures.push('Automatic Transmission');
  } else {
    baseFeatures.push('Manual Transmission');
  }
  baseFeatures.push(`${seats} Seats`);
  if (seats >= 7) {
    baseFeatures.push('Extra Luggage Space');
  }
  return baseFeatures;
};

export function CarsPage({ addToCart, cart }: CarsPageProps) {
  const [cars, setCars] = useState<BackendCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter State
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [minSeats, setMinSeats] = useState<string>("any");

  // Derived state for filters
  const [maxPrice, setMaxPrice] = useState(1000);

  // Dialog state
  const [selectedCar, setSelectedCar] = useState<BackendCar | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    pickupLocation: 'Oujda Airport',
    dropoffLocation: 'Oujda Airport',
    startDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
  });

>>>>>>> Taoufiq
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
<<<<<<< HEAD
        const data = await carApi.getAll();
        setCars(Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cars');
        toast.error('Could not load vehicles from server');
=======
        const data = await carService.getAllCars();
        // Filter only available cars
        const availableCars = data.filter(car => car.available);
        setCars(availableCars);

        // Calculate max price for slider
        if (availableCars.length > 0) {
          const prices = availableCars.map(c => c.pricePerDay);
          const max = Math.ceil(Math.max(...prices) / 100) * 100; // Round up to nearest hundred
          setMaxPrice(max);
          setPriceRange([0, max]);
        }

        setError(null);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        toast.error('Failed to load cars from server');
        console.error('Error fetching cars:', err);
>>>>>>> Taoufiq
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

<<<<<<< HEAD
  const handleReserve = (car: CarOption) => {
    if (!car) return;
    if (cart.some(item => String(item.id) === String(car.id) && item.type === 'car')) {
      toast.info('This car is already in your basket');
      return;
    }
    const price = car.price || car.pricePerDay || 0;
    addToCart({
      id: String(car.id),
      name: car.name,
      price: price,
      type: 'car',
      image: car.image,
      details: `${car.specs?.passengers || 5} Seats, ${car.specs?.transmission || 'Auto'}`
    });
  };

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
            <Car className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Car Rental</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Choose Your Perfect Vehicle</h1>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
=======
  // Filter Logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Price Filter
      if (car.pricePerDay < priceRange[0] || car.pricePerDay > priceRange[1]) return false;

      // Brand Filter
      if (selectedBrand !== "all" && car.brand !== selectedBrand) return false;

      // Transmission Filter
      if (selectedTransmission !== "all" && car.transmission.toLowerCase() !== selectedTransmission.toLowerCase()) return false;

      // Seats Filter
      if (minSeats !== "any" && car.seats < parseInt(minSeats)) return false;

      return true;
    });
  }, [cars, priceRange, selectedBrand, selectedTransmission, minSeats]);

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(cars.map(c => c.brand))).sort();
  }, [cars]);

  // Handlers
  const clearFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedBrand("all");
    setSelectedTransmission("all");
    setMinSeats("any");
  };

  const activeFiltersCount = [
    selectedBrand !== "all",
    selectedTransmission !== "all",
    minSeats !== "any",
    priceRange[0] > 0 || priceRange[1] < maxPrice
  ].filter(Boolean).length;

  const handleOpenBooking = (car: BackendCar) => {
    if (cart.some(item => item.id === car.id.toString() && item.type === 'car')) {
      toast.info('This car is already in your basket');
      return;
    }
    setSelectedCar(car);
    setIsDialogOpen(true);
  };

  const calculateTotal = () => {
    if (!selectedCar) return 0;
    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    const days = differenceInDays(end, start);
    return days > 0 ? days * selectedCar.pricePerDay : 0;
  };

  const handleConfirmBooking = () => {
    if (!selectedCar) return;

    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    const days = differenceInDays(end, start);

    if (days <= 0) {
      toast.error('End date must be after start date');
      return;
    }

    if (!bookingDetails.pickupLocation || !bookingDetails.dropoffLocation) {
      toast.error('Please select pickup and dropoff locations');
      return;
    }

    const total = days * selectedCar.pricePerDay;

    addToCart({
      id: selectedCar.id.toString(),
      name: `${selectedCar.brand} ${selectedCar.model}`,
      price: total,
      type: 'car',
      image: getCarImage(selectedCar.brand, selectedCar.imageUrl),
      details: `${selectedCar.seats} Seats, ${selectedCar.transmission}`,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      pickupLocation: bookingDetails.pickupLocation,
      dropoffLocation: bookingDetails.dropoffLocation,
      totalDays: days
    });

    setIsDialogOpen(false);
    setSelectedCar(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
          <p className="text-xl text-teal-700">Loading available cars...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Car className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl text-red-600 mb-2">Failed to Load Cars</h2>
            <p className="text-teal-700 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 uppercase tracking-wider">Car Rental</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-teal-900">Choose Your Perfect Vehicle</h1>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
>>>>>>> Taoufiq
            Select from our premium fleet designed for exploring Eastern Morocco's diverse landscapes
          </p>
        </div>

<<<<<<< HEAD
=======
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-4 mb-12 max-w-5xl mx-auto sticky top-24 z-30">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto text-teal-800 font-medium">
              <Filter className="w-5 h-5 text-teal-600" />
              <span>Filters</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {/* Brand Select */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full border-teal-200">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {uniqueBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Slider */}
              <div className="flex flex-col justify-center px-4 py-2 bg-white border border-teal-200 rounded-md h-10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-teal-600 font-medium uppercase tracking-wider">Price Range</span>
                  <span className="text-[10px] text-teal-800 font-bold">{priceRange[0]} - {priceRange[1]} MAD</span>
                </div>
                <Slider
                  defaultValue={[0, maxPrice]}
                  value={priceRange}
                  max={maxPrice}
                  step={50}
                  onValueChange={setPriceRange}
                  className="py-1 cursor-pointer"
                />
              </div>

              {/* Transmission Select */}
              <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                <SelectTrigger className="w-full border-teal-200">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Transmission</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>

              {/* Seats Select */}
              <Select value={minSeats} onValueChange={setMinSeats}>
                <SelectTrigger className="w-full border-teal-200">
                  <SelectValue placeholder="Seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Seats</SelectItem>
                  <SelectItem value="2">2+ Seats</SelectItem>
                  <SelectItem value="4">4+ Seats</SelectItem>
                  <SelectItem value="5">5+ Seats</SelectItem>
                  <SelectItem value="7">7+ Seats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFilters}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                title="Clear all filters"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

>>>>>>> Taoufiq
        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {[
            { icon: Shield, text: 'Full Insurance' },
            { icon: Users, text: 'Airport Pickup' },
            { icon: Settings, text: '24/7 Support' },
            { icon: Gauge, text: 'Unlimited Miles' }
<<<<<<< HEAD
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-teal-500/30 transition-all duration-300 text-center group">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-teal-100/80 font-medium">{benefit.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
            <p className="text-teal-100/60 text-lg">Warming up the engines...</p>
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

        {/* Car Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(cars || []).filter(car => !!car && !!car.id).map((car) => (
            <Card
              key={car.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-lg px-3 py-1 border-none shadow-lg">
                    {car.price || car.pricePerDay} MAD/day
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl text-white font-bold mb-4">{car.name}</h3>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-sm text-teal-100/60">
                    <Users className="w-4 h-4 text-cyan-400" />
                    {car.specs?.passengers} Seats
                  </div>
                  <div className="flex items-center gap-2 text-sm text-teal-100/60">
                    <Car className="w-4 h-4 text-cyan-400" />
                    {car.specs?.luggage} Bags
                  </div>
                  <div className="text-sm text-teal-100/60">
                    {car.specs?.transmission}
                  </div>
                  <div className="text-sm text-teal-100/60">
                    {car.specs?.fuel}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {car.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-teal-100/60">
                      <Check className="w-4 h-4 text-cyan-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleReserve(car)}
                  className={`w-full ${cart.some(item => String(item.id) === String(car.id))
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700'
                    }`}
                >
                  {cart.some(item => String(item.id) === String(car.id)) ? 'In Basket ✓' : 'Select Vehicle'}
                </Button>
=======
          ].map((benefit, idx) => (
            <Card key={idx} className="border-teal-200 text-center">
              <CardContent className="p-6">
                <benefit.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <p className="text-teal-800">{benefit.text}</p>
>>>>>>> Taoufiq
              </CardContent>
            </Card>
          ))}
        </div>

<<<<<<< HEAD
        {/* Additional Info */}
        <Card className="mt-16 max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border-b border-white/5">
            <CardTitle className="text-white">Rental Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-cyan-400" />
                  What's Included
                </h4>
                <ul className="space-y-3 text-teal-100/60">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    Full comprehensive insurance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    Unlimited mileage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    24/7 roadside assistance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
=======
        {/* Car Grid - Using Backend Data */}
        {filteredCars.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-12 text-center max-w-2xl mx-auto mb-16">
            <Car className="w-16 h-16 text-teal-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-teal-900 mb-2">No cars found</h3>
            <p className="text-teal-600 mb-6">Try adjusting your filters to find available vehicles.</p>
            <Button onClick={clearFilters} variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => {
              const carImage = getCarImage(car.brand, car.imageUrl);
              const carFeatures = getCarFeatures(car.transmission, car.seats);
              const carName = `${car.brand} ${car.model}`;

              return (
                <Card
                  key={car.id}
                  className="border-teal-200 hover:shadow-xl overflow-hidden transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={carImage}
                      alt={carName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-teal-600 text-white text-lg px-3 py-1">
                        {car.pricePerDay} MAD/day
                      </Badge>
                    </div>
                    {cart.some(item => item.id === car.id.toString() && item.type === 'car') && (
                      <div className="absolute inset-0 bg-teal-900/60 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="text-white font-bold text-lg flex items-center gap-2">
                          <Check className="w-6 h-6" /> In Cart
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl text-teal-900 mb-4">{carName}</h3>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-teal-100">
                      <div className="flex items-center gap-2 text-sm text-teal-700">
                        <Users className="w-4 h-4" />
                        {car.seats} Seats
                      </div>
                      <div className="flex items-center gap-2 text-sm text-teal-700">
                        <Gauge className="w-4 h-4" />
                        {car.transmission}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {carFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-teal-700">
                          <Check className="w-4 h-4 text-teal-600" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleOpenBooking(car)}
                      disabled={!car.available}
                      className={`w-full ${cart.some(item => item.id === car.id.toString() && item.type === 'car')
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700'
                        }`}
                    >
                      {cart.some(item => item.id === car.id.toString() && item.type === 'car')
                        ? 'In Basket ✓'
                        : car.available
                          ? 'Select Vehicle'
                          : 'Not Available'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Additional Info */}
        <Card className="mt-16 max-w-4xl mx-auto border-teal-200">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <CardTitle>Rental Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-teal-900 mb-3">What's Included</h4>
                <ul className="space-y-2 text-teal-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-teal-600 mt-0.5" />
                    Full comprehensive insurance
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-teal-600 mt-0.5" />
                    Unlimited mileage
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-teal-600 mt-0.5" />
                    24/7 roadside assistance
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-teal-600 mt-0.5" />
>>>>>>> Taoufiq
                    Airport pickup & drop-off (Oujda)
                  </li>
                </ul>
              </div>
              <div>
<<<<<<< HEAD
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  Requirements
                </h4>
                <ul className="space-y-3 text-teal-100/60">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    Valid driver's license (min. 1 year)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    Minimum age: 21 years old
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    International permit (non-EU)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></span>
                    Credit card for deposit
                  </li>
=======
                <h4 className="text-teal-900 mb-3">Requirements</h4>
                <ul className="space-y-2 text-teal-700">
                  <li>• Valid driver's license (minimum 1 year)</li>
                  <li>• Minimum age: 21 years old</li>
                  <li>• International driving permit (for non-EU)</li>
                  <li>• Credit card for deposit</li>
>>>>>>> Taoufiq
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
<<<<<<< HEAD
    </div>
=======

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedCar?.brand} {selectedCar?.model}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-600" />
                <Input
                  id="pickup"
                  value={bookingDetails.pickupLocation}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, pickupLocation: e.target.value })}
                  className="pl-9"
                  placeholder="Enter pickup location"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dropoff">Dropoff Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-600" />
                <Input
                  id="dropoff"
                  value={bookingDetails.dropoffLocation}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, dropoffLocation: e.target.value })}
                  className="pl-9"
                  placeholder="Enter dropoff location"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">From</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-600" />
                  <Input
                    id="startDate"
                    type="date"
                    value={bookingDetails.startDate}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, startDate: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">To</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-600" />
                  <Input
                    id="endDate"
                    type="date"
                    value={bookingDetails.endDate}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, endDate: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {selectedCar && (
              <div className="bg-teal-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-700">Days</span>
                  <span className="font-semibold text-teal-900">
                    {differenceInDays(new Date(bookingDetails.endDate), new Date(bookingDetails.startDate))}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-700">Price per day</span>
                  <span className="font-semibold text-teal-900">{selectedCar.pricePerDay} MAD</span>
                </div>
                <div className="border-t border-teal-200 pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold text-teal-900">Total</span>
                  <span className="text-xl font-bold text-teal-700">{calculateTotal()} MAD</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmBooking} className="bg-teal-600 hover:bg-teal-700 text-white">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
>>>>>>> Taoufiq
  );
}
