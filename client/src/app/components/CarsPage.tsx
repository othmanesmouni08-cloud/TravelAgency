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

interface CarsPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function CarsPage({ addToCart, cart }: CarsPageProps) {
  const [cars, setCars] = useState<CarOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carApi.getAll();
        setCars(Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []));
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
    </div>
  );
}
