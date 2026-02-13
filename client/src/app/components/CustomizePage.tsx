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
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 uppercase tracking-wider">Build Your Trip</span>
            <Sparkles className="w-6 h-6 text-teal-600" />
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-teal-900">Customize Your Package</h1>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
            Create your perfect Eastern Morocco adventure by selecting your preferences
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
              <Card className="border-teal-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Trip Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border-teal-200 mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="border-teal-200 mt-2"
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
              <Card className="border-teal-200 shadow-lg">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="flex items-center gap-2 text-teal-900">
                    <Car className="w-5 h-5 text-teal-600" />
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
                          className={`cursor-pointer transition-all ${selectedCar === car.id
                            ? 'border-teal-500 border-2 bg-teal-50 shadow-md'
                            : 'border-teal-200 hover:border-teal-400 hover:shadow-md'
                            }`}
                          onClick={() => setSelectedCar(car.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedCar === car.id ? 'bg-teal-500' : 'bg-teal-200'
                                  }`}>
                                  <Car className={`w-5 h-5 ${selectedCar === car.id ? 'text-white' : 'text-teal-700'}`} />
                                </div>
                                <div>
                                  <h4 className="text-lg text-teal-900">{car.name}</h4>
                                  <p className="text-teal-700">{car.price} MAD/day</p>
                                </div>
                              </div>
                              {selectedCar === car.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500 }}
                                >
                                  <Check className="w-6 h-6 text-teal-600" />
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
              <Card className="border-teal-200 shadow-lg">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="flex items-center gap-2 text-teal-900">
                    <Building2 className="w-5 h-5 text-teal-600" />
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
                          className={`cursor-pointer transition-all ${selectedHotel === hotel.id
                            ? 'border-teal-500 border-2 bg-teal-50 shadow-md'
                            : 'border-teal-200 hover:border-teal-400 hover:shadow-md'
                            }`}
                          onClick={() => setSelectedHotel(hotel.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedHotel === hotel.id ? 'bg-teal-500' : 'bg-teal-200'
                                  }`}>
                                  <Building2 className={`w-5 h-5 ${selectedHotel === hotel.id ? 'text-white' : 'text-teal-700'}`} />
                                </div>
                                <div>
                                  <h4 className="text-lg text-teal-900">{hotel.name}</h4>
                                  <p className="text-teal-700">{hotel.price} MAD/night</p>
                                </div>
                              </div>
                              {selectedHotel === hotel.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500 }}
                                >
                                  <Check className="w-6 h-6 text-teal-600" />
                                </motion.div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {hotel.features.map((feature, idx) => (
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

            {/* Destinations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-teal-200 shadow-lg">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="flex items-center gap-2 text-teal-900">
                    <MapPin className="w-5 h-5 text-teal-600" />
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
                          className={`cursor-pointer transition-all ${selectedDestinations.includes(dest.id)
                            ? 'border-teal-500 border-2 bg-teal-50 shadow-md'
                            : 'border-teal-200 hover:border-teal-400 hover:shadow-md'
                            }`}
                          onClick={() => toggleDestination(dest.id)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-teal-600" />
                              <div>
                                <h4 className="text-teal-900">{dest.name}</h4>
                                <p className="text-sm text-teal-700">{dest.days} days recommended</p>
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
              <Card className="border-teal-200 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Package Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-700">Duration:</span>
                      <span className="text-teal-900">{duration} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-700">Guests:</span>
                      <span className="text-teal-900">{guests} people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-700">Car:</span>
                      <span className="text-teal-900">
                        {selectedCar ? carOptions.find(c => c.id === selectedCar)?.name : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-700">Hotel:</span>
                      <span className="text-teal-900">
                        {selectedHotel ? hotelOptions.find(h => h.id === selectedHotel)?.name : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-700">Destinations:</span>
                      <span className="text-teal-900">{selectedDestinations.length} selected</span>
                    </div>
                  </div>

                  <div className="border-t border-teal-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-teal-900">Estimated Total:</span>
                      <motion.span
                        key={calculateTotal()}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-3xl text-teal-900"
                      >
                        {calculateTotal()} MAD
                      </motion.span>
                    </div>
                    <p className="text-xs text-teal-600">*Final price may vary based on availability</p>
                  </div>

                  <Button
                    onClick={handleSavePackage}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700"
                    size="lg"
                  >
                    Save & Continue to Booking
                  </Button>

                  <div className="bg-teal-50 rounded-lg p-4 space-y-2">
                    <h4 className="text-sm text-teal-900 mb-2">What's Included:</h4>
                    <ul className="space-y-1 text-xs text-teal-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 mt-0.5 text-teal-600" />
                        All accommodations
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 mt-0.5 text-teal-600" />
                        Vehicle rental
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 mt-0.5 text-teal-600" />
                        Destination guides
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 mt-0.5 text-teal-600" />
                        24/7 support
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
