import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { Services } from '@/app/components/Services';
import { Destinations } from '@/app/components/Destinations';
import { Activities } from '@/app/components/Activities';
import { Footer } from '@/app/components/Footer';
import { CarsPage } from '@/app/components/CarsPage';
import { HotelsPage } from '@/app/components/HotelsPage';
import { ActivitiesPage } from '@/app/components/ActivitiesPage';
import { BookPage } from '@/app/components/BookPage';
import { CustomizePage } from '@/app/components/CustomizePage';
import { Toaster, toast } from 'sonner';
import { AuthPage } from '@/app/components/AuthPage';
import { InteractiveMap } from '@/app/components/InteractiveMap';
import { AnimatePresence, motion } from 'motion/react';

import { FinalPaymentPage } from '@/app/components/FinalPaymentPage';
import { BasketPage } from './components/BasketPage';
import { AdminDashboard } from './components/AdminDashboard';

export type Page = 'home' | 'cars' | 'hotels' | 'activities' | 'book' | 'customize' | 'login' | 'signup' | 'payment' | 'basket' | 'admin';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'hotel' | 'car' | 'activity';
  image?: string;
  details?: string;
}

export interface User {
  email: string;
  role: 'admin' | 'user';
  name: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "linear" as const }
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    toast.info('Logged out successfully');
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    toast.success(`${item.name} added to basket!`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    toast.info('Item removed from basket');
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'admin' && (
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cartCount={cart.length}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {currentPage === 'home' && (
              <>
                <Hero setCurrentPage={setCurrentPage} />
                <Services setCurrentPage={setCurrentPage} />
                <Destinations />
                <Activities />
                <InteractiveMap />
              </>
            )}

            {currentPage === 'cars' && <CarsPage addToCart={addToCart} cart={cart} />}
            {currentPage === 'hotels' && <HotelsPage addToCart={addToCart} cart={cart} />}
            {currentPage === 'activities' && <ActivitiesPage addToCart={addToCart} cart={cart} />}
            {currentPage === 'customize' && <CustomizePage />}
            {currentPage === 'basket' && (
              <BasketPage
                cart={cart}
                removeFromCart={removeFromCart}
                onProceed={() => setCurrentPage('book')}
              />
            )}
            {currentPage === 'book' && <BookPage onProceedToPayment={() => setCurrentPage('payment')} />}
            {currentPage === 'payment' && (
              <FinalPaymentPage
                cart={cart}
                onComplete={() => {
                  clearCart();
                  setCurrentPage('home');
                }}
              />
            )}
            {currentPage === 'admin' && <AdminDashboard />}

            {(currentPage === 'login' || currentPage === 'signup') && (
              <AuthPage
                initialMode={currentPage === 'login' ? 'login' : 'signup'}
                onBackToHome={() => setCurrentPage('home')}
                onLogin={handleLogin}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} currentUser={currentUser} />
      <Toaster position="top-center" />
    </div>
  );
}
