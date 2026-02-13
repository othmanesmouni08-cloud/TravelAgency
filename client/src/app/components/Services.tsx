import { Car, Building2, Map, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';
import { Page } from '@/app/App';

const services = [
  {
    icon: Car,
    title: 'Luxury Car Rental',
    description: 'Explore Eastern Morocco with our premium fleet perfect for diverse terrains',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    features: ['SUVs & 4x4s', 'Luxury Sedans', 'With Driver Option', 'Oujda Airport Pickup'],
    page: 'cars' as Page
  },
  {
    icon: Building2,
    title: 'Authentic Hotels & Riads',
    description: 'Stay in Eastern Morocco\'s finest accommodations from coast to desert',
    image: 'https://images.unsplash.com/photo-1760681556948-40cd26936ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwcmlhZCUyMGhvdGVsJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY5NzAyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Traditional Riads', 'Beach Resorts', 'Oasis Lodges', 'Mountain Hotels'],
    page: 'hotels' as Page
  },
  {
    icon: Map,
    title: 'Curated Activities',
    description: 'Experience Eastern Morocco\'s unique blend of Mediterranean and desert culture',
    image: 'https://images.unsplash.com/photo-1760681557376-2c1d91e591a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwY2FtZWwlMjBkZXNlcnQlMjBhY3Rpdml0eXxlbnwxfHx8fDE3Njk3MDIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Beach Activities', 'Oasis Tours', 'Cultural Visits', 'Desert Adventures'],
    page: 'activities' as Page
  }
];

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
}

export function Services({ setCurrentPage }: ServicesProps) {
  const handleViewService = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-wider">Our Services</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Everything You Need for Your Journey</h2>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto">
            We provide comprehensive services to make your Eastern Morocco adventure seamless and unforgettable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-teal-100/70 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-teal-100/60">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleViewService(service.page)}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 border-none shadow-lg shadow-teal-500/10"
                  >
                    View All Options
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
