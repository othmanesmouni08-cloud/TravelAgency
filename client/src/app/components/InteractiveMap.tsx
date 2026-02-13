import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { MapPin, Navigation, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Page } from '../App';



interface InteractiveMapProps {
  setCurrentPage?: (page: Page) => void;
}

export function InteractiveMap({ setCurrentPage }: InteractiveMapProps) {
  const [isHoveringLocked, setIsHoveringLocked] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/ma.svg')
      .then(res => res.text())
      .then(data => setSvgContent(data))
      .catch(err => console.error('Error loading map:', err));
  }, []);

  // Add interaction logic to the injected SVG
  useEffect(() => {
    if (!mapRef.current) return;

    const allRegions = mapRef.current.querySelectorAll('path');

    allRegions.forEach((region) => {
      const element = region as SVGPathElement;

      // Default styling for all regions
      element.style.transition = 'all 0.3s ease';
      element.style.stroke = '#ffffff';
      element.style.strokeWidth = '0.5px';

      if (element.id === 'MA02') {
        // Oriental Region Styling
        element.style.fill = '#14b8a6'; // Teal-500
        element.style.fillOpacity = '0.6';
        element.style.cursor = 'pointer';
        element.classList.add('oriental-region');

        element.onclick = () => {
          if (setCurrentPage) {
            setCurrentPage('activities');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        };

        element.onmouseenter = () => {
          element.style.fill = '#0d9488'; // Teal-600
          element.style.fillOpacity = '0.8';
        };
        element.onmouseleave = () => {
          element.style.fill = '#14b8a6';
          element.style.fillOpacity = '0.6';
        };
      } else {
        // Locked Regions Styling
        element.style.fill = '#94a3b8'; // Slate-400
        element.style.fillOpacity = '0.2';
        element.style.cursor = 'not-allowed';

        element.onmouseenter = () => {
          setIsHoveringLocked(true);
          element.style.fillOpacity = '0.3';
        };
        element.onmouseleave = () => {
          setIsHoveringLocked(false);
          element.style.fillOpacity = '0.2';
        };
      }
    });

  }, [svgContent, setCurrentPage]);

  return (
    <section className="py-20 bg-gradient-to-b from-teal-900/10 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Navigation className="w-5 h-5 text-teal-600" />
            <span className="text-teal-600 uppercase tracking-wider">Explore the Region</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-teal-900">Interactive Map of Eastern Morocco</h2>
          <p className="text-xl text-teal-800 max-w-2xl mx-auto">
            Click on any destination to discover what makes L'Oriental region unique
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-5xl mx-auto border-teal-200 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                L'Oriental Region - Eastern Morocco
                <span className="text-xs font-normal ml-auto bg-white/20 px-2 py-1 rounded">
                  Using High-Precision Vector Map
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full" style={{ paddingBottom: '80%' }}>
                {/* Map Container */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-teal-50 overflow-hidden">

                  {/* SVG Injection */}
                  <div
                    ref={mapRef}
                    className="w-full h-full p-4"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />

                  {/* Destination Markers Layer (Absolute Positioned over SVG) */}
                  {/* Note: SVG ViewBox is 0 0 1000 1000. We map these to % positions */}


                  {/* Locked Region Tooltip Overlay */}
                  <AnimatePresence>
                    {isHoveringLocked && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                      >
                        <div className="bg-slate-800/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-slate-600">
                          <Lock className="w-5 h-5 text-slate-400" />
                          <span className="font-medium">Only L'Oriental region is available</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Legend */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-teal-200 pointer-events-auto"
                  >
                    <h4 className="text-sm text-teal-900 mb-2">Legend</h4>
                    <div className="space-y-2 text-xs">

                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-teal-500/60 border border-teal-600"></div>
                        <span className="text-teal-800">L'Oriental Region</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-400/20 border border-slate-300"></div>
                        <span className="text-slate-500 italic">Other Regions Locked</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {[
            { value: '12', label: 'Provinces' },
            { value: '1', label: 'Available Region' },
            { value: '6', label: 'Top Destinations' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-teal-200 text-center hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="text-4xl text-teal-600 mb-2">{stat.value}</div>
                  <p className="text-teal-800">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}