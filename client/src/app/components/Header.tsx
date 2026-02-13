import { useState, useEffect } from 'react';
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                            <h1 className={`text-2xl font-bold leading-none transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-white'}`}>Oriental Morocco</h1>
                            <p className={`text-xs transition-colors duration-300 ${isTransparent ? 'text-cyan-400' : 'text-cyan-400/80'}`}>Travel Agency</p>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
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

                        {currentUser?.role === 'admin' && (
                            <button
                                onClick={() => handleNavClick('admin')}
                                className={`transition font-bold ${currentPage === 'admin'
                                    ? (isTransparent ? 'text-cyan-400' : 'text-cyan-400')
                                    : (isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400')
                                    }`}
                            >
                                Backoffice
                            </button>
                        )}

                        <button
                            onClick={() => handleNavClick('basket')}
                            className={`relative p-2 transition ${isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400'}`}
                        >
                            <ShoppingBasket className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className={`flex items-center gap-4 border-l pl-8 ml-2 transition-colors duration-300 ${isTransparent ? 'border-white/20' : 'border-teal-100'}`}>
                            {currentUser ? (
                                <Button
                                    onClick={onLogout}
                                    variant="outline"
                                    className={`transition-colors duration-300 ${isTransparent
                                        ? 'border-white/40 text-white hover:bg-white/10'
                                        : 'border-white/20 text-white hover:bg-white/5'
                                        }`}
                                >
                                    Log Out
                                </Button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleNavClick('login')}
                                        className={`font-medium transition ${isTransparent ? 'text-white hover:text-cyan-400' : 'text-teal-100/70 hover:text-cyan-400'}`}
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
                            className={`relative p-2 transition ${isTransparent ? 'text-white' : 'text-teal-900'}`}
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
                            className={`transition ${isTransparent ? 'text-white' : 'text-teal-900'}`}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-6 border-t border-teal-100">
                        <div className="flex flex-col gap-6">
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

                            {currentUser?.role === 'admin' && (
                                <button
                                    onClick={() => handleNavClick('admin')}
                                    className={`text-left transition font-bold ${currentPage === 'admin' ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'}`}
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