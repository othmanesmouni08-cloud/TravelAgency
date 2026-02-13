<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> Taoufiq
import { Menu, X, Phone, Mail, ShoppingBasket } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Page, User } from '@/app/App';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    cartCount: number;
    currentUser: User | null;
    onLogout: () => void;
}

export function Header({ currentPage, setCurrentPage, cartCount, currentUser, onLogout }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
=======
>>>>>>> Taoufiq

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

<<<<<<< HEAD
    const isTransparent = currentPage === 'home' && !isScrolled && !isMenuOpen;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
            ? 'bg-transparent'
            : 'bg-background/90 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-500'
            }`}>
            <div className="container mx-auto px-4">
                {/* Top bar with contact info */}
                <div className={`hidden md:flex items-center justify-end gap-6 py-2 border-b transition-colors duration-300 ${isTransparent ? 'border-white/20' : 'border-teal-100'
                    }`}>
                    {currentUser && (
                        <span className={`mr-auto text-sm font-bold px-3 py-1 rounded-full border transition-colors duration-300 ${isTransparent
                            ? 'text-white bg-white/10 border-white/20'
                            : 'text-teal-200 bg-white/5 border-white/10'
                            }`}>
                            Welcome, {currentUser.name}
                        </span>
                    )}
                    <a href="tel:+212123456789" className={`flex items-center gap-2 text-sm transition-colors duration-300 ${isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400'
                        }`}>
                        <Phone className="w-4 h-4" />
                        +212 123 456 789
                    </a>
                    <a href="mailto:info@moroccotravel.com" className={`flex items-center gap-2 text-sm transition-colors duration-300 ${isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400'
                        }`}>
=======
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
            <div className="container mx-auto px-4">
                {/* Top bar with contact info */}
                <div className="hidden md:flex items-center justify-end gap-6 py-2 border-b border-teal-100">
                    {currentUser && (
                        <span className="mr-auto text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                            Welcome, {currentUser.name}
                        </span>
                    )}
                    <a href="tel:+212123456789" className="flex items-center gap-2 text-sm text-teal-800 hover:text-teal-600">
                        <Phone className="w-4 h-4" />
                        +212 123 456 789
                    </a>
                    <a href="mailto:info@moroccotravel.com" className="flex items-center gap-2 text-sm text-teal-800 hover:text-teal-600">
>>>>>>> Taoufiq
                        <Mail className="w-4 h-4" />
                        info@moroccotravel.com
                    </a>
                </div>

                {/* Main navigation */}
                <div className="flex items-center justify-between py-4">
                    <button onClick={() => handleNavClick('home')} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                            <span className="text-xl">✦</span>
                        </div>
                        <div className="text-left">
<<<<<<< HEAD
                            <h1 className={`text-2xl font-bold leading-none transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-white'}`}>Oriental Morocco</h1>
                            <p className={`text-xs transition-colors duration-300 ${isTransparent ? 'text-cyan-400' : 'text-cyan-400/80'}`}>Travel Agency</p>
=======
                            <h1 className="text-2xl text-teal-900 font-bold leading-none">Oriental Morocco</h1>
                            <p className="text-xs text-teal-700">Travel Agency</p>
