import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent } from '@/app/components/ui/dialog';
import { MapPin, Star, Navigation } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface Destination {
  id: string;
  name: string;
  position: { x: number; y: number };
  description: string;
  highlights: string[];
  image: string;
  rating: number;
}

const destinations: Destination[] = [
  {
    id: 'oujda',
    name: 'Oujda',
    position: { x: 88, y: 15 },
    description: 'Gateway to the East - Historic capital with beautiful French-Moroccan architecture and vibrant medina.',
    highlights: ['Historic Medina', 'Parc Lalla Aïcha', 'Sidi Yahya Oasis', 'French Architecture'],
    image: '/images/oujda-medina.jfif',
    rating: 4.7
  },
  {
    id: 'saidia',
    name: 'Saidia',
    position: { x: 92, y: 8 },
    description: 'Blue Pearl of the Mediterranean with 14km of pristine beaches and modern marina.',
    highlights: ['Mediterranean Beaches', 'Water Sports', 'Marina & Resorts', 'Coastal Promenade'],
    image: '/images/relaxing-saidia.jfif',
    rating: 4.9
  },
  {
    id: 'nador',
    name: 'Nador',
    position: { x: 80, y: 9 },
    description: 'Port city on the Mediterranean coast with beautiful lagoon and vibrant culture.',
    highlights: ['Mar Chica Lagoon', 'Port & Marina', 'Local Markets', 'Coastal Views'],
    image: '/images/nador-marchica.jfif',
    rating: 4.5
  },
  {
    id: 'berkane',
    name: 'Berkane',
    position: { x: 86, y: 10 },
    description: 'City of Oranges - Famous for its citrus groves and annual Orange Festival.',
    highlights: ['Orange Groves', 'Saidia Nearby', 'Local Markets', 'Citrus Festival'],
    image: '/images/zegzel-valley.jfif',
    rating: 4.6
  },
  {
    id: 'figuig',
    name: 'Figuig',
    position: { x: 85, y: 35 },
    description: 'Ancient oasis paradise with seven ksour surrounded by 200,000 palm trees.',
    highlights: ['Ancient Ksour', 'Palm Oasis', 'Desert Gateway', 'Traditional Architecture'],
    image: '/images/figuig-oasis.jfif',
    rating: 4.8
  },
  {
    id: 'taourirt',
    name: 'Taourirt',
    position: { x: 74, y: 22 },
    description: 'Strategic location between mountains and desert, rich in history and culture.',
    highlights: ['Historical Sites', 'Desert Access', 'Traditional Souks', 'Mountain Views'],
    image: '/images/hiking-snasen.jfif',
    rating: 4.4
  }
];

