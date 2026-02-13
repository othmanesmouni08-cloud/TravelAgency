import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { motion } from 'motion/react';

const destinations = [
  {
    name: 'Oujda',
    description: 'The gateway to Eastern Morocco with beautiful architecture and vibrant culture',
    image: 'https://images.unsplash.com/photo-1716302235543-5517c070ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwb3VqZGElMjBjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    highlights: ['Historic Medina', 'French Architecture', 'Local Markets']
  },
  {
    name: 'Saidia',
    description: 'Blue Pearl of the Mediterranean with 14km of pristine beaches',
    image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwYmx1ZSUyMGNpdHklMjBjaGVmY2hhb3VlbnxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    highlights: ['Beach Resort', 'Water Sports', 'Marina']
  },
  {
    name: 'Figuig',
    description: 'Ancient oasis with 200,000 palm trees and seven traditional ksour',
    image: 'https://images.unsplash.com/photo-1644028735064-4b124c4f7f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZmlndWlnJTIwb2FzaXMlMjBwYWxtfGVufDF8fHx8MTc2OTcwMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    highlights: ['Palm Oasis', 'Ancient Ksour', 'Desert Gateway']
  },
  {
    name: 'Middle Atlas',
    description: 'Majestic mountains with cedar forests and Berber villages',
    image: 'https://images.unsplash.com/photo-1762059063714-d3ea86a09d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWlkZGxlJTIwYXRsYXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5NzAyNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    highlights: ['Mountain Trekking', 'Cedar Forests', 'Berber Culture']
  }
];

export function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-teal-900">Eastern Morocco Destinations</h2>
          <p className="text-xl text-teal-800 max-w-2xl mx-auto">
            Discover the unique beauty of L'Oriental region - from Mediterranean shores to Saharan oases
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group overflow-hidden border-teal-200 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-teal-500 text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      {destination.rating}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-2xl text-white">{destination.name}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-teal-800 mb-3">{destination.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="border-teal-300 text-teal-700">
                        {highlight}
                      </Badge>
                    ))}
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
