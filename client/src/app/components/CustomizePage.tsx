import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Car, Building2, MapPin, Calendar, Check, Sparkles, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const carOptions = [
  { id: 'economy', name: 'Economy', price: 25, features: ['AC', 'Manual', '5 Seats'] },
  { id: 'suv', name: 'SUV 4x4', price: 65, features: ['AC', 'Auto', '7 Seats', '4WD'] },
  { id: 'luxury', name: 'Luxury', price: 95, features: ['Premium', 'Auto', '5 Seats'] },
];

const hotelOptions = [
  { id: 'budget', name: 'Comfort Hotel', price: 45, features: ['Breakfast', 'WiFi', 'Pool'] },
  { id: 'riad', name: 'Traditional Riad', price: 75, features: ['Authentic', 'Rooftop', 'Courtyard'] },
  { id: 'luxury', name: 'Beach Resort', price: 120, features: ['Beachfront', 'Spa', 'All Inclusive'] },
];

const destinations = [
  { id: 'oujda', name: 'Oujda', days: 2 },
  { id: 'saidia', name: 'Saidia Beach', days: 3 },
  { id: 'figuig', name: 'Figuig Oasis', days: 2 },
  { id: 'atlas', name: 'Middle Atlas', days: 2 },
];

export function CustomizePage() {
  const [duration, setDuration] = useState('7');
  const [guests, setGuests] = useState('2');
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== id));
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    const days = parseInt(duration);

    if (selectedCar) {
      const car = carOptions.find(c => c.id === selectedCar);
      if (car) total += car.price * days;
    }

    if (selectedHotel) {
      const hotel = hotelOptions.find(h => h.id === selectedHotel);
      if (hotel) total += hotel.price * days;
    }

    total += selectedDestinations.length * 50;

    return total;
  };

  const handleSavePackage = () => {
    if (!selectedCar || !selectedHotel || selectedDestinations.length === 0) {
      toast.error('Please select at least one option from each category');
      return;
    }
    toast.success('Package saved! Proceed to booking page to complete your reservation.');
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4 pt-26">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Plan Your Adventure</span>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Level Up Your Trip</h1>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
            Build your personalized experience - select the perfect combination for your journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Customization */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Trip Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="duration" className="text-teal-100/70 text-sm font-medium">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="bg-white/5 border-white/10 text-white h-12 focus:border-teal-500/50 transition-all font-bold text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="guests" className="text-teal-100/70 text-sm font-medium">Number of Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-white/5 border-white/10 text-white h-12 focus:border-teal-500/50 transition-all font-bold text-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>


            {/* Car Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Car className="w-5 h-5 text-cyan-400" />
                    Select Your Vehicle
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {carOptions.map((car) => (
                      <motion.div
                        key={car.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${selectedCar === car.id
                            ? 'border-teal-500 border-2 bg-teal-500/10 shadow-lg shadow-teal-500/10'
                            : 'bg-white/5 border-white/10 hover:border-teal-500/30'
                            }`}
                          onClick={() => setSelectedCar(car.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedCar === car.id ? 'bg-gradient-to-br from-teal-500 to-cyan-600' : 'bg-white/10'
                                  }`}>
                                  <Car className={`w-5 h-5 ${selectedCar === car.id ? 'text-white' : 'text-teal-100/60'}`} />
                                </div>
                                <div>
                                  <h4 className="text-lg text-white font-semibold">{car.name}</h4>
                                  <p className="text-teal-100/60 font-medium">{car.price} MAD/day</p>
                                </div>
                              </div>
                              {selectedCar === car.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500 }}
                                >
                                  <Check className="w-6 h-6 text-cyan-400" />
                                </motion.div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {car.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="border-teal-300 text-teal-700">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hotel Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    Choose Accommodation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {hotelOptions.map((hotel) => (
                      <motion.div
                        key={hotel.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${selectedHotel === hotel.id
                            ? 'border-teal-500 border-2 bg-teal-500/10 shadow-lg shadow-teal-500/10'
                            : 'bg-white/5 border-white/10 hover:border-teal-500/30'
                            }`}
                          onClick={() => setSelectedHotel(hotel.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedHotel === hotel.id ? 'bg-gradient-to-br from-teal-500 to-cyan-600' : 'bg-white/10'
                                  }`}>
                                  <Building2 className={`w-5 h-5 ${selectedHotel === hotel.id ? 'text-white' : 'text-teal-100/60'}`} />
                                </div>
                                <div>
                                  <h4 className="text-lg text-white font-semibold">{hotel.name}</h4>
                                  <p className="text-teal-100/60 font-medium">{hotel.price} MAD/night</p>
                                </div>
                              </div>
                              {selectedHotel === hotel.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500 }}
                                >
                                  <Check className="w-6 h-6 text-cyan-400" />
                                </motion.div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {hotel.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="border-white/10 text-teal-100/60 bg-white/5">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Destinations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden shadow-2xl">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    Select Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {destinations.map((dest) => (
                      <motion.div
                        key={dest.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${selectedDestinations.includes(dest.id)
                            ? 'border-teal-500 border-2 bg-teal-500/10 shadow-lg shadow-teal-500/10'
                            : 'bg-white/5 border-white/10 hover:border-teal-500/30'
                            }`}
                          onClick={() => toggleDestination(dest.id)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-cyan-400" />
                              <div>
                                <h4 className="text-white font-semibold">{dest.name}</h4>
                                <p className="text-sm text-teal-100/60">{dest.days} days recommended</p>
                              </div>
                            </div>
                            {selectedDestinations.includes(dest.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <Check className="w-5 h-5 text-teal-600" />
                              </motion.div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Package Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-100/60">Duration:</span>
                      <span className="font-bold text-white">{duration} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-100/60">Guests:</span>
                      <span className="font-bold text-white">{guests} people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-100/60">Car:</span>
                      <span className="font-bold text-white">
                        {selectedCar ? carOptions.find(c => c.id === selectedCar)?.name : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-100/60">Hotel:</span>
                      <span className="font-bold text-white">
                        {selectedHotel ? hotelOptions.find(h => h.id === selectedHotel)?.name : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-100/60">Destinations:</span>
                      <span className="font-bold text-white">{selectedDestinations.length} selected</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-teal-100/60 uppercase tracking-wider text-xs font-bold">Estimated Total</span>
                      <motion.span
                        key={calculateTotal()}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400"
                      >
                        {calculateTotal()} MAD
                      </motion.span>
                    </div>
                    <p className="text-xs text-teal-100/40 mb-6">*Final price may vary based on availability</p>

                    <Button
                      onClick={handleSavePackage}
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white h-14 rounded-xl shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-lg"
                    >
                      Save & Continue
                    </Button>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-4">
                    <h4 className="text-sm text-cyan-400 font-bold uppercase tracking-wider">What's Included:</h4>
                    <ul className="space-y-3 text-xs text-teal-100/60">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5" />
                        All luxury accommodations
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5" />
                        Premium vehicle rental
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5" />
                        Personalized route guides
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5" />
                        24/7 dedicated support
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