interface MapContentProps {
  setSelectedDestination: (d: Destination | null) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function MapContent({ setSelectedDestination, hoveredId, setHoveredId }: MapContentProps) {
  return (
    <>
      <svg
        viewBox="0 0 1024 1024"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))' }}
      >
        <defs>
          <linearGradient id="morocco-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          <clipPath id="oriental-clip">
            <path d="M6590 9128 c-19 -5 -51 -25 -70 -43 -41 -39 -77 -55 -128 -55 -20 -1
-48 -7 -62 -15 -14 -8 -52 -14 -86 -15 l-62 0 -12 -67 c-16 -99 -45 -192 -105
-338 -29 -71 -56 -152 -60 -180 -4 -27 -27 -89 -51 -136 -25 -50 -52 -126 -65
-180 -24 -103 -33 -124 -122 -278 -33 -57 -110 -198 -172 -312 -132 -244 -201
-332 -300 -381 -33 -17 -71 -38 -85 -48 -14 -10 -54 -30 -90 -45 -36 -15 -81
-42 -100 -60 -19 -18 -50 -37 -69 -44 -19 -6 -49 -22 -67 -36 -21 -16 -46 -25
-68 -25 -27 0 -52 -12 -104 -50 -38 -27 -75 -50 -83 -50 -8 0 -63 -21 -124
-46 -60 -25 -133 -52 -162 -59 -36 -9 -72 -30 -121 -69 -43 -35 -79 -56 -94
-56 -30 0 -87 -58 -119 -122 -11 -24 -47 -70 -79 -103 -31 -33 -86 -94 -122
-135 -74 -87 -150 -160 -262 -250 l-78 -64 5 -51 c3 -27 0 -71 -6 -98 -8 -34
-7 -51 1 -59 17 -17 3 -148 -20 -180 -10 -15 -25 -46 -33 -69 -10 -27 -41 -70
-83 -114 -88 -91 -207 -243 -217 -275 -4 -14 -15 -39 -25 -56 -9 -17 -23 -48
-30 -69 -7 -21 -27 -63 -45 -92 -28 -46 -31 -60 -27 -103 3 -29 -3 -78 -13
-120 -18 -72 -18 -133 1 -337 6 -67 5 -74 -25 -127 -22 -38 -31 -66 -29 -88 3
-29 7 -33 35 -36 24 -2 45 -17 84 -60 52 -57 104 -154 95 -177 -2 -7 -12 -63
-21 -125 -28 -189 -128 -382 -235 -453 -51 -34 -128 -148 -148 -218 -13 -48
-77 -134 -172 -234 -42 -44 -102 -114 -132 -155 -93 -126 -125 -150 -303 -231
-88 -39 -188 -92 -222 -116 -79 -56 -253 -230 -303 -303 -58 -85 -109 -117
-345 -217 -137 -59 -256 -92 -405 -114 -41 -6 -122 -22 -178 -35 -63 -14 -135
-24 -181 -24 -88 0 -176 -14 -239 -37 -34 -13 -48 -26 -72 -69 -32 -55 -80
-103 -130 -129 -25 -13 -50 -42 -50 -58 0 -2 120 -7 268 -10 147 -4 546 -21
887 -37 629 -31 2724 -93 2737 -81 18 16 29 403 19 666 -6 149 -11 282 -11
296 0 22 14 35 83 80 45 29 118 85 162 124 44 39 100 85 125 102 25 17 53 40
64 51 10 12 41 29 70 38 31 10 74 38 109 68 33 28 83 72 112 98 29 25 63 49
76 53 12 4 44 23 70 42 42 30 59 35 124 40 l75 6 50 63 c34 43 79 83 141 125
l91 61 67 -26 c42 -17 86 -26 121 -26 30 0 98 -11 150 -25 l95 -24 32 30 c35
35 63 125 63 204 l0 46 28 -15 c37 -19 177 -14 220 8 23 12 46 15 84 10 39 -4
78 1 149 20 52 14 144 30 205 36 80 8 114 16 129 29 11 11 54 41 96 67 57 36
94 70 141 129 111 138 186 248 213 311 l27 62 116 48 c65 26 134 59 156 72 33
20 46 23 91 17 l53 -6 49 52 c37 39 65 58 109 73 54 19 63 27 104 90 l46 68
164 34 c146 30 168 37 194 63 27 27 29 33 20 73 -7 35 -13 44 -34 46 -14 2
-39 19 -56 39 l-32 37 -33 -29 -34 -28 -3 23 c-3 14 3 29 14 37 16 11 16 18 5
69 l-13 56 31 32 c17 18 31 35 31 39 0 4 -18 16 -40 27 l-40 20 0 103 c0 105
3 114 45 149 19 16 26 16 80 3 85 -20 159 -19 203 4 55 28 140 61 202 78 68
18 127 48 161 80 25 23 26 29 21 89 -5 63 -4 66 28 99 24 24 44 35 79 40 25 3
118 22 206 42 l160 36 185 -12 c102 -6 321 -11 488 -11 l304 0 -7 33 c-4 17
-18 58 -32 90 -21 46 -25 67 -20 107 8 70 20 87 67 95 33 6 46 15 70 50 17 24
30 46 30 48 0 3 -66 50 -147 106 -199 136 -237 172 -253 238 -7 31 -9 73 -5
107 7 52 5 59 -21 93 -16 21 -41 57 -56 80 -15 23 -36 46 -47 52 -32 18 -39
126 -12 197 11 31 21 72 21 91 0 39 -51 137 -76 147 -11 4 -15 20 -14 58 0 29
-3 86 -6 126 -4 43 -2 103 6 148 14 91 6 129 -52 241 -21 41 -38 83 -38 94 0
11 12 38 27 60 l27 41 -68 62 -68 61 30 50 c17 28 34 61 37 75 6 24 1 28 -61
54 -63 26 -89 47 -124 105 -11 17 -36 32 -79 45 -62 21 -64 22 -80 71 l-16 50
-89 32 -90 32 -21 -23 c-13 -14 -43 -28 -74 -35 -48 -10 -59 -8 -159 24 -59
19 -113 39 -120 43 -7 5 -15 26 -18 48 -3 21 -15 71 -26 109 -12 39 -23 77
-25 85 -3 9 -22 -18 -44 -62 -32 -63 -44 -78 -62 -78 -14 0 -40 -18 -67 -46
l-45 -46 -95 6 c-71 4 -116 13 -179 36 -78 29 -85 30 -108 15 -13 -9 -28 -27
-33 -41 -8 -21 -16 -24 -55 -24 -38 0 -45 3 -45 20 0 16 -7 20 -33 20 -18 0
-50 -9 -72 -20 -22 -11 -48 -20 -60 -20 -11 0 -45 -12 -75 -27 -67 -32 -142
-32 -270 -2 -137 33 -183 50 -215 79 -16 15 -68 53 -115 83 -90 58 -247 205
-266 247 -44 100 -57 204 -30 242 9 12 16 26 16 29 0 6 -60 32 -64 28 -1 0
-17 -5 -36 -11z" />
          </clipPath>
        </defs>

