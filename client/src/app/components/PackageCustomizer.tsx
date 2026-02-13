import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Car, Building2, MapPin, Calendar, Users, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const carOptions = [
  { id: 'economy', name: 'Dacia Logan', price: 250, features: ['Air Conditioning', 'Manual', '5 Seats'] },
  { id: 'suv', name: 'Range Rover Sport', price: 650, features: ['Air Conditioning', 'Automatic', '7 Seats', '4WD'] },
  { id: 'luxury', name: 'Mercedes-Benz S-Class', price: 950, features: ['Premium Interior', 'Automatic', '5 Seats', 'GPS'] },
  { id: 'driver', name: 'Mercedes V-Class Chauffeur', price: 1500, features: ['Professional Driver', 'All Inclusive', 'Luxury Vehicle'] }
];

const hotelOptions = [
  { id: 'budget', name: 'Comfort Hotel', price: 45, features: ['Breakfast Included', 'WiFi', 'City Center'] },
  { id: 'riad', name: 'Traditional Riad', price: 85, features: ['Authentic Experience', 'Rooftop Terrace', 'Pool'] },
  { id: 'luxury', name: 'Luxury Resort', price: 150, features: ['5-Star Service', 'Spa Access', 'Fine Dining'] },
  { id: 'desert', name: 'Desert Camp', price: 120, features: ['Luxury Tents', 'Traditional Dinner', 'Camel Ride'] }
];

const activityOptions = [
  { id: 'city-tour', name: 'City Guided Tour', price: 35, duration: '4 hours' },
  { id: 'cooking', name: 'Cooking Class', price: 55, duration: '3 hours' },
  { id: 'desert', name: 'Desert Safari', price: 95, duration: 'Full day' },
  { id: 'camel', name: 'Camel Trekking', price: 45, duration: '2 hours' },
  { id: 'atlas', name: 'Atlas Mountains Trek', price: 75, duration: 'Full day' },
  { id: 'souk', name: 'Souk Shopping Tour', price: 25, duration: '3 hours' }
];

