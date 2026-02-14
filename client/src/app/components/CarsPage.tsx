import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Car, Check, Users, Gauge, Settings, Shield, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { carApi } from '@/app/services/api';
import { CartItem } from '@/app/App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { format, addDays, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { DateRange } from 'react-day-picker';
import { CarFilters, FilterState } from '@/app/components/CarFilters';

interface CarOption {
  id: string | number;
  name: string;
  brand: string;
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

interface CarsPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function CarsPage({ addToCart, cart }: CarsPageProps) {
  const [cars, setCars] = useState<CarOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [pickupLocation, setPickupLocation] = useState("Oujda Airport");
  const [dropoffLocation, setDropoffLocation] = useState("Oujda Airport");

  // Initialize priceRange with 0-1000 temporarily. Will update when cars load.
  const [filters, setFilters] = useState<FilterState>({
    brand: "all",
    priceRange: [0, 1000],
    transmission: "all",
    seats: "any",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carApi.getAll({ available: true });
        const rawCars = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);

        // Map backend data to frontend interface
        const mappedCars: CarOption[] = rawCars.map((car: any) => ({
          id: car.id || car._id,
          brand: car.brand || 'Unknown',
          name: car.brand + (car.model ? ` ${car.model}` : ''),
          price: car.pricePerDay || car.price,
          pricePerDay: car.pricePerDay || car.price,
          image: car.imageUrl || car.image || '/images/cars/default.jpg',
          features: car.features || ['Air Conditioning', 'Bluetooth', 'GPS'], // Defaults if missing
          specs: {
            passengers: car.seats || 4,
            luggage: 2, // Default
            transmission: car.transmission || 'Manual',
            fuel: car.fuel || 'Petrol' // Default
          }
        }));

        setCars(mappedCars);

        // Calculate max price and update filters if needed
        if (mappedCars.length > 0) {
          const max = Math.max(...mappedCars.map(c => c.price || c.pricePerDay || 0));
          setFilters(prev => ({
            ...prev,
            priceRange: [0, max]
          }));
        }

        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cars');
        toast.error('Could not load vehicles from server');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const calculateTotal = () => {
    if (!date?.from || !date?.to || !selectedCar) return 0;
    const days = differenceInDays(date.to, date.from) + 1;
    const price = selectedCar.pricePerDay || selectedCar.price || 0;
    return days * price;
  };

  const getMaxPrice = () => {
    if (!cars.length) return 1000;
    return Math.max(...cars.map(car => car.price || car.pricePerDay || 0));
  };

  const getBrands = () => {
    const brands = new Set(cars.map(car => car.brand));
    return Array.from(brands);
  };

  const filteredCars = cars.filter(car => {
    // Brand Filter
    if (filters.brand !== 'all' && car.brand !== filters.brand) return false;

    // Price Filter (Range)
    const carPrice = car.price || car.pricePerDay || 0;
    if (carPrice < filters.priceRange[0] || carPrice > filters.priceRange[1]) return false;

    // Transmission Filter
    if (filters.transmission !== 'all' && car.specs.transmission !== filters.transmission) return false;

    // Seats Filter
    if (filters.seats !== 'any') {
      const minSeats = parseInt(filters.seats);
      if (car.specs.passengers < minSeats) return false;
    }

    return true;
  });

  const handleReserve = (car: CarOption) => {
    setSelectedCar(car);
    setIsDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedCar || !date?.from || !date?.to) {
      toast.error("Please select dates for your booking");
      return;
    }

    addToCart({
      id: String(selectedCar.id),
      name: selectedCar.name,
      price: calculateTotal(),
      type: 'car',
      image: selectedCar.image,
      details: `${differenceInDays(date.to, date.from) + 1} Days, ${pickupLocation} -> ${dropoffLocation}`,
      startDate: format(date.from, 'yyyy-MM-dd'),
      endDate: format(date.to, 'yyyy-MM-dd'),
      pickupLocation,
      dropoffLocation,
      totalDays: differenceInDays(date.to, date.from) + 1
    });

    setIsDialogOpen(false);
    toast.success("Added to basket!");
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
            Select from our premium fleet designed for exploring Eastern Morocco's diverse landscapes
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {[
            { icon: Shield, text: 'Full Insurance' },
            { icon: Users, text: 'Airport Pickup' },
            { icon: Settings, text: '24/7 Support' },
            { icon: Gauge, text: 'Unlimited Miles' }
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

        {/* Car Filters */}
        <CarFilters
          filters={filters}
          setFilters={setFilters}
          brands={getBrands()}
          maxPrice={getMaxPrice()}
        />

        {/* Car Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filteredCars || []).filter(car => !!car && !!car.id).map((car) => (
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
              </CardContent>
            </Card>
          ))}
        </div>

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
                    Airport pickup & drop-off (Oujda)
                  </li>
                </ul>
              </div>
              <div>
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
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-teal-900">Customize Your Rental</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-teal-900">Dates</label>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-teal-200 text-teal-900",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    className="bg-white text-teal-900 border-none shadow-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-teal-900">Pickup</label>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger className="border-teal-200 text-teal-900">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Oujda Airport">Oujda Airport</SelectItem>
                    <SelectItem value="Oujda City Center">Oujda City Center</SelectItem>
                    <SelectItem value="Saidia">Saidia</SelectItem>
                    <SelectItem value="Berkane">Berkane</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-teal-900">Dropoff</label>
                <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                  <SelectTrigger className="border-teal-200 text-teal-900">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Oujda Airport">Oujda Airport</SelectItem>
                    <SelectItem value="Oujda City Center">Oujda City Center</SelectItem>
                    <SelectItem value="Saidania">Saidia</SelectItem>
                    <SelectItem value="Berkane">Berkane</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedCar && date?.from && date?.to && (
              <div className="bg-teal-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-700">Days</span>
                  <span className="font-semibold text-teal-900">{differenceInDays(date.to, date.from) + 1}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-700">Price per day</span>
                  <span className="font-semibold text-teal-900">{selectedCar.pricePerDay || selectedCar.price} MAD</span>
                </div>
                <div className="border-t border-teal-200 pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold text-teal-900">Total</span>
                  <span className="text-xl font-bold text-teal-700">{calculateTotal()} MAD</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-teal-200 text-teal-900 hover:bg-teal-50">Cancel</Button>
            <Button onClick={handleConfirmBooking} className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