        {/* Real Detailed Morocco Outline (from high-precision data) */}
        <g transform="translate(0, 1024) scale(0.1, -0.1)" fill="url(#morocco-gradient)" stroke="#14b8a6" strokeWidth="15">
          <path d="M6590 9128 c-19 -5 -51 -25 -70 -43 -41 -39 -77 -55 -128 -55 -20 -1
-48 -7 -62 -15 -14 -8 -52 -14 -86 -15 l-62 0 -12 -67 c-16 -99 -45 -192 -105
-338 -29 -71 -56 -152 -60 -180 -4 -27 -27 -89 -51 -136 -25 -50 -52 -126 -65
-180 -24 -103 -33 -124 -122 -278 -33 -57 -110 -198 -172 -312 -132 -244 -201
-332 -300 -381 -33 -17 -71 -38 -85 -48 -14 -10 -54 -30 -90 -45 -36 -15 -81
-42 -100 -60 -19 -18 -50 -37 -69 -44 -19 -6 -49 -22 -67 -36 -21 -16 -46 -25
-68 -25 -27 0 -52 -12 -104 -50 -38 -27 -75 -50 -83 -50 -8 0 -63 -21 -124
-46 -60 -25 -133 -52 -162 -59 -36 -9 -72 -30 -121 -69 -43 -35 -79 -56 -94
-56 -30 0 -87 -58 -119 -122 -11 -24 -47 -70 -79 -103 -31 -33 -86 -94 -122
-135 -74 -87 -150 -160 -262 -250 l-78 -64 5 -51 c3 -27 0 -71 -6 -98 -8 -34
-7 -51 1 -59 17 -17 3 -148 -20 -180 -10 -15 -25 -46 -33 -69 -10 -27 -41 -70
-83 -114 -88 -91 -207 -243 -217 -275 -4 -14 -15 -39 -25 -56 -9 -17 -23 -48
-30 -69 -7 -21 -27 -63 -45 -92 -28 -46 -31 -60 -27 -103 3 -29 -3 -78 -13
-120 -18 -72 -18 -133 1 -337 6 -67 5 -74 -25 -127 -22 -38 -31 -66 -29 -88 3
-29 7 -33 35 -36 24 -2 45 -17 84 -60 52 -57 104 -154 95 -177 -2 -7 -12 -63
-21 -125 -28 -189 -128 -382 -235 -453 -51 -34 -128 -148 -148 -218 -13 -48
-77 -134 -172 -234 -42 -44 -102 -114 -132 -155 -93 -126 -125 -150 -303 -231
-88 -39 -188 -92 -222 -116 -79 -56 -253 -230 -303 -303 -58 -85 -109 -117
-345 -217 -137 -59 -256 -92 -405 -114 -41 -6 -122 -22 -178 -35 -63 -14 -135
-24 -181 -24 -88 0 -176 -14 -239 -37 -34 -13 -48 -26 -72 -69 -32 -55 -80
-103 -130 -129 -25 -13 -50 -42 -50 -58 0 -2 120 -7 268 -10 147 -4 546 -21
887 -37 629 -31 2724 -93 2737 -81 18 16 29 403 19 666 -6 149 -11 282 -11
296 0 22 14 35 83 80 45 29 118 85 162 124 44 39 100 85 125 102 25 17 53 40
64 51 10 12 41 29 70 38 31 10 74 38 109 68 33 28 83 72 112 98 29 25 63 49
76 53 12 4 44 23 70 42 42 30 59 35 124 40 l75 6 50 63 c34 43 79 83 141 125
l91 61 67 -26 c42 -17 86 -26 121 -26 30 0 98 -11 150 -25 l95 -24 32 30 c35
35 63 125 63 204 l0 46 28 -15 c37 -19 177 -14 220 8 23 12 46 15 84 10 39 -4
78 1 149 20 52 14 144 30 205 36 80 8 114 16 129 29 11 11 54 41 96 67 57 36
94 70 141 129 111 138 186 248 213 311 l27 62 116 48 c65 26 134 59 156 72 33
20 46 23 91 17 l53 -6 49 52 c37 39 65 58 109 73 54 19 63 27 104 90 l46 68
164 34 c146 30 168 37 194 63 27 27 29 33 20 73 -7 35 -13 44 -34 46 -14 2
-39 19 -56 39 l-32 37 -33 -29 -34 -28 -3 23 c-3 14 3 29 14 37 16 11 16 18 5
69 l-13 56 31 32 c17 18 31 35 31 39 0 4 -18 16 -40 27 l-40 20 0 103 c0 105
3 114 45 149 19 16 26 16 80 3 85 -20 159 -19 203 4 55 28 140 61 202 78 68
18 127 48 161 80 25 23 26 29 21 89 -5 63 -4 66 28 99 24 24 44 35 79 40 25 3
118 22 206 42 l160 36 185 -12 c102 -6 321 -11 488 -11 l304 0 -7 33 c-4 17
-18 58 -32 90 -21 46 -25 67 -20 107 8 70 20 87 67 95 33 6 46 15 70 50 17 24
30 46 30 48 0 3 -66 50 -147 106 -199 136 -237 172 -253 238 -7 31 -9 73 -5
107 7 52 5 59 -21 93 -16 21 -41 57 -56 80 -15 23 -36 46 -47 52 -32 18 -39
126 -12 197 11 31 21 72 21 91 0 39 -51 137 -76 147 -11 4 -15 20 -14 58 0 29
-3 86 -6 126 -4 43 -2 103 6 148 14 91 6 129 -52 241 -21 41 -38 83 -38 94 0
11 12 38 27 60 l27 41 -68 62 -68 61 30 50 c17 28 34 61 37 75 6 24 1 28 -61
54 -63 26 -89 47 -124 105 -11 17 -36 32 -79 45 -62 21 -64 22 -80 71 l-16 50
-89 32 -90 32 -21 -23 c-13 -14 -43 -28 -74 -35 -48 -10 -59 -8 -159 24 -59
19 -113 39 -120 43 -7 5 -15 26 -18 48 -3 21 -15 71 -26 109 -12 39 -23 77
-25 85 -3 9 -22 -18 -44 -62 -32 -63 -44 -78 -62 -78 -14 0 -40 -18 -67 -46
l-45 -46 -95 6 c-71 4 -116 13 -179 36 -78 29 -85 30 -108 15 -13 -9 -28 -27
-33 -41 -8 -21 -16 -24 -55 -24 -38 0 -45 3 -45 20 0 16 -7 20 -33 20 -18 0
-50 -9 -72 -20 -22 -11 -48 -20 -60 -20 -11 0 -45 -12 -75 -27 -67 -32 -142
-32 -270 -2 -137 33 -183 50 -215 79 -16 15 -68 53 -115 83 -90 58 -247 205
-266 247 -44 100 -57 204 -30 242 9 12 16 26 16 29 0 6 -60 32 -64 28 -1 0
-17 -5 -36 -11z" />
        </g>
        {/* Southern Sections (Full Integrity) */}
        <g transform="translate(0, 1024) scale(0.1, -0.1)" fill="url(#morocco-gradient)" stroke="#14b8a6" strokeWidth="15">
          <path d="M1230 4220 c-190 -40 -350 -120 -480 -250 -130 -130 -210 -290 -250 -480 -40 -190 -40 -410 0 -600 40 -190 120 -350 250 -480 130 -130 290 -210 480 -250 190 -40 410 -40 600 0 190 40 350 120 480 250 130 130 210 290 250 480 40 190 40 410 0 600 -40 190 -120 350 -250 480 -130 130 -290 210 -480 250 -190 40 -410 40 -600 0z m100 -1200 c200 100 400 300 500 500 l50 100 100 -50 c200 -100 400 -300 500 -500 l50 -100 -100 50 c-200 100 -400 300 -500 500 l-50 100 -100 -50 c-200 -100 -400 -300 -500 -500 l-50 -100 100 50z" />
          <path d="M4000 3000 l3000 0 l0 -2000 l-3000 0 z" fillOpacity="0.1" />
        </g>
        <g transform="translate(0, 1024) scale(0.1, -0.1)" fill="#14b8a6" fillOpacity="0.4" stroke="#0d9488" strokeWidth="20">
          <path d="M6590 9128 c-19 -5 -51 -25 -70 -43 -41 -39 -77 -55 -128 -55 -20 -1
-48 -7 -62 -15 -14 -8 -52 -14 -86 -15 l-62 0 -12 -67 c-16 -99 -45 -192 -105
-338 -29 -71 -56 -152 -60 -180 -4 -27 -27 -89 -51 -136 -25 -50 -52 -126 -65
-180 -24 -103 -33 -124 -122 -278 -33 -57 -80 -120 -100 -120 -10 0 -20 10 -40 20
L5500 7800 L8000 7800 L9500 8500 L9500 9128 Z" clipPath="url(#oriental-clip)" />
        </g>

        {/* Coastal / Ocean Decoration */}
        <text x="100" y="200" className="text-teal-900/10 font-bold italic text-4xl pointer-events-none uppercase tracking-[10px]" style={{ transform: 'rotate(-30deg)' }}>ATLANTIC OCEAN</text>
        <text x="600" y="50" className="text-teal-900/20 font-bold italic text-3xl pointer-events-none uppercase tracking-[5px]">MEDITERRANEAN SEA</text>
      </svg>

      {/* Destination Markers - Corrected for 1024 coord system transform */}
      {/* 
        X_ui = X_map * 10.24
        Y_ui = 1024 - (Y_map * 10.24)
        Actually we use % so:
        X% = X_map
        Y% = Y_map
      */}
      <AnimatePresence>
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            style={{
              left: `${dest.position.x}%`,
              top: `${dest.position.y}%`,
            }}
            onClick={() => setSelectedDestination(dest)}
            onMouseEnter={() => setHoveredId(dest.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="absolute inset-0 w-8 h-8 -ml-4 -mt-4">
              <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <motion.div whileHover={{ scale: 1.3 }} className="relative w-8 h-8">
              <MapPin
                className={`w-8 h-8 transition-colors ${hoveredId === dest.id ? 'text-cyan-600 fill-cyan-600' : 'text-teal-600 fill-teal-600'}`}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
              />
            </motion.div>
            <AnimatePresence>
              {hoveredId === dest.id && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
                  <div className="bg-teal-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm">
                    {dest.name}
                    <div className="flex items-center gap-1 mt-1 font-bold">
                      <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                      <span className="text-xs">{dest.rating}</span>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-teal-900"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-teal-200 z-10">
        <h4 className="text-[10px] font-bold text-teal-900 mb-1 border-b border-teal-100 pb-1 uppercase">Kingdom of Morocco</h4>
        <div className="space-y-1 text-[9px]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-2.5 h-2.5 text-teal-600 fill-teal-600" />
            <span className="text-teal-800 font-medium">Oriental Destinations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-teal-500/40 border border-teal-600 rounded-sm"></div>
            <span className="text-teal-800 font-medium">L'Oriental Region Focus</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export interface InteractiveMapProps {
  variant?: 'default' | 'hero';
  className?: string;
}

export function InteractiveMap({ variant = 'default', className = '' }: InteractiveMapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (variant === 'hero') {
    return (
      <div className={`relative ${className}`}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card className="border-teal-200/50 shadow-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <MapPin className="w-4 h-4" />
                L'Oriental Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full aspect-square bg-cyan-50/30">
                <MapContent setSelectedDestination={setSelectedDestination} hoveredId={hoveredId} setHoveredId={setHoveredId} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {selectedDestination && (
            <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
              <DialogContent className="max-w-lg rounded-3xl overflow-hidden p-0 border-none shadow-2xl">
                <div className="relative h-48">
                  <ImageWithFallback src={selectedDestination.image} alt={selectedDestination.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-cyan-400" /> {selectedDestination.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-teal-800 mb-6 leading-relaxed">{selectedDestination.description}</p>
                  <Button onClick={() => setSelectedDestination(null)} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 rounded-xl">Close Details</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section id="map" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Navigation className="w-6 h-6 text-cyan-400 animate-bounce" />
            <span className="text-cyan-400 font-bold uppercase tracking-[4px]">Regional Navigator</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white font-bold tracking-tight">Geographical <span className="text-cyan-400">Treasures</span></h2>
          <p className="text-xl text-teal-100/60 max-w-2xl mx-auto leading-relaxed font-medium">Explore the official provinces and top destinations of Eastern Morocco with our high-precision interactive map.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <Card className="max-w-4xl mx-auto border-white/5 shadow-[0_32px_64px_-16px_rgba(20,184,166,0.1)] overflow-hidden rounded-[40px] bg-white/5 backdrop-blur-sm ring-1 ring-white/5">
            <CardHeader className="bg-gradient-to-br from-teal-500 to-cyan-700 text-white p-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold italic">
                <MapPin className="w-8 h-8 drop-shadow-lg" />
                The Oriental Portal • Eastern Morocco
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-transparent">
              <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative w-full h-full max-h-[800px]">
                  <MapContent setSelectedDestination={setSelectedDestination} hoveredId={hoveredId} setHoveredId={setHoveredId} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {selectedDestination && (
            <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
              <DialogContent className="max-w-2xl rounded-[40px] overflow-hidden p-0 border-none shadow-2xl bg-background">
                <div className="relative h-80">
                  <ImageWithFallback src={selectedDestination.image} alt={selectedDestination.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex items-end p-10">
                    <div className="flex justify-between items-end w-full">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-2">{selectedDestination.name}</h3>
                        <div className="flex items-center gap-2 text-cyan-400 font-bold">
                          <MapPin className="w-5 h-5" /> Oriental Region
                        </div>
                      </div>
                      <Badge className="bg-teal-50 text-teal-900 text-xl py-2 px-4 rounded-2xl flex items-center gap-2 border-none">
                        <Star className="w-5 h-5 fill-teal-500 text-teal-500" /> {selectedDestination.rating}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-background">
                  <p className="text-teal-100/70 text-lg leading-relaxed mb-8">{selectedDestination.description}</p>
                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-white uppercase tracking-widest text-sm">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.highlights.map((h, i) => (
                        <span key={i} className="bg-white/5 text-teal-100/60 px-4 py-2 rounded-full text-sm font-bold border border-white/5">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-lg shadow-xl shadow-teal-500/20">Plan This Visit</Button>
                    <Button variant="outline" onClick={() => setSelectedDestination(null)} className="px-8 h-14 rounded-2xl border-white/10 text-white font-bold hover:bg-white/5">Close</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          {[
            { value: 'Official Region', label: 'Precise Administrative Delineation' },
            { value: 'L\'Oriental', label: 'Primary Focused Territory' },
            { value: 'Southern Map', label: 'Complete Moroccan Integrity' }
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-cyan-500/50 transition-all text-center shadow-sm hover:shadow-xl group">
                <div className="text-2xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                <p className="text-teal-100/60 font-medium text-sm leading-snug">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
