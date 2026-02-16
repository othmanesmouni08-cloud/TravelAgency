import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { MapPin, Clock, Star, Users, Calendar, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { activityApi } from '@/app/services/api';
import { CartItem } from '@/app/App';

interface Activity {
  id: string | number;
  name: string;
  description: string;
  image?: string;
  image_url?: string;
  duration: string;
  price: number;
  rating: number;
  groupSize: string;
  category?: string;
  Category?: string;
  available?: boolean;
}

const getImagePath = (item: Partial<Activity>) => {
  if (!item || !item.name) return '/images/placeholder.jpg';

  const name = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (name.includes('saidia') && name.includes('beach')) return '/images/relaxing-saidia.jfif';
  if (name.includes('saidia') && name.includes('marina')) return '/images/saidia-marina.jfif';
  if (name.includes('snas')) return '/images/hiking-snasen.jfif';
  if (name.includes('oujda') && name.includes('medina')) return '/images/oujda-medina.jfif';
  if (name.includes('figuig')) return '/images/figuig-oasis.jfif';
  if (name.includes('zegzel')) return '/images/zegzel-valley.jfif';
  if (name.includes('jerada') || name.includes('camping')) return '/images/camping-jerada.jfif';
  if (name.includes('marchica') || name.includes('nador')) return '/images/nador-marchica.jfif';
  if (name.includes('tafoughalt')) return '/images/tafoughalt-cave.jfif';
  if (name.includes('horse') || name.includes('cheval') || name.includes('equest')) return 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80';

  const img = item.image || item.image_url;
  if (!img) return '/images/placeholder.jpg';

  return img.startsWith('http') || img.startsWith('/')
    ? img
    : `/images/${img}`;
};

interface ActivitiesPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function ActivitiesPage({ addToCart, cart }: ActivitiesPageProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await activityApi.getAll();
        setActivities(Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch activities');
        toast.error('Could not load activities from server');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const toggleActivity = (activity: Activity) => {
    if (cart.some(item => String(item.id) === String(activity.id) && item.type === 'activity')) {
      toast.info('This activity is already in your basket');
      return;
    }
    const category = activity.category || activity.Category || 'Experience';
    addToCart({
      id: String(activity.id),
      name: activity.name,
      price: activity.price,
      type: 'activity',
      image: getImagePath(activity),
      details: `${activity.duration}, ${category}`
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 my-28 pt-32 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Activities & Experiences</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Discover Eastern Morocco</h1>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
            Immerse yourself in authentic experiences - from desert adventures to cultural tours
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
            <p className="text-teal-100/60 text-lg">Fetching experiences from the atlas...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="text-white border-white/20"
            >
              Retry Connection
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && activities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-teal-100/60 text-lg">No activities found at the moment.</p>
          </div>
        )}

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activities || []).filter(a => !!a && !!a.id).map((activity) => {
            const isAdded = cart.some(item => String(item.id) === String(activity.id) && item.type === 'activity');

            const displayImage = getImagePath(activity);
            const category = activity.category || activity.Category || '';

            return (
              <Card
                key={activity.id}
                className={`overflow-hidden transition-all duration-300 bg-white/5 backdrop-blur-md border-white/10 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 ${isAdded
                  ? 'border-teal-500 border-2 shadow-2xl'
                  : ''
                  }`}
              >
                <div className="relative h-56 overflow-hidden group">
                  <ImageWithFallback
                    src={displayImage}
                    alt={activity.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-white text-teal-900 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {activity.rating}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-teal-600 text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.duration}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl text-white mb-1">{activity.name}</h3>
                    {category && (
                      <Badge variant="outline" className="border-white text-white text-xs">
                        {category}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-teal-100/70 mb-4 line-clamp-2">{activity.description}</p>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-teal-100/60">
                      <Users className="w-4 h-4 text-cyan-400" />
                      {activity.groupSize || 'Flexible'}
                    </div>
                    <div className="flex items-center gap-2 text-teal-100/60">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {activity.available !== false ? 'Available daily' : 'Fully booked'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl text-white font-bold">{activity.price} MAD</span>
                    <span className="text-sm text-teal-100/60">per person</span>
                  </div>

                  <Button
                    onClick={() => toggleActivity(activity)}
                    disabled={activity.available === false}
                    className={`w-full ${isAdded
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-gradient-to-r from-teal-500 to-cyan-600'
                      } text-white hover:from-teal-600 hover:to-cyan-700`}
                  >
                    {isAdded ? 'In Basket ✓' : (activity.available === false ? 'Not Available' : 'Add to Itinerary')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-none bg-gradient-to-r from-teal-500/20 to-cyan-600/20 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <CardContent className="p-8 text-center relative z-10">
              <h3 className="text-2xl mb-4 text-white font-bold">Need Help Planning Your Activities?</h3>
              <p className="mb-6 text-teal-100/70">
                Our local experts can help you create the perfect itinerary based on your interests and schedule
              </p>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 transition-all">
                Contact Our Travel Experts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
