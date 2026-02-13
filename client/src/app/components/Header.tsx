import { useState } from 'react';
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

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                            <h1 className="text-2xl text-teal-900 font-bold leading-none">Oriental Morocco</h1>
                            <p className="text-xs text-teal-700">Travel Agency</p>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
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

                        {currentUser?.role === 'admin' && (
                            <button
                                onClick={() => handleNavClick('admin')}
                                className={`transition font-bold ${currentPage === 'admin' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                    }`}
                            >
                                Backoffice
                            </button>
                        )}

                        <button
                            onClick={() => handleNavClick('basket')}
                            className="relative p-2 text-teal-900 hover:text-teal-600 transition"
                        >
                            <ShoppingBasket className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="flex items-center gap-4 border-l border-teal-100 pl-8 ml-2">
                            {currentUser ? (
                                <Button
                                    onClick={onLogout}
                                    variant="outline"
                                    className="border-teal-200 text-teal-900 hover:bg-teal-50"
                                >
                                    Log Out
                                </Button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleNavClick('login')}
                                        className="text-teal-900 hover:text-teal-600 font-medium transition"
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
                            className="relative p-2 text-teal-900"
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
                            className="text-teal-900"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-6 border-t border-teal-100">
                        <div className="flex flex-col gap-6">
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

                            {currentUser?.role === 'admin' && (
                                <button
                                    onClick={() => handleNavClick('admin')}
                                    className={`text-left transition font-bold ${currentPage === 'admin' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                                        }`}
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