import { Button } from '@/app/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Page } from '@/app/App';
import { SmallMapIcon } from '@/app/components/SmallMapIcon';

interface HeroProps {
  setCurrentPage: (page: Page) => void;
}

export function Hero({ setCurrentPage }: HeroProps) {
  return (
    <section id="home" className="my-20 relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none scale-[1.01]"
        >
          <source src="/images/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 uppercase tracking-wider">Discover Eastern Morocco</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6">
              Explore the Hidden Treasures of
              <span className="block text-cyan-400">L'Oriental</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              From Mediterranean coasts to desert oases - customize your journey through Eastern Morocco's authentic wonders
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  setCurrentPage('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 text-lg px-8"
              >
                Book Your Trip
              </Button>
              <Button
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-teal-900 text-lg px-8"
              >
                Explore Services
              </Button>

            </div>

          </div>

          <div className="hidden lg:block flex-shrink-0">
            <SmallMapIcon setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>

    </section >
  );
}
