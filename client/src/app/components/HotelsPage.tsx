import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Building2, Star, Wifi, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { BackendHotel, hotelApi } from '@/app/services/api';
import { FrontendHotel, transformHotelData } from '@/app/types/hotel';

import { CartItem } from '@/app/App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { format, addDays, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { DateRange } from 'react-day-picker';

interface HotelsPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function HotelsPage({ addToCart, cart }: HotelsPageProps) {
  const [activeFilter, setActiveFilter] = useState('All Hotels');
  const [hotels, setHotels] = useState<FrontendHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<FrontendHotel | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1), // Default 1 night
  });

  // Fetch hotels from backend on component mount
  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const backendHotels = await hotelApi.getAll();
        const transformedHotels = backendHotels.map((hotel: BackendHotel) => transformHotelData(hotel));
        setHotels(transformedHotels);
      } catch (err) {
        console.error('Failed to load hotels:', err);
        setError('Failed to load hotels. Please make sure the backend server is running.');
        toast.error('Failed to load hotels from server');
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const calculateTotal = () => {
    if (!date?.from || !date?.to || !selectedHotel) return 0;
    const nights = differenceInDays(date.to, date.from);
    // Ensure at least 1 night
    const actualNights = nights < 1 ? 1 : nights;
    const price = selectedHotel.price;
    return actualNights * price;
  };

  const handleReserve = (hotel: FrontendHotel) => {
    setSelectedHotel(hotel);
    setIsDialogOpen(true);
  };

  const handleConfirmReservation = () => {
    if (!selectedHotel || !date?.from || !date?.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (cart.some(item => item.id === selectedHotel.id && item.type === 'hotel')) {
      toast.info('This hotel is already in your basket');
      setIsDialogOpen(false);
      return;
    }

    addToCart({
      id: selectedHotel.id,
      name: selectedHotel.name,
      price: calculateTotal(),
      type: 'hotel',
      image: selectedHotel.image,
      details: `${differenceInDays(date.to, date.from)} Nights at ${selectedHotel.location}`,
      startDate: format(date.from, 'yyyy-MM-dd'),
      endDate: format(date.to, 'yyyy-MM-dd'),
      totalDays: differenceInDays(date.to, date.from)
    });

    setIsDialogOpen(false);
    toast.success('Hotel added to basket!');
  };

  const filteredHotels = activeFilter === 'All Hotels'
    ? hotels
    : hotels.filter(hotel => hotel.category === activeFilter);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-26">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Accommodations</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Find Your Perfect Stay</h1>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
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
              className={`${activeFilter === filter
                ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-none shadow-lg shadow-teal-500/20'
                : 'border-white/10 text-teal-100/60 hover:bg-white/5 hover:border-teal-500/30'
                } cursor-pointer transition-all px-6 py-2.5 text-sm rounded-full`}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loading State */}
          {loading && (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                  <div className="h-56 bg-white/5 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-white/5 rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded mb-4 w-3/4 animate-pulse"></div>
                    <div className="h-10 bg-white/5 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="col-span-full">
              <Card className="bg-red-500/10 border-red-500/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl text-red-400 mb-2">⚠️ {error}</h3>
                  <p className="text-teal-100/60 text-sm">Please start the backend server at http://localhost:5000</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* No Hotels State */}
          {!loading && !error && hotels.length === 0 && (
            <div className="col-span-full">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8 text-center">
                  <Building2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-2">No hotels found</h3>
                  <p className="text-teal-100/60">No hotels are available in the database yet.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Hotels List */}
          {!loading && !error && filteredHotels.map((hotel: FrontendHotel) => (
            <Card
              key={hotel.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-lg px-3 py-1 border-none shadow-lg">
                    {hotel.price} MAD/night
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
                <div className="flex gap-4 mb-4 pb-4 border-b border-white/5">
                  {hotel.amenities.map((Icon: any, idx: number) => {
                    const IconComponent = Icon as any;
                    return <IconComponent key={idx} className="w-5 h-5 text-cyan-400" />;
                  })}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {hotel.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-teal-100/60">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Services & Activities */}
                {hotel.services && hotel.services.length > 0 && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wider">Services & Activities</h4>
                    {hotel.services.map((service: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-sm text-teal-100/60">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${service.type === 'food' ? 'bg-orange-400' : 'bg-purple-400'}`}></span>
                          {service.name}
                        </div>
                        {service.price > 0 && (
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/80">
                            +{service.price} MAD
                          </span>
                        )}
                        {service.price === 0 && (
                          <span className="text-xs text-green-400">BLA FLOSS</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  onClick={() => handleReserve(hotel)}
                  className={`w-full ${cart.some(item => item.id === hotel.id)
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700'
                    }`}
                >
                  {cart.some(item => item.id === hotel.id) ? 'In Basket ✓' : 'Reserve Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-teal-900">Book Your Stay</DialogTitle>
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
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {selectedHotel && date?.from && date?.to && (
              <div className="bg-teal-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-700">Nights</span>
                  <span className="font-semibold text-teal-900">{differenceInDays(date.to, date.from)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-700">Price per night</span>
                  <span className="font-semibold text-teal-900">{selectedHotel.price} MAD</span>
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
            <Button onClick={handleConfirmReservation} className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700">
              Confirm Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
