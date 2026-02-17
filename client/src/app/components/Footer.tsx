import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Page } from '@/app/App';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  currentUser: any;
}

export function Footer({ setCurrentPage, currentUser }: FooterProps) {
  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background text-white py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <button onClick={() => handleNavClick('home')} className="flex items-center gap-0 mb-4">
              <img src="/images/logo.png" alt="Oriental Hub Logo" className="w-28 h-28 object-contain" />
              <div className="text-left -ml-4">
                <h3 className="text-xl">Oriental Hub</h3>
                <p className="text-xs text-cyan-200">Travel Agency</p>
              </div>
            </button>
            <p className="text-cyan-200 text-sm">
              Your gateway to authentic Eastern Morocco experiences. We create unforgettable journeys through L'Oriental region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavClick('cars')} className="text-cyan-200 hover:text-white transition text-sm text-left">
                  Car Rental
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('hotels')} className="text-cyan-200 hover:text-white transition text-sm text-left">
                  Hotels & Riads
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('activities')} className="text-cyan-200 hover:text-white transition text-sm text-left">
                  Activities
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('book')} className="text-cyan-200 hover:text-white transition text-sm text-left">
                  Book Trip
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('login')} className="text-cyan-200 hover:text-white transition text-sm text-left font-semibold">
                  Login
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('signup')} className="text-cyan-200 hover:text-white transition text-sm text-left">
                  Create Account
                </button>
              </li>
              {currentUser?.role === 'admin' && (
                <li className="pt-2 border-t border-teal-800/50 mt-2">
                  <button onClick={() => handleNavClick('admin')} className="text-cyan-100 hover:text-teal-300 transition text-[10px] uppercase tracking-widest text-left font-bold opacity-80">
                    Back Office
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 text-cyan-400" />
                <div>
                  <p className="text-sm text-cyan-200">+212 123 456 789</p>
                  <p className="text-xs text-cyan-300">Mon-Sat 9AM-6PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 text-cyan-400" />
                <a href="mailto:info@orientalhub.com" className="text-sm text-cyan-200 hover:text-white">
                  info@orientalhub.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-cyan-400" />
                <p className="text-sm text-cyan-200">
                  Oujda, Eastern Morocco<br />
                  L'Oriental Region
                </p>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-cyan-200">
              Share your journey with<br />
              #OrientalHub
            </p>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-8 text-center">
          <p className="text-cyan-200 text-sm">
            © 2026 Oriental Hub. All rights reserved.
          </p>
          <p className="text-cyan-300 text-xs mt-2">
            Licensed by Moroccan Tourism Board • Registration No. MA-12345
          </p>
        </div>
      </div>
    </footer>
  );
}