>>>>>>> Taoufiq
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
<<<<<<< HEAD
                        {[
                            { name: 'Home', id: 'home' },
                            { name: 'Cars', id: 'cars' },
                            { name: 'Hotels', id: 'hotels' },
                            { name: 'Activities', id: 'activities' },
                            { name: 'Customize', id: 'customize' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id as Page)}
                                className={`transition font-medium ${currentPage === item.id
                                    ? (isTransparent ? 'text-cyan-400' : 'text-cyan-400')
                                    : (isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400')
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
=======
                        <button
                            onClick={() => handleNavClick('home')}
                            className={`transition font-medium ${currentPage === 'home' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavClick('cars')}
                            className={`transition font-medium ${currentPage === 'cars' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                }`}
                        >
                            Cars
                        </button>
                        <button
                            onClick={() => handleNavClick('hotels')}
                            className={`transition font-medium ${currentPage === 'hotels' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                }`}
                        >
                            Hotels
                        </button>
                        <button
                            onClick={() => handleNavClick('activities')}
                            className={`transition font-medium ${currentPage === 'activities' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                }`}
                        >
                            Activities
                        </button>
                        <button
                            onClick={() => handleNavClick('customize')}
                            className={`transition font-medium ${currentPage === 'customize' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                }`}
                        >
                            Customize
                        </button>
>>>>>>> Taoufiq

                        {currentUser?.role === 'admin' && (
                            <button
                                onClick={() => handleNavClick('admin')}
<<<<<<< HEAD
                                className={`transition font-bold ${currentPage === 'admin'
                                    ? (isTransparent ? 'text-cyan-400' : 'text-cyan-400')
                                    : (isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400')
=======
                                className={`transition font-bold ${currentPage === 'admin' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
>>>>>>> Taoufiq
                                    }`}
                            >
                                Backoffice
                            </button>
                        )}

                        <button
                            onClick={() => handleNavClick('basket')}
<<<<<<< HEAD
                            className={`relative p-2 transition ${isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400'}`}
=======
                            className="relative p-2 text-teal-900 hover:text-teal-600 transition"
>>>>>>> Taoufiq
                        >
                            <ShoppingBasket className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

<<<<<<< HEAD
                        <div className={`flex items-center gap-4 border-l pl-8 ml-2 transition-colors duration-300 ${isTransparent ? 'border-white/20' : 'border-teal-100'}`}>
=======
                        <div className="flex items-center gap-4 border-l border-teal-100 pl-8 ml-2">
>>>>>>> Taoufiq
                            {currentUser ? (
                                <Button
                                    onClick={onLogout}
                                    variant="outline"
<<<<<<< HEAD
                                    className={`transition-colors duration-300 ${isTransparent
                                        ? 'border-white/40 text-white hover:bg-white/10'
                                        : 'border-white/20 text-white hover:bg-white/5'
                                        }`}
=======
                                    className="border-teal-200 text-teal-900 hover:bg-teal-50"
>>>>>>> Taoufiq
                                >
                                    Log Out
                                </Button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleNavClick('login')}
<<<<<<< HEAD
                                        className={`font-medium transition ${isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400'}`}
=======
                                        className="text-teal-900 hover:text-teal-600 font-medium transition"
>>>>>>> Taoufiq
                                    >
                                        Login
                                    </button>
                                    <Button
                                        onClick={() => handleNavClick('signup')}
                                        className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/20"
                                    >
                                        Get Started
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={() => handleNavClick('basket')}
<<<<<<< HEAD
                            className={`relative p-2 transition ${isTransparent ? 'text-white' : 'text-teal-900'}`}
=======
                            className="relative p-2 text-teal-900"
>>>>>>> Taoufiq
                        >
                            <ShoppingBasket className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
<<<<<<< HEAD
                            className={`transition ${isTransparent ? 'text-white' : 'text-teal-900'}`}
=======
                            className="text-teal-900"
>>>>>>> Taoufiq
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-6 border-t border-teal-100">
                        <div className="flex flex-col gap-6">
<<<<<<< HEAD
                            {[
                                { name: 'Home', id: 'home' },
                                { name: 'Cars', id: 'cars' },
                                { name: 'Hotels', id: 'hotels' },
                                { name: 'Activities', id: 'activities' },
                                { name: 'Customize', id: 'customize' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id as Page)}
                                    className={`text-left transition font-medium ${currentPage === item.id ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'}`}
                                >
                                    {item.name}
                                </button>
                            ))}
=======
                            <button
                                onClick={() => handleNavClick('home')}
                                className={`text-left transition font-medium ${currentPage === 'home' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                    }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => handleNavClick('cars')}
                                className={`text-left transition font-medium ${currentPage === 'cars' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                    }`}
                            >
                                Cars
                            </button>
                            <button
                                onClick={() => handleNavClick('hotels')}
                                className={`text-left transition font-medium ${currentPage === 'hotels' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                    }`}
                            >
                                Hotels
                            </button>
                            <button
                                onClick={() => handleNavClick('activities')}
                                className={`text-left transition font-medium ${currentPage === 'activities' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                    }`}
                            >
                                Activities
                            </button>
                            <button
                                onClick={() => handleNavClick('customize')}
                                className={`text-left transition font-medium ${currentPage === 'customize' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                    }`}
                            >
                                Customize
                            </button>
>>>>>>> Taoufiq

                            {currentUser?.role === 'admin' && (
                                <button
                                    onClick={() => handleNavClick('admin')}
<<<<<<< HEAD
                                    className={`text-left transition font-bold ${currentPage === 'admin' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'}`}
=======
                                    className={`text-left transition font-bold ${currentPage === 'admin' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                        }`}
>>>>>>> Taoufiq
                                >
                                    Backoffice
                                </button>
                            )}

                            <div className="flex flex-col gap-3 pt-4 border-t border-teal-50">
                                <Button
                                    onClick={() => handleNavClick('login')}
                                    variant="outline"
                                    className="border-teal-200 text-teal-900 w-full"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => handleNavClick('signup')}
                                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white w-full shadow-lg shadow-teal-500/20"
                                >
                                    Register
                                </Button>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}