export function PackageCustomizer() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [duration, setDuration] = useState('7');
  const [guests, setGuests] = useState('2');

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    const days = parseInt(duration) || 0;

    if (selectedCar) {
      const car = carOptions.find(c => c.id === selectedCar);
      if (car) total += car.price * days;
    }

    if (selectedHotel) {
      const hotel = hotelOptions.find(h => h.id === selectedHotel);
      if (hotel) total += hotel.price * days;
    }

    selectedActivities.forEach(actId => {
      const activity = activityOptions.find(a => a.id === actId);
      if (activity) total += activity.price;
    });

    return total;
  };

  const handleSubmit = () => {
    if (!selectedCar || !selectedHotel || selectedActivities.length === 0) {
      toast.error('Please select at least one option from each category');
      return;
    }
    toast.success('Package customized! Our team will contact you shortly to finalize your booking.');
  };

  return (
    <section id="customize" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-amber-600 uppercase tracking-wider">Build Your Trip</span>
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-amber-900">Customize Your Package</h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Create your perfect Eastern Morocco adventure by selecting your preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="border-amber-200"
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
                      className="border-amber-200"
                    />
                  </div>
                </div>

                <Tabs defaultValue="cars" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="cars">
                      <Car className="w-4 h-4 mr-2" />
                      Cars
                    </TabsTrigger>
                    <TabsTrigger value="hotels">
                      <Building2 className="w-4 h-4 mr-2" />
                      Hotels
                    </TabsTrigger>
                    <TabsTrigger value="activities">
                      <MapPin className="w-4 h-4 mr-2" />
                      Activities
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cars" className="space-y-4 mt-6">
                    {carOptions.map((car) => (
                      <Card
                        key={car.id}
                        className={`cursor-pointer transition-all ${selectedCar === car.id
                          ? 'border-amber-500 border-2 bg-amber-50'
                          : 'border-amber-200 hover:border-amber-400'
                          }`}
                        onClick={() => setSelectedCar(car.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedCar === car.id ? 'bg-amber-500' : 'bg-amber-200'
                                }`}>
                                <Car className={`w-5 h-5 ${selectedCar === car.id ? 'text-white' : 'text-amber-700'}`} />
                              </div>
                              <div>
                                <h4 className="text-lg text-amber-900">{car.name}</h4>
                                <p className="text-amber-700">{car.price} MAD/day</p>
                              </div>
                            </div>
                            {selectedCar === car.id && (
                              <Check className="w-6 h-6 text-amber-600" />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {car.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="border-amber-300 text-amber-700">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="hotels" className="space-y-4 mt-6">
                    {hotelOptions.map((hotel) => (
                      <Card
                        key={hotel.id}
                        className={`cursor-pointer transition-all ${selectedHotel === hotel.id
                          ? 'border-amber-500 border-2 bg-amber-50'
                          : 'border-amber-200 hover:border-amber-400'
                          }`}
                        onClick={() => setSelectedHotel(hotel.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedHotel === hotel.id ? 'bg-amber-500' : 'bg-amber-200'
                                }`}>
                                <Building2 className={`w-5 h-5 ${selectedHotel === hotel.id ? 'text-white' : 'text-amber-700'}`} />
                              </div>
                              <div>
                                <h4 className="text-lg text-amber-900">{hotel.name}</h4>
                                <p className="text-amber-700">{hotel.price} MAD/night</p>
                              </div>
                            </div>
                            {selectedHotel === hotel.id && (
                              <Check className="w-6 h-6 text-amber-600" />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {hotel.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="border-amber-300 text-amber-700">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="activities" className="space-y-4 mt-6">
                    <p className="text-sm text-amber-700 mb-4">Select multiple activities for your trip</p>
                    {activityOptions.map((activity) => (
                      <Card
                        key={activity.id}
                        className={`cursor-pointer transition-all ${selectedActivities.includes(activity.id)
                          ? 'border-amber-500 border-2 bg-amber-50'
                          : 'border-amber-200 hover:border-amber-400'
                          }`}
                        onClick={() => toggleActivity(activity.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedActivities.includes(activity.id) ? 'bg-amber-500' : 'bg-amber-200'
                                }`}>
                                <MapPin className={`w-5 h-5 ${selectedActivities.includes(activity.id) ? 'text-white' : 'text-amber-700'}`} />
                              </div>
                              <div>
                                <h4 className="text-lg text-amber-900">{activity.name}</h4>
                                <p className="text-sm text-amber-700">{activity.price} MAD • {activity.duration}</p>
                              </div>
                            </div>
                            {selectedActivities.includes(activity.id) && (
                              <Check className="w-6 h-6 text-amber-600" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-amber-200 sticky top-24">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle>Package Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Users className="w-5 h-5" />
                    <span>{guests} guest(s)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-800">
                    <Calendar className="w-5 h-5" />
                    <span>{duration} day(s)</span>
                  </div>

                  <div className="border-t border-amber-200 pt-4 space-y-2">
                    {selectedCar && (
                      <div className="flex justify-between text-amber-800">
                        <span>Car Rental</span>
                        <span>{carOptions.find(c => c.id === selectedCar)?.price! * parseInt(duration)} MAD</span>
                      </div>
                    )}
                    {selectedHotel && (
                      <div className="flex justify-between text-amber-800">
                        <span>Accommodation</span>
                        <span>{hotelOptions.find(h => h.id === selectedHotel)?.price! * parseInt(duration)} MAD</span>
                      </div>
                    )}
                    {selectedActivities.length > 0 && (
                      <div className="flex justify-between text-amber-800">
                        <span>Activities ({selectedActivities.length})</span>
                        <span>
                          {selectedActivities.reduce((sum, actId) => {
                            return sum + (activityOptions.find(a => a.id === actId)?.price || 0);
                          }, 0)} MAD
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-amber-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl text-amber-900">Total</span>
                      <span className="text-3xl text-amber-900">{calculateTotal()} MAD</span>
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700"
                      size="lg"
                    >
                      Request Booking
                    </Button>
                  </div>

                  <p className="text-xs text-amber-700 text-center mt-4">
                    *Final price may vary based on availability and season
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}