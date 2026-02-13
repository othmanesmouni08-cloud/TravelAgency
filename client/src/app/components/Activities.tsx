import { Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { motion } from 'motion/react';

const activities = [
  {
    title: 'Figuig Oasis Explorer',
    description: 'Discover 200,000 palm trees and seven traditional ksour in this ancient oasis paradise.',
<<<<<<< HEAD
    image: '/images/figuig-oasis.jfif',
    duration: 'Full Day',
    price: 850,
=======
    image: 'https://images.unsplash.com/photo-1644028735064-4b124c4f7f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZmlndWlnJTIwb2FzaXMlMjBwYWxtfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Full Day',
    price: 85,
>>>>>>> Taoufiq
    rating: 5.0
  },
  {
    title: 'Saidia Beach Experience',
    description: 'Relax on pristine Mediterranean beaches with water sports and coastal dining.',
<<<<<<< HEAD
    image: '/images/relaxing-saidia.jfif',
    duration: 'Half Day',
    price: 450,
=======
    image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmx1ZSUyMGNpdHklMjBjaGVmY2hhb3VlbnxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Half Day',
    price: 45,
>>>>>>> Taoufiq
    rating: 4.8
  },
  {
    title: 'Middle Atlas Trek',
<<<<<<< HEAD
    description: 'Hike through Beni Snasen mountains and visit traditional Berber mountain villages.',
    image: '/images/hiking-snasen.jfif',
    duration: 'Full Day',
    price: 750,
=======
    description: 'Hike through cedar forests and visit traditional Berber mountain villages.',
    image: 'https://images.unsplash.com/photo-1762059063714-d3ea86a09d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWlkZGxlJTIwYXRsYXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NzAyNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Full Day',
    price: 75,
>>>>>>> Taoufiq
    rating: 4.9
  },
  {
    title: 'Oujda Heritage Tour',
    description: 'Explore the historic medina and stunning French colonial architecture.',
<<<<<<< HEAD
    image: '/images/oujda-medina.jfif',
    duration: '4 Hours',
    price: 350,
    rating: 4.7
  },
  {
    title: 'Zegzel Valley Visit',
    description: 'Visit the lush Zegzel Valley near Berkane and taste fresh local citrus fruits.',
    image: '/images/zegzel-valley.jfif',
    duration: '3 Hours',
    price: 400,
=======
    image: 'https://images.unsplash.com/photo-1716302235543-5517c070ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwb3VqZGElMjBjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '4 Hours',
    price: 35,
    rating: 4.7
  },
  {
    title: 'Berkane Orange Groves',
    description: 'Visit famous orange groves and taste fresh local citrus fruits.',
    image: 'https://images.unsplash.com/photo-1761062062542-133c221ef184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmVya2FuZSUyMG9yYW5nZSUyMGdyb3ZlfGVufDF8fHx8MTc2OTcwMjU2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: '3 Hours',
    price: 40,
>>>>>>> Taoufiq
    rating: 4.6
  },
  {
    title: 'Desert Gateway Adventure',
<<<<<<< HEAD
    description: 'Experience a unique camping trip in the Jerada desert area with a tea ceremony.',
    image: '/images/camping-jerada.jfif',
    duration: 'Full Day',
    price: 950,
    rating: 5.0
  },
  {
    title: 'Saidia Marina Boat Trip',
    description: 'Enjoy a relaxing boat ride in the beautiful Saidia Marina coastal waters.',
    image: '/images/saidia-marina.jfif',
    duration: '2 Hours',
    price: 300,
    rating: 4.9
  },
  {
    title: 'Nador Marchica Visit',
    description: 'Explore the stunning Marchica Lagoon in Nador and its unique ecosystem.',
    image: '/images/nador-marchica.jfif',
    duration: '4 Hours',
    price: 500,
    rating: 4.8
  },
  {
    title: 'Tafoughalt Cave Tour',
    description: 'Discover the historical and prehistoric Tafoughalt Cave in the mountains.',
    image: '/images/tafoughalt-cave.jfif',
    duration: '3 Hours',
    price: 250,
    rating: 4.7
=======
    description: 'Experience the transition from oasis to Sahara with tea ceremony.',
    image: 'https://images.unsplash.com/photo-1689322375612-652dd0745c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZGVzZXJ0JTIwc2FoYXJhJTIwc3Vuc2V0fGVufDF8fHx8MTc2OTcwMjI5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    duration: 'Full Day',
    price: 95,
    rating: 5.0
>>>>>>> Taoufiq
  }
];

export function Activities() {
  return (
<<<<<<< HEAD
    <section id="activities" className="py-20 bg-background">
=======
    <section id="activities" className="py-20 bg-cyan-50">
>>>>>>> Taoufiq
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
<<<<<<< HEAD
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Eastern Morocco Activities</h2>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
=======
          <h2 className="text-4xl md:text-5xl mb-4 text-teal-900">Eastern Morocco Activities</h2>
          <p className="text-xl text-teal-800 max-w-2xl mx-auto">
>>>>>>> Taoufiq
            Immerse yourself in the diverse experiences of L'Oriental region
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
<<<<<<< HEAD
              <Card className="group overflow-hidden border-white/5 bg-white/5 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
=======
              <Card className="group overflow-hidden border-teal-200 hover:shadow-2xl transition-all duration-300">
>>>>>>> Taoufiq
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={activity.image}
                    alt={activity.title}
<<<<<<< HEAD
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-white/10 backdrop-blur-md text-white flex items-center gap-1 border-white/10">
                      <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
=======
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-white text-teal-900 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-teal-500 text-teal-500" />
>>>>>>> Taoufiq
                      {activity.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
<<<<<<< HEAD
                    <Badge className="bg-teal-500 text-white flex items-center gap-1 border-none shadow-lg shadow-teal-500/20">
=======
                    <Badge className="bg-teal-500 text-white flex items-center gap-1">
>>>>>>> Taoufiq
                      <Clock className="w-3 h-3" />
                      {activity.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
<<<<<<< HEAD
                  <h3 className="text-xl text-white mb-2">{activity.title}</h3>
                  <p className="text-teal-100/70 mb-4">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-teal-400 font-bold">{activity.price} MAD</span>
                    <span className="text-sm text-teal-100/40">per person</span>
=======
                  <h3 className="text-xl text-teal-900 mb-2">{activity.title}</h3>
                  <p className="text-teal-700 mb-4">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-teal-900">{activity.price} MAD</span>
                    <span className="text-sm text-teal-700">per person</span>
>>>>>>> Taoufiq
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
