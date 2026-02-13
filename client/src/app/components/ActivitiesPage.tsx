import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { MapPin, Clock, Star, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';

const activities = [
  {
    id: 'figuig',
    title: 'Figuig Oasis Explorer',
    description: 'Discover the ancient oasis with 200,000 palm trees and seven traditional ksour. Walk through centuries of history.',
    image: 'https://images.unsplash.com/photo-1644028735064-4b124c4f7f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZmlndWlnJTIwb2FzaXMlMjBwYWxtfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Full Day',
    price: 850,
    rating: 5.0,
    groupSize: '2-8 people',
    category: 'Nature & Culture'
  },
  {
    id: 'saidia',
    title: 'Saidia Beach Experience',
    description: 'Relax on pristine Mediterranean beaches with water sports, marina visit, and beachside lunch.',
    image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmx1ZSUyMGNpdHklMjBjaGVmY2hhb3VlbnxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Half Day',
    price: 450,
    rating: 4.8,
    groupSize: '2-15 people',
    category: 'Beach & Water Sports'
  },
  {
    id: 'atlas',
    title: 'Middle Atlas Trek',
    description: 'Hike through cedar forests and visit traditional Berber mountain villages with panoramic views.',
    image: 'https://images.unsplash.com/photo-1762059063714-d3ea86a09d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWlkZGxlJTIwYXRsYXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NzAyNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Full Day',
    price: 750,
    rating: 4.9,
    groupSize: '2-12 people',
    category: 'Adventure & Hiking'
  },
  {
    id: 'oujda',
    title: 'Oujda Heritage Tour',
    description: 'Explore the historic medina, grand mosques, and stunning French colonial architecture of the regional capital.',
    image: 'https://images.unsplash.com/photo-1716302235543-5517c070ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwb3VqZGElMjBjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '4 Hours',
    price: 350,
    rating: 4.7,
    groupSize: '2-10 people',
    category: 'Cultural Tour'
  },
  {
    id: 'berkane',
    title: 'Berkane Orange Groves',
    description: 'Visit the famous orange groves, taste fresh local citrus fruits, and learn about agricultural traditions.',
    image: 'https://images.unsplash.com/photo-1761062062542-133c221ef184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmVya2FuZSUyMG9yYW5nZSUyMGdyb3ZlfGVufDF8fHx8MTc2OTcwMjU2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '3 Hours',
    price: 400,
    rating: 4.6,
    groupSize: '2-20 people',
    category: 'Food & Agriculture'
  },
  {
    id: 'desert',
    title: 'Desert Gateway Adventure',
    description: 'Experience the transition from oasis to Sahara desert landscape with traditional tea ceremony.',
    image: 'https://images.unsplash.com/photo-1689322375612-652dd0745c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZGVzZXJ0JTIwc2FoYXJhJTIwc3Vuc2V0fGVufDF8fHx8MTc2OTcwMjI5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Full Day',
    price: 950,
    rating: 5.0,
    groupSize: '2-8 people',
    category: 'Desert & Adventure'
  },
  {
    id: 'cooking',
    title: 'Moroccan Cooking Class',
    description: 'Learn to prepare authentic Eastern Moroccan dishes with a local chef in a traditional setting.',
    image: 'https://images.unsplash.com/photo-1715270928292-07d4fd661808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWFycmFrZWNoJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2OTY3NzYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '4 Hours',
    price: 550,
    rating: 4.9,
    groupSize: '2-8 people',
    category: 'Culinary Experience'
  },
  {
    id: 'photography',
    title: 'Photography Tour',
    description: 'Capture the beauty of Eastern Morocco with a professional photographer guide through scenic locations.',
    image: 'https://images.unsplash.com/photo-1760681556948-40cd26936ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwcmlhZCUyMGhvdGVsJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY5NzAyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Half Day',
    price: 650,
    rating: 4.8,
    groupSize: '1-6 people',
    category: 'Photography'
  },
  {
    id: 'souk',
    title: 'Traditional Souk Shopping',
    description: 'Navigate vibrant local markets with a guide, discover authentic crafts, spices, and local products.',
    image: 'https://images.unsplash.com/photo-1674336754421-f5c4c012adf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwc291a3MlMjBtYXJrZXQlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '3 Hours',
    price: 300,
    rating: 4.5,
    groupSize: '2-12 people',
    category: 'Shopping & Culture'
  }
];

import { CartItem } from '@/app/App';

interface ActivitiesPageProps {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
}

export function ActivitiesPage({ addToCart, cart }: ActivitiesPageProps) {
  const toggleActivity = (activity: any) => {
    if (cart.some(item => item.id === activity.id && item.type === 'activity')) {
      toast.info('This activity is already in your basket');
      return;
    }
    addToCart({
      id: activity.id,
      name: activity.title,
      price: activity.price,
      type: 'activity',
      image: activity.image,
      details: `${activity.duration}, ${activity.category}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 uppercase tracking-wider">Activities & Experiences</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-teal-900">Discover Eastern Morocco</h1>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
            Immerse yourself in authentic experiences - from desert adventures to cultural tours
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`overflow-hidden transition-all ${cart.some(item => item.id === activity.id)
                ? 'border-teal-500 border-2 shadow-2xl'
                : 'border-teal-200 hover:shadow-xl'
                }`}
            >
              <div className="relative h-56 overflow-hidden group">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.title}
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
                  <h3 className="text-2xl text-white mb-1">{activity.title}</h3>
                  <Badge variant="outline" className="border-white text-white text-xs">
                    {activity.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-teal-700 mb-4">{activity.description}</p>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-teal-700">
                    <Users className="w-4 h-4" />
                    {activity.groupSize}
                  </div>
                  <div className="flex items-center gap-2 text-teal-700">
                    <Calendar className="w-4 h-4" />
                    Available daily
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl text-teal-900">{activity.price} MAD</span>
                  <span className="text-sm text-teal-600">per person</span>
                </div>

                <Button
                  onClick={() => toggleActivity(activity)}
                  className={`w-full ${cart.some(item => item.id === activity.id)
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gradient-to-r from-teal-500 to-cyan-600'
                    } text-white hover:from-teal-600 hover:to-cyan-700`}
                >
                  {cart.some(item => item.id === activity.id) ? 'In Basket ✓' : 'Add to Itinerary'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-teal-200 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl mb-4">Need Help Planning Your Activities?</h3>
              <p className="mb-6 text-cyan-50">
                Our local experts can help you create the perfect itinerary based on your interests and schedule
              </p>
              <Button variant="outline" className="bg-white text-teal-900 hover:bg-cyan-50">
                Contact Our Travel Experts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